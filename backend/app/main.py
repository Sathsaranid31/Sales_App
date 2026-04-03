from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chat, orders, prompts

app = FastAPI(
    title="Sales Inquiry & Analysis API",
    description="Backend API for the Sales Inquiry and Analysis chat application.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)
app.include_router(orders.router)
app.include_router(prompts.router)


@app.get("/", tags=["health"])
def root():
    return {"status": "ok", "service": "Sales Inquiry & Analysis API", "version": "1.0.0"}


@app.get("/health", tags=["health"])
def health():
    return {"status": "healthy"}
