// ==========================================
// AskMyNotes Classifier - Frontend Script
// ==========================================
// FIX: On Render free tier each service runs in an isolated container.
// The nginx proxy path /api/ → http://backend:7860 does NOT work because
// "backend" is a Docker Compose internal hostname, not resolvable on Render.
// Solution: call the backend public URL directly. CORS is already
// configured on the backend to allow requests from this frontend origin.
// ==========================================

const BACKEND_URL = 'https://askmynotes-classifier-backend-latest.onrender.com';

function setSample(text) {
    document.getElementById('questionInput').value = text;
}

document.getElementById('classifyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const question = document.getElementById('questionInput').value.trim();
    if (!question) return;

    const btn = document.getElementById('submitBtn');
    const resultCard = document.getElementById('resultCard');

    btn.disabled = true;
    btn.innerHTML = '<span>Classifying...</span>';

    // Choose endpoint:
    //  - Local Docker run (port 7860 or 8000): use /predict directly on this server
    //  - Opening as a local file: call localhost backend
    //  - Deployed on Render (no port in URL): call the backend's public URL directly
    let apiEndpoint;
    if (window.location.port === '7860' || window.location.port === '8000') {
        apiEndpoint = '/predict';
    } else if (window.location.protocol === 'file:') {
        apiEndpoint = 'http://localhost:7860/predict';
    } else {
        // Deployed on Render — call the backend public URL directly
        apiEndpoint = `${BACKEND_URL}/predict`;
    }

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: question })
        });

        if (!response.ok) {
            throw new Error(`Server returned status ${response.status}`);
        }

        const data = await response.json();

        document.getElementById('categoryText').textContent = data.predicted_category || 'Unknown';
        document.getElementById('questionText').textContent = '"' + data.question + '"';
        if (data.confidence) {
            document.getElementById('confidenceText').textContent = data.confidence + ' Confidence';
        }
        resultCard.style.display = 'block';
    } catch (err) {
        alert('Error reaching prediction API: ' + err.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<span>Classify Question</span>';
    }
});
