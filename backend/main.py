import os
import asyncio
from typing import Optional
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI(
    title="AskMyNotes Classifier API",
    description="FastAPI Backend for AskMyNotes Document Q&A and Classification",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schemas
class SignupRequest(BaseModel):
    fullName: str
    email: str
    password: str

class QuestionRequest(BaseModel):
    question: str

class QuestionResponse(BaseModel):
    question: str
    answer: str

# API Routes
@app.get("/")
def home():
    return {"message": "Welcome to the AskMyNotes Classifier API"}

@app.get("/status")
def status():
    return {"status": "ok"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/api/signup")
async def signup(request: SignupRequest):
    return {
        "message": "Sign Up successful!",
        "user": {
            "fullName": request.fullName,
            "email": request.email
        }
    }

@app.post("/api/ask")
async def ask_api(
    question: str = Form(...),
    notes: Optional[UploadFile] = File(None)
):
    cleaned_question = question.strip()
    if not cleaned_question:
        return {"answer": "Please provide a valid question."}
    
    # Simulate processing delay
    await asyncio.sleep(0.5)

    if notes and notes.filename:
        answer = (
            f"Based on your uploaded document '{notes.filename}', "
            f"here is the answer for '{cleaned_question}': "
            f"The notes highlight key concepts, problem statements, and structured solutions relevant to your query."
        )
    else:
        answer = (
            f"Regarding your question '{cleaned_question}': "
            f"Here is the AI-generated answer based on standard note references."
        )

    return {"answer": answer}

@app.post("/ask", response_model=QuestionResponse)
async def ask_legacy(request: QuestionRequest):
    cleaned_question = request.question.strip()
    if not cleaned_question:
        return QuestionResponse(
            question="",
            answer="Please enter a question."
        )
    return QuestionResponse(
        question=cleaned_question,
        answer=f'Your question "{cleaned_question}" was received successfully.'
    )

# Static files mounting if Frontend directory is present
frontend_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "Frontend")
if os.path.exists(frontend_dir):
    app.mount("/frontend", StaticFiles(directory=frontend_dir, html=True), name="frontend")
