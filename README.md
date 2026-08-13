# AskMyNotes & AI Classifier

**AskMyNotes** is a full-stack AI-powered document question-answering and classification system built with **FastAPI** on the backend and modern interactive **HTML/TailwindCSS** on the frontend. It includes a hybrid **Machine Learning Classifier** model and full Docker support for containerized deployment.

---

## 📁 Project Structure

```text
.
├── backend/
│   ├── app.py / main.py       # FastAPI app with Classifier & Q&A endpoints
│   ├── askmynotes_classifier.pkl # Machine learning classification model
│   ├── Dockerfile             # Dockerfile for backend service
│   └── requirements.txt       # Python dependencies (FastAPI, scikit-learn, etc.)
├── Frontend/
│   ├── classifier.html        # ML Note & Question Classifier UI
│   ├── dom.html               # DOM & Events demonstration page
│   ├── index.html             # Main AskMyNotes interface
│   ├── notes.html             # Document Q&A interface
│   ├── signup.html            # User registration interface
│   └── styles.css             # Custom styles & animations
├── classifier/                # Dedicated standalone Classifier package
│   ├── Backend/
│   ├── Frontend/
│   └── docker-compose.yml
├── .dockerignore              # Files ignored by Docker build
├── .gitignore                 # Files ignored by Git
├── docker-compose.yml         # Compose configuration
├── Dockerfile                 # Root Dockerfile for full app
└── README.md                  # Project documentation
```

---

## 🚀 Getting Started

### Method 1: Running with Docker (Recommended)

#### Build the Docker image:
```bash
docker build -t askmynotes-app:latest .
```

#### Run the container:
```bash
docker run -d -p 8000:8000 --name askmynotes askmynotes-app:latest
```

#### Or use Docker Compose:
```bash
docker compose up -d --build
```

Access the application at:
- **API Root**: [http://localhost:8000/](http://localhost:8000/)
- **API Status**: [http://localhost:8000/status](http://localhost:8000/status)
- **API Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Frontend App**: [http://localhost:8000/frontend/index.html](http://localhost:8000/frontend/index.html)
- **AI Classifier**: [http://localhost:8000/frontend/classifier.html](http://localhost:8000/frontend/classifier.html)
- **Notes Interface**: [http://localhost:8000/frontend/notes.html](http://localhost:8000/frontend/notes.html)
- **Sign Up**: [http://localhost:8000/frontend/signup.html](http://localhost:8000/frontend/signup.html)

---

### Method 2: Running Locally without Docker

#### 1. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

#### 2. Start the FastAPI server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Returns Classifier API welcome message |
| `GET` | `/status` | Health check endpoint returning `{"status": "ok"}` |
| `GET` | `/health` | Health check endpoint returning `{"status": "healthy"}` |
| `POST` | `/predict` | ML question classification returning category & confidence |
| `POST` | `/api/signup` | Handles user registration with `{ fullName, email, password }` |
| `POST` | `/api/ask` | Multipart endpoint accepting question and optional document upload |
| `POST` | `/ask` | Legacy JSON endpoint accepting `{ "question": "..." }` |
