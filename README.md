# TOOLY-WEBSITE-METAMORPHIX

<p align="center">
  <img src="assets/banner.png" alt="Tooly Banner"/>
</p>

# 🚀 Tooly — Enterprise Multi-Tool Platform

<p align="center">
<img src="https://img.shields.io/badge/build-passing-brightgreen"/>
<img src="https://img.shields.io/badge/python-3.10+-blue"/>
<img src="https://img.shields.io/badge/framework-FastAPI-009688"/>
<img src="https://img.shields.io/badge/license-MIT-black"/>
</p>

---

## 🌍 Overview

Tooly is a scalable full-stack web platform that provides multiple online tools in one place — including image processing, video tools, PDF utilities, text utilities, and developer tools.

Built using production-ready architecture designed for performance, security, and scalability.

---

## ✨ Features

### Image Tools
- Image Compressor
- Image Resizer
- Format Converter
- Background Remover (AI)

### Video Tools
- Video Compressor
- Video Enhancer
- Video → Audio Converter

### PDF Tools
- PDF Merge
- PDF Split
- Image → PDF
- Text → PDF

### Utility Tools
- QR Generator
- URL Shortener
- JSON Formatter
- Color Picker
- Notes Pad

---

## 🏗 Architecture

Client → API → Services → Workers → Storage → Response

Backend Pattern:
Routes → Services → Models → Database

---

## ⚙️ Tech Stack

Frontend
- HTML
- CSS
- JavaScript

Backend
- FastAPI
- Python
- Pillow
- OpenCV
- MoviePy
- FFmpeg
- Rembg AI

Database
- PostgreSQL
- MongoDB
- Redis

Deployment
- Docker
- Nginx
- Gunicorn

---

## 🔐 Security

- JWT Authentication
- Password Hashing
- Rate Limiting
- Upload Validation
- API Protection
- Secure File Handling

---

## 📂 Project Structure

tooly/
 ├ frontend/
 ├ backend/
 ├ docker/
 ├ nginx/
 └ README.md

---

## 🚀 Installation

Clone repo

git clone https://github.com/mondalanshu2006-wq/TOOLY-WEBSITE-METAMORPHIX  
cd tooly

Backend setup

cd backend  
python -m venv venv  
source venv/bin/activate  
pip install -r requirements.txt  
uvicorn app.main:app --reload  

Frontend run

cd frontend/pages  
python -m http.server  

Open browser

http://127.0.0.1:8000/docs

---

## 🧪 API Docs

Swagger documentation available at:

/docs

---

## 📈 Scalability Design

System supports:

- async processing
- background workers
- task queue
- horizontal scaling
- cloud deployment

---

## 🔮 Future Roadmap

- User dashboard
- Subscription plans
- File history
- Cloud storage
- Admin panel
- Analytics

---

## 🤝 Contributing

1. Fork repo  
2. Create branch  
3. Commit changes  
4. Submit pull request  

---
MIT License

Copyright (c) 2026 THINKRON--GROUP

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 👨‍💻 Author

Your Name  ANONYMOUS
GitHub: https://github.com/mondalanshu2006-wq

---

⭐ Star this repo if you like this project
