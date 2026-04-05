# 🏠 EstateAI — AI-Powered Real Estate Assistant

> An intelligent real estate recommendation platform that leverages **Google Gemini 2.5 Flash** to help users find the perfect home based on their preferences, budget, and lifestyle needs.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Backend | FastAPI (Python) |
| AI Model | Google Gemini 2.5 Flash |
| Map View | `Mapview.jsx` *(in progress)* |

---

## 📁 Project Structure

```
root/
├── Backend1/                  # FastAPI backend
│   ├── app/
│   │   ├── api/
│   │   │   └── routes.py          # API route definitions
│   │   ├── models/
│   │   │   └── schema.py          # Pydantic request/response schemas
│   │   ├── routes/
│   │   │   ├── config.py          # App configuration & environment setup
│   │   │   └── prompt.py          # Gemini prompt templates
│   │   └── services/
│   │       └── ai_services.py     # Gemini AI integration & response handling
│   ├── main.py                    # FastAPI app entry point
│   ├── run.py                     # Server runner script
│   ├── .env                       # Environment variables (API keys)
│   ├── .gitignore
│   └── requirements.txt
│
└── my-project/                # React (Vite) frontend
    ├── public/
    ├── src/
    │   ├── App.jsx                # Root component & routing
    │   ├── Home.jsx               # Landing / chat interface
    │   ├── Mapview.jsx            # 🚧 Interactive map view (in progress)
    │   ├── main.jsx               # React entry point
    │   └── index.css              # Global styles
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── eslint.config.js
```

---

## 🤖 How the AI Response Works

The backend sends a structured prompt to **Gemini 2.5 Flash** and receives a JSON response that powers the entire UI. Here's what the AI returns:

```json
{
  "summary": "EstateAI recommends Kengeri, Hoodi/Kadugodi, and KR Puram...",
  "locations": [
    {
      "name": "Kengeri",
      "coordinates": { "lat": 12.915, "lng": 77.469 },
      "metro": "Kengeri / Kengeri Bus Terminal (Purple Line)",
      "aqi": 65,
      "crime_rating": "Low",
      "infrastructure": "...",
      "future_growth": "High",
      "livability_score": 8,
      "why_best": "..."
    }
  ],
  "properties": [
    {
      "id": "kengeri-apt-001",
      "title": "Compact 2 BHK in Kengeri, near Metro",
      "type": "apartment",
      "price_lakhs": 42.5,
      "area_sqft": 920,
      "bhk": 2,
      "location": "Kengeri",
      "coordinates": { "lat": 12.9165, "lng": 77.4712 },
      "nearby": {
        "school": "Orchids The International School",
        "metro": "Kengeri Metro Station (1.5 km)",
        "hospital": "BGS Gleneagles Global Hospital"
      },
      "amenities": ["24/7 security", "power backup", "lift"],
      "furnishing": "semi-furnished",
      "investment_score": 8,
      "reason": "..."
    }
  ]
}
```

This structured response is parsed on the frontend to render:
- 📍 Location cards with AQI, crime rating, and livability scores
- 🏢 Property listings with pricing, amenities, and investment scores
- 🗺️ Interactive map pins via `Mapview.jsx` *(in progress)*

---

## ⚙️ Backend Setup

### Prerequisites
- Python 3.10+
- A Google Gemini API key

### Installation

```bash
cd Backend1
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Environment Variables

Create a `.env` file in the `Backend1/` directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Running the Server

```bash
python run.py
# or
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/recommend` | Send user query, get AI-powered property recommendations |
| `GET` | `/docs` | FastAPI auto-generated Swagger UI |

---

## 🖥️ Frontend Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd my-project
npm install
```

### Running the Dev Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

---

## 🚀 Running the Full Stack

1. Start the **FastAPI backend** (runs on port `8000`)
2. Start the **React frontend** (runs on port `5173`)
3. Open `http://localhost:5173` in your browser
4. Enter your property preferences (e.g., budget, BHK, city, proximity to IT hubs)
5. Get AI-powered recommendations with map view, property listings, and area insights

---

## ✅ Current Features

- 🤖 **AI Chat Interface** — Conversational property search powered by Gemini 2.5 Flash
- 📍 **Location Intelligence** — AQI, crime ratings, livability scores, and future growth potential
- 🏘️ **Property Listings** — Curated recommendations with investment scores and nearby amenities
- 📊 **Structured AI Output** — Consistent JSON schema for reliable UI rendering

---

## 🗺️ Roadmap & Upcoming Features

### 🚧 In Progress

| Feature | File | Status |
|---|---|---|
| Interactive Map View | `src/Mapview.jsx` | 🔄 In Progress |

### 📋 Planned

| Feature | Description | Priority |
|---|---|---|
| **LLM Fallback** | If Gemini 2.5 Flash fails or times out, automatically retry with a fallback model (e.g., Gemini 1.5 Pro or OpenAI GPT-4o). Implement in `ai_services.py` with a try/except chain. | 🔴 High |
| **Response Caching** | Cache identical or semantically similar queries (e.g., using Redis or `cachetools`) to avoid redundant Gemini API calls, reduce latency, and cut costs. Add a cache layer in `ai_services.py`. | 🔴 High |
| **Streaming Responses** | Stream the AI response token-by-token to the frontend using FastAPI's `StreamingResponse` + React's `EventSource`, giving users instant feedback instead of waiting for the full response. | 🟡 Medium |
| **User Authentication** | Add login/signup (JWT or OAuth via Google) so users can save searches, favourite properties, and view history. | 🟡 Medium |
| **Saved Searches & History** | Let users save past queries and revisit AI recommendations without re-calling the API. Pairs well with caching. | 🟡 Medium |
| **Feedback & Rating** | Allow users to rate AI recommendations (thumbs up/down per property). Collected feedback can be used to improve prompt quality over time. | 🟡 Medium |
| **Real Listings Integration** | Connect to a real estate data API (e.g., 99acres, MagicBricks, or RapidAPI housing data) to supplement AI-generated listings with actual available inventory. | 🟠 Low |
| **Multi-city Support** | Extend beyond Bangalore — detect city from the user query and adapt prompt templates in `prompt.py` accordingly. | 🟠 Low |
| **Comparison Mode** | Let users select 2–3 properties side-by-side for a feature-by-feature comparison table. | 🟠 Low |

---

## 📦 Key Dependencies

### Backend (`requirements.txt`)
```
fastapi
uvicorn
pydantic
pydantic-settings
python-dotenv
google-genai
```

### Frontend (`package.json`)
```
react
react-dom
vite
```

---

## 🔑 Environment Variables Reference

| Variable | Description | Required |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API key | ✅ Yes |
| `FALLBACK_MODEL_API_KEY` | API key for fallback LLM *(planned)* | ⏳ Planned |
| `REDIS_URL` | Redis connection URL for caching *(planned)* | ⏳ Planned |

---

## 📄 License

This project is for educational and personal use. Feel free to fork and build on top of it.

---

*Built with ❤️ using FastAPI + React + Google Gemini 2.5 Flash*