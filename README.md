# Sales Inquiry & Analysis App

A full-stack sales analysis application with an AI-powered chat interface and interactive order grid.

## Project Structure

```
sales-app/
├── frontend/          # React + Vite
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Header.jsx
│       │   ├── ChatWindow.jsx
│       │   ├── MessageBubble.jsx
│       │   ├── PresetPrompts.jsx
│       │   ├── OrdersGrid.jsx
│       │   └── TableResponse.jsx
│       ├── hooks/
│       │   ├── useChat.js
│       │   └── useOrders.js
│       ├── data/
│       │   └── mockData.js
│       ├── styles/
│       │   └── index.css
│       ├── App.jsx
│       └── main.jsx
└── backend/           # FastAPI
    ├── app/
    │   ├── routers/
    │   │   ├── chat.py
    │   │   ├── orders.py
    │   │   └── prompts.py
    │   ├── models/
    │   │   └── schemas.py
    │   ├── data/
    │   │   └── mock_data.py
    │   └── main.py
    ├── requirements.txt
    └── .env
```

## Quick Start

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
API runs at: http://localhost:8000
Swagger docs: http://localhost:8000/docs

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs at: http://localhost:3000

## API Endpoints

| Method | Endpoint            | Description                  |
|--------|---------------------|------------------------------|
| GET    | /                   | Health check                 |
| GET    | /health             | Health status                |
| POST   | /api/chat           | Send a chat message          |
| GET    | /api/orders         | Get all open orders          |
| GET    | /api/orders/{id}    | Get a single order           |
| GET    | /api/prompts        | Get all preset prompts       |
| GET    | /api/prompts/{cat}  | Get prompts by category      |

## Preset Prompt Categories
- **Items** — Top selling items by $, Volume, GP%
- **Customer** — Top customers by $, Volume, GP%
- **Sales Rep** — Top sales reps by $, Volume, GP%
- **Orders** — Open orders inquiry
