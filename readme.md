
# Sori AI (소리)

<div align="center">
  <!-- 로고 경로는 실제 리포지토리의 public 또는 assets 폴더 경로로 맞춰주세요. -->
  <!-- 만약 로고 파일이 없다면, 아래 placeholder를 사용하다가 교체하십시오. -->
  <img src="https://via.placeholder.com/150/3B82F6/FFFFFF?text=Sori+AI" alt="Sori AI Logo" width="120" height="120" />
  
  <h3><b>Hyper-Personalized AI Care Call System</b></h3>
  <p>
    <b>FastAPI & Next.js 14</b> 기반의 능동형 AI 안부 관제 시스템<br/>
    Connecting Hearts with <b>Low-Latency Voice AI Technology</b>
  </p>

  <!-- Badges: Tech Stack & Status -->
  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js" alt="Next.js"></a>
    <a href="https://fastapi.tiangolo.com/"><img src="https://img.shields.io/badge/FastAPI-0.104-009688?style=flat-square&logo=fastapi" alt="FastAPI"></a>
    <a href="https://vapi.ai/"><img src="https://img.shields.io/badge/Voice_AI-Vapi-purple?style=flat-square&logo=openai" alt="Vapi"></a>
    <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python" alt="Python"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript" alt="TypeScript"></a>
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
  </p>
</div>

<br/>

## 📖 **Introduction**

> **"Technology as a Social Lifeline."**

**Sori AI**는 고독사 및 사회적 고립 문제를 해결하기 위한 **능동적(Outbound) AI 관제 솔루션**입니다.
기존의 수동적인 응급벨/CCTV 시스템과 달리, AI가 설정된 스케줄에 맞춰 먼저 전화를 걸고(Outbound Call), **Vapi(Voice AI)** 파이프라인을 통해 수집된 비정형 음성 데이터를 **정형 데이터(감정, 요약, 위급도)**로 변환하여 보호자에게 실시간 인사이트를 제공합니다.

### **Core Competency**
- **Zero-Interaction:** 대상자(노인)의 조작 없이도 돌봄이 수행되는 **Active Outbound** 시스템.
- **Real-time Pipeline:** Vapi Webhook을 활용한 **통화 종료 즉시(Real-time) 리포트 생성**.
- **Dual Interface:** 보호자를 위한 **Web Dashboard**와 대상자를 위한 **iOS VoIP App**.

---

## 🏗 **System Architecture**

이 프로젝트는 **Monorepo** 구조를 지향하며, 프론트엔드와 백엔드가 유기적으로 연결된 **Event-Driven Architecture**입니다.

```mermaid
graph TD
    subgraph Client ["Client Side"]
        WEB[Web Dashboard<br/>(Next.js 14)]
        IOS[iOS App<br/>(SwiftUI / VoIP)]
    end

    subgraph Server ["Backend Infrastructure"]
        API[FastAPI Server]
        DB[(SQLite / PostgreSQL)]
        SCHED[APScheduler]
    end

    subgraph AI ["AI Services"]
        VAPI[Vapi Voice AI]
        LLM[LLM Engine]
    end

    WEB -->|REST API| API
    SCHED -->|Trigger Call| API
    API -->|VoIP Push| IOS
    IOS <-->|RTP Stream| VAPI
    VAPI -->|Webhook Analysis| API
    API -->|Persist Data| DB
```

---

## 📂 **Project Structure**

주요 디렉토리 구조는 다음과 같습니다.

```bash
SoriAI/
├── AICareCall-server/          # 🐍 Backend (FastAPI)
│   ├── app/
│   │   ├── routers/            # API Endpoints (Auth, Elder, Webhook)
│   │   ├── services/           # Business Logic (Email, Push, Dashboard)
│   │   ├── models/             # Database Models (SQLAlchemy)
│   │   ├── schemas/            # Pydantic DTOs
│   │   └── core/               # Config & Security
│   ├── data/                   # SQLite Database
│   └── requirements.txt        # Python Dependencies
│
├── sori-ai/                    # ⚛️ Frontend (Next.js 14)
│   ├── app/                    # App Router (Pages & Layouts)
│   │   ├── (dashboard)/        # Dashboard & Detail Pages
│   │   ├── onboarding/         # Registration Flow
│   │   └── api/                # Next.js API Routes (Proxy)
│   ├── components/             # Reusable UI Components
│   ├── lib/                    # API Clients & Utils
│   └── store/                  # Global State (Zustand)
│
└── README.md                   # Project Documentation
```

---

## ✨ **Key Features**

### **1. Hyper-Personalized Onboarding**
- **Dynamic Scenario:** 보호자가 입력한 건강/관심사 데이터를 기반으로 AI 페르소나 및 시스템 프롬프트 자동 생성.
- **Tech:** React Hook Form + Zod를 활용한 견고한 5-Step 폼 밸리데이션.

### **2. Active AI Call System**
- **VoIP Integration:** iOS PushKit을 활용한 실제 전화와 동일한 수신 경험 제공.
- **Low Latency:** Vapi 최적화를 통해 인간과 유사한 반응 속도 구현.

### **3. Actionable Insight Dashboard**
- **Automated Reporting:** 통화 종료 직후 Webhook 이벤트를 수신하여 **요약(Summary)** 및 **감정(Sentiment)** 데이터 자동 적재.
- **Visualization:** Shadcn/ui & Recharts를 활용한 직관적인 데이터 시각화.

---

## 🚀 **Getting Started**

로컬 환경에서 프로젝트를 실행하기 위한 가이드입니다.

### **Prerequisites**
- Node.js 18.17+
- Python 3.10+
- Vapi API Key

### **1. Backend Setup**

```bash
# 1. 서버 디렉토리 이동
cd AICareCall-server

# 2. 가상환경 생성 및 실행
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. 의존성 설치
pip install -r requirements.txt

# 4. 환경변수 설정 (.env 생성)
# .env.example 파일을 참고하여 설정하세요.

# 5. 서버 실행
uvicorn app.main:app --reload
# Server running at http://localhost:8000
# API Docs at http://localhost:8000/docs
```

### **2. Frontend Setup**

```bash
# 1. 클라이언트 디렉토리 이동
cd sori-ai

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev
# App running at http://localhost:3000
```

---

## 👥 **Team & Contributors**

**Team PRISM** - "세상을 비추는 기술을 만듭니다."

| Name | Role | Main Responsibility |
| :--- | :--- | :--- |
| **김승우** | **Backend / Mobile** | iOS (VoIP), Auth & Push API, Server Architecture |
| **송근영** | **PM / Backend** | Product Planning, DB Schema Design, Service Logic |
| **홍지수** | **Backend / AI** | Vapi Pipeline Integration, Prompt Engineering, Scheduler |
| **황정현** | **Frontend / PM** | UI/UX Design, Client Architecture, API Integration |

---

## 📜 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

---
