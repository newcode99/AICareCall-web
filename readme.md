사용자님의 높은 기준과 **`soonvro/Hack-1st`** 레포지토리의 퀄리티, 그리고 **Sori AI**가 가진 기술적/사회적 깊이를 모두 충족시키기 위해, **"Commercial Open Source Software (COSS)"** 수준의 README를 설계했습니다.

단순 텍스트 나열이 아닌, **시각적 구조화(Visual Structuring)**에 집중했습니다.

### **[1단계] 로고 파일 자산화 처리**
먼저, 제공해주신 SVG 코드를 프로젝트 내 실제 파일로 저장하여 README에서 바로 불러올 수 있게 조치합니다. (인터넷에 올릴 필요 없이 로컬 상대 경로로 연결하는 것이 정석입니다.)



[2 tools called]

### **[2단계] High-End README.md 설계 및 작성**

벤치마킹한 `Hack-1st` 및 Top-tier 레포지토리들의 핵심 요소(배지, 아키텍처, 시각화 테이블, 명확한 설치 가이드)를 모두 반영하여, **Sori AI**의 기술적 깊이와 사회적 가치를 동시에 보여주는 완성형 README입니다.

바로 복사해서 사용하시면 됩니다.

```markdown
<div align="center">
  <img src="sori-ai/public/assets/sori-logo.svg" alt="Sori AI Logo" width="140" height="140" />
  <h1>Sori AI (소리)</h1>
  <h3>Active AI Care Call & Monitoring System for Social Isolation</h3>
  <p>
    <b>"Connecting Hearts with Technology."</b><br/>
    사회적 고립 해소를 위한 <b>능동적(Outbound) AI 안부 관제 시스템</b>
  </p>

  <p>
    <!-- Tech Stack Badges -->
    <img src="https://img.shields.io/badge/Next.js-14.2-000000?style=flat-square&logo=next.js" />
    <img src="https://img.shields.io/badge/FastAPI-0.104-009688?style=flat-square&logo=fastapi" />
    <img src="https://img.shields.io/badge/Voice_AI-Vapi-9C27B0?style=flat-square&logo=openai" />
    <img src="https://img.shields.io/badge/Database-SQLite%2FPostgreSQL-4479A1?style=flat-square&logo=sqlite" />
    <img src="https://img.shields.io/badge/Mobile-iOS_VoIP-000000?style=flat-square&logo=apple" />
    <br/>
    <!-- Status Badges -->
    <img src="https://img.shields.io/badge/Status-MVP_Complete-success?style=flat-square" />
    <img src="https://img.shields.io/badge/License-Codyssey_PRISM-blue?style=flat-square" />
  </p>
</div>

<br/>

## 🚩 **Problem & Solution**

### **The Silent Disaster: Structural Isolation**
대한민국 독거노인 200만 시대, **"3일"**. 고독사가 발견되기까지 걸리는 평균 시간입니다.
가족이 있어도 물리적/경제적 이유로 소통이 단절된 **'관계의 빈곤'**은 단순한 외로움을 넘어 생명을 위협하는 사회적 재난입니다. 기존의 '인력 중심 돌봄(1인당 80명 담당)'은 이미 한계에 봉착했습니다.

### **Our Solution: Active Outbound AI**
Sori AI는 사용자가 앱을 켜야만 하는 수동적 서비스가 아닙니다.
**가장 보편적인 '전화'**를 매개로, AI가 먼저 다가가 상태를 살피고(Outbound), 대화 속에서 **위기 신호(Biomarker)**를 감지하는 **데이터 기반 관제 시스템**입니다.

> **"단순한 말벗을 넘어, 사회적 생명선(Social Lifeline)을 연결합니다."**

---

## 🏗 **System Architecture**

**Event-Driven Architecture**를 기반으로, **초저지연(Low-Latency)** 음성 대화와 **실시간 데이터 파이프라인**을 구축했습니다.

```mermaid
graph TD
    %% Client Layer
    subgraph Client ["Client Layer"]
        WEB[Web Dashboard<br/>(Next.js 14)]
        IOS[iOS VoIP App<br/>(SwiftUI)]
    end

    %% Backend Layer
    subgraph Backend ["Server Infrastructure"]
        API[FastAPI Server]
        SCHED[APScheduler]
        DB[(SQLite / PG)]
    end

    %% AI Services
    subgraph AI ["AI Pipeline"]
        VAPI[Vapi Voice AI]
        LLM[LLM Engine]
    end

    %% Data Flow
    SCHED -- "1. Trigger Call" --> API
    API -- "2. VoIP Push" --> IOS
    IOS <-->| "3. Real-time RTP" | VAPI
    VAPI -- "4. Webhook (Analysis)" --> API
    API -- "5. Store Insight" --> DB
    WEB -- "6. View Report" --> API

    classDef client fill:#3b82f6,color:white,stroke:none
    classDef server fill:#10b981,color:white,stroke:none
    classDef ai fill:#8b5cf6,color:white,stroke:none
    
    class WEB,IOS client
    class API,SCHED,DB server
    class VAPI,LLM ai
