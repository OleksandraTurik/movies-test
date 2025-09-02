# 🎬 Movies App

Frontend (React + Vite) для роботи з Movies API. Підтримує конфігурацію через `.env` змінні.

---

## ⚡ Локальний запуск

Склонуй репозиторій та перейди в папку проєкту:

git clone
cd movies-app

Встанови залежності:

npm install

Створи файл `.env` у корені проєкту та додай туди змінні:

VITE_API_URL=http://localhost:8000/api/v1
VITE_API_TOKEN=your_token_here

Запусти dev сервер:

npm run dev

---

## 🐳 Запуск у Docker

Збери Docker-образ:

docker build -t callalya/test-project-movie:latest .

Запусти контейнер із runtime змінними:

docker run --name movies -p 3000:3000 -e VITE_API_URL=YOUR_API_URL -e VITE_API_TOKEN=your_token_here callalya/test-project-movie:latest

Застосунок буде доступний на http://localhost:3000
