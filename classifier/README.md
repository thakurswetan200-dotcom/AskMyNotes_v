# AskMyNotes Classifier

An AI-powered Question & Note Classifier featuring a hybrid **scikit-learn Machine Learning pipeline** coupled with an **Intent Engine** and a modern dark glassmorphic web UI.

---

## 📁 Project Architecture

```text
.
├── Backend/
│   ├── app.py                     # FastAPI application with ML inference
│   ├── askmynotes_classifier.pkl  # Trained ML model pipeline
│   ├── Dockerfile                 # Dockerfile for Backend service
│   └── requirements.txt           # Python dependencies
├── Frontend/
│   ├── Dockerfile                 # Alpine Nginx container
│   ├── index.html                 # Dark glassmorphic interface
│   ├── nginx.conf                 # Nginx reverse proxy configuration
│   ├── script.js                  # Frontend client logic
│   └── styles.css                 # Custom styles & animations
├── docker-compose.yml             # Docker Compose orchestration
├── render.yaml                    # Multi-service Render cloud blueprint
├── .dockerignore                  # Docker ignore rules
├── .gitignore                     # Git ignore rules
└── README.md                      # Documentation
```

---

## 🚀 Running with Docker (Recommended)

### Using Docker Compose (All-in-One):
```bash
docker compose up -d --build
```

- **Frontend Application**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:7860](http://localhost:7860)
- **Swagger Documentation**: [http://localhost:7860/docs](http://localhost:7860/docs)

---

### Building & Running Services Separately:

#### 1. Build Backend Image:
```bash
docker build -t askmynotes-classifier-backend:latest ./Backend
docker run -d -p 7860:7860 --name classifier_backend askmynotes-classifier-backend:latest
```

#### 2. Build Frontend Image:
```bash
docker build -t askmynotes-classifier-frontend:latest ./Frontend
docker run -d -p 3000:80 --name classifier_frontend askmynotes-classifier-frontend:latest
```

---

## 📡 API Endpoints

| Method | Route | Description | Sample Output |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API Welcome message | `{"message": "AskMyNotes Classifier Backend API is running"}` |
| `GET` | `/status` | Service Health check | `{"message": "AskMyNotes Classifier API Running", "status": "online"}` |
| `POST` | `/predict` | Predict question category | `{"question": "...", "predicted_category": "Comparison", "confidence": "95.2%"}` |