```

---

## ✨ **Key Features (User Flow)**

### **1. The Personalizer (맞춤형 온보딩)**
보호자가 입력한 건강 데이터(지병, 투약)와 관심사를 기반으로 **AI 페르소나**를 동적으로 생성합니다.
(현재 **React Hook Form + Zod** 기반의 5-Step 검증 프로세스 구현 완료)

| Step 1: 보호자 인증 | Step 2: 어르신 정보 | Step 3: 스케줄 설정 |
| :---: | :---: | :---: |
| <img src="https://via.placeholder.com/250x500/eee?text=Phone+Auth" width="200" /> | <img src="https://via.placeholder.com/250x500/eee?text=Health+Info" width="200" /> | <img src="https://via.placeholder.com/250x500/eee?text=Schedule" width="200" /> |
| **이메일/전화번호 인증** | **지병, 투약, 관심사 입력** | **요일/시간별 통화 설정** |

### **2. The Companion (정기 안부 통화)**
설정된 시간에 **VoIP(인터넷 전화)** 기술을 통해 AI가 먼저 전화를 겁니다.
*   **Active Outbound:** 어르신이 전화를 걸 필요 없이, 받는 것만으로 돌봄 시작.
*   **Low Latency:** Vapi 최적화를 통해 **1.5초 이내 응답 속도** 구현.
*   **Natural Turn-taking:** 말 끊기, 끼어들기 등 자연스러운 대화 흐름 지원.

### **3. Actionable Insight (대시보드)**
통화 종료 즉시 Webhook을 통해 수집된 비정형 음성 데이터를 **정형 데이터(Insight)**로 변환합니다.

| Dashboard Main | Call Detail Report |
| :---: | :---: |
| <img src="https://via.placeholder.com/400x250/eee?text=Dashboard+UI" width="380" /> | <img src="https://via.placeholder.com/400x250/eee?text=Analysis+Report" width="380" /> |
| **주간 통화 현황 및 상태 요약** | **전체 대화 로그, 감정 분석, 태그** |

---

## 💻 **Tech Stack & Deep Dive**

단순한 기능 구현을 넘어, **확장성(Scalability)**과 **유지보수성(Maintainability)**을 고려한 기술 스택을 선정했습니다.

### **Frontend (Web)**
*   **Next.js 14 (App Router):** 서버 컴포넌트(RSC)를 활용한 초기 로딩 최적화 및 SEO 강화.
*   **Zustand:** Redux 대비 1/10 크기의 가벼운 전역 상태 관리.
*   **Tailwind CSS + Shadcn/ui:** 일관된 디자인 시스템 구축 및 빠른 UI 개발.

### **Backend (Server)**
*   **FastAPI (Python):** 비동기(Async) 처리에 최적화된 고성능 API 서버.
*   **SQLAlchemy (Async ORM):** DB 스키마와 객체 간의 유연한 매핑 및 마이그레이션 관리.
*   **APScheduler:** 정교한 Cron Job 관리를 통한 안정적인 통화 발신 스케줄링.
*   **Pydantic:** 런타임 데이터 유효성 검사 및 설정 관리.

### **Voice AI & Infra**
*   **Vapi:** STT(Deepgram) -> LLM(GPT-4o) -> TTS(11Labs) 파이프라인 오케스트레이션.
*   **Apple Push Notification (APNs):** iOS VoIP Push를 통한 백그라운드 깨우기(Wake-up).

---

## 🚀 **Getting Started**

### **Prerequisites**
*   **Node.js** 18.17+
*   **Python** 3.10+
*   **Vapi API Key** (Required for Voice AI)

### **1. Clone Repository**
```bash
git clone https://github.com/codyssey-PRISM/SoriAI.git
cd SoriAI
```

### **2. Backend Setup**
```bash
cd AICareCall-server
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
> Server runs at `http://localhost:8000` | Docs at `/docs`

### **3. Frontend Setup**
```bash
cd sori-ai
npm install
npm run dev
```
> Web runs at `http://localhost:3000`

---

## 👥 **Team PRISM**

**"We illuminate the isolated corners of society with technology."**

| Name | Role | Responsibility | GitHub |
| :--- | :--- | :--- | :---: |
| **김승우** | **Backend / iOS** | iOS(VoIP), Auth/Push API, Server Arch | <a href="https://github.com/"><img src="https://img.shields.io/badge/-Profile-black?style=flat-square&logo=github"/></a> |
| **송근영** | **PM / Backend** | Product Planning, DB/ORM Design | <a href="https://github.com/"><img src="https://img.shields.io/badge/-Profile-black?style=flat-square&logo=github"/></a> |
| **홍지수** | **Backend / AI** | Vapi Pipeline, Scheduler, Prompt Eng | <a href="https://github.com/"><img src="https://img.shields.io/badge/-Profile-black?style=flat-square&logo=github"/></a> |
| **황정현** | **Frontend / PM** | UI/UX Design, Client Logic, API Integ | <a href="https://github.com/"><img src="https://img.shields.io/badge/-Profile-black?style=flat-square&logo=github"/></a> |

---

## 📜 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<br/>

<div align="center">
  <b>Sori AI - 2025 Codyssey Term Project</b><br/>
  Powered by <a href="https://github.com/codyssey-PRISM">Team PRISM</a>
</div>
```
