<div align="center">

<img src="https://raw.githubusercontent.com/codyssey-PRISM/SoriAI/main/assets/sori-logo.png" alt="Sori AI Logo" width="200"/>

# Sori(소리) AI

**따뜻한 AI 목소리로 전하는 일상의 안부**

전화라는 가장 익숙한 방식으로, AI가 매일 어르신과 대화하고 보호자에게 리포트를 전달합니다.

[🌐 Live Demo](https://sori-ai.vercel.app/) • [📚 API Docs](https://aicarecall-server-production.up.railway.app/docs) • [📖 Tech Specs](#️-시스템-아키텍처)

</div>

---

## 📌 목차

- [📋 개요](#-개요)
- [👥 팀원](#-팀원) 
- [🔗 링크들](#-링크들)
- [💡 소개](#-소개)
- [🛠️ 기술 스택](#️-기술-스택)
- [🔄 서비스 주요 플로우](#-서비스-주요-플로우)
- [🏗️ 시스템 아키텍처](#️-시스템-아키텍처)
- [🚀 시작하기](#-시작하기)
- [📁 프로젝트 구조](#-프로젝트-구조)
- [📡 API 문서](#-api-문서)

---

## 📋 개요

- **개발 기간**: 11/10(월) - 11/28(금) (약 3주)
- **프로젝트 규모**: 풀스택 3개 플랫폼 (iOS + Web + Server)
- **팀 구성**: 4명 (프론트엔드, 백엔드, iOS, 풀스택)
- **주최**: [이노베이션 아카데미 - Codyssey](https://innovationacademy.kr/)

---

## 👥 팀원

[@jaylovegood](https://github.com/jaylovegood)  
[@stevenkim18](https://github.com/stevenkim18)  
[@newcode99](https://github.com/newcode99)  
[@x0cloud69](https://github.com/x0cloud69)

---

## 🔗 링크들

[🌐 sori-ai.vercel.app](https://sori-ai.vercel.app/)  
[📚 API Docs](https://aicarecall-server-production.up.railway.app/docs)

> [!NOTE]
> **📱 iOS 앱 배포 상태**  
> iOS 앱은 애플 앱스토어 심사 절차가 진행 중입니다. 심사 승인 후 곧 다운로드 가능하도록 준비하고 있습니다!  
> 테스트하고 싶으신 분은 아래 GitHub 소스 코드를 다운 받아 Xcode에서 실행하실 수 있습니다.

[💻 GitHub - Web](https://github.com/codyssey-PRISM/AICareCall-web)  
[🖥️ GitHub - Server](https://github.com/codyssey-PRISM/AICareCall-server)  
[📱 GitHub - iOS](https://github.com/codyssey-PRISM/AICareCall-mobile)

> [!IMPORTANT]
> **💡 각 플랫폼의 전체 소스 코드는 위의 GitHub Repository 링크를 통해 확인하실 수 있습니다!**  
> 현재 레포지토리는 전체 프로젝트의 문서화 및 아키텍처 설명을 위한 메인 README입니다.

---

## 💡 소개

**Sori AI는 독거 어르신의 일상적 안부를 AI가 자동으로 확인하는 플랫폼입니다.**

### 배경

1인 가구 및 노년층 인구가 증가하면서 독거 어르신의 안부 확인이 중요한 사회적 과제가 되었습니다. 하지만 자녀와 보호자들은 바쁜 일상 속에서 매일 전화를 드리기 어렵고, 갑작스러운 이상 상황을 즉시 파악하기 어려운 현실입니다.

기존의 안부 확인 솔루션은 단순 문자나 알림 정도에 그치거나, 실제 통화 기반 서비스는 구현 난이도와 비용이 높아 접근성이 낮았습니다.

### 해결 방안

Sori AI는 이러한 문제를 해결하기 위해 다음과 같은 솔루션을 제공합니다:

- **전화라는 익숙한 UX 유지**: 어르신들이 가장 익숙한 전화 통화 방식 활용
- **AI가 대신하는 일상적 안부 전화**: 보호자를 대신해 매일 정해진 시간에 AI가 자동으로 전화를 걸어 대화
- **실시간 리포트 제공**: 통화 내용을 자동으로 요약하고 감정 분석하여 보호자에게 웹 대시보드로 제공
- **이상 징후 조기 발견**: 평소와 다른 패턴이나 감정 상태 변화를 감지하여 보호자에게 알림

### 핵심 가치

**어르신**  
매일 정해진 시간에 "누군가 나를 챙겨준다"는 따뜻한 경험

**보호자**  
"오늘도 부모님이 잘 계신다"는 안심을 한눈에 확인

**사회**  
독거 어르신의 고독사 예방과 웰빙 향상에 기여

---

## 🛠️ 기술 스택

### Frontend (Web - 보호자용)

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=flat)

- **프레임워크**: Next.js 15 (App Router)
- **UI 라이브러리**: React 19
- **상태 관리**: Zustand
- **스타일링**: Tailwind CSS + shadcn/ui  
- **차트**: Recharts

### Backend (API Server)

![Python](https://img.shields.io/badge/Python_3.11-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=flat)
![Alembic](https://img.shields.io/badge/Alembic-6BA81E?style=flat)

- **프레임워크**: FastAPI (비동기 처리)
- **ORM**: SQLAlchemy (Async)
- **마이그레이션**: Alembic
- **데이터베이스**: PostgreSQL
- **스케줄러**: APScheduler
- **인증**: JWT

### Mobile (iOS - 어르신용)

![Swift](https://img.shields.io/badge/Swift-F05138?style=flat&logo=swift&logoColor=white)
![SwiftUI](https://img.shields.io/badge/SwiftUI-0066CC?style=flat)
![Combine](https://img.shields.io/badge/Combine-FA7343?style=flat)

- **프레임워크**: SwiftUI
- **비동기**: Combine
- **통화 UI**: CallKit (실제 전화와 동일한 UX)
- **푸시**: PushKit (VoIP)

### External Services

![Vapi.ai](https://img.shields.io/badge/Vapi.ai-9333EA?style=flat)
![OpenAI](https://img.shields.io/badge/GPT--4o-412991?style=flat&logo=openai)
![APNs](https://img.shields.io/badge/APNs-000000?style=flat&logo=apple)
![Resend](https://img.shields.io/badge/Resend-000000?style=flat)

- **AI 통화**: Vapi.ai (STT-LLM-TTS 통합 파이프라인)
- **LLM**: OpenAI GPT-4o
- **푸시**: Apple Push Notification Service (APNs)
- **이메일**: Resend

### Infrastructure

![Vercel](https://img.shields.io/badge/Vercel-black?style=flat&logo=vercel)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=flat&logo=railway)

- **Web 배포**: Vercel
- **Backend 배포**: Railway

---

## 🔄 서비스 주요 플로우

### 1. 보호자 회원가입 및 온보딩 (Web)

![Onboarding Flow](https://via.placeholder.com/800x400?text=Onboarding+Flow)

### 2. 어르신 앱 다운로드 및 초대코드 입력 (iOS)

![iOS Setup](https://via.placeholder.com/800x400?text=iOS+Setup)

### 3. AI 자동 통화 시스템

![AI Call](https://via.placeholder.com/800x400?text=AI+Call+Flow)

### 4. 통화 분석 및 리포트 생성

![Analysis](https://via.placeholder.com/800x400?text=Analysis+Flow)

### 5. 보호자 대시보드에서 확인

![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+View)

### 6. 기타

#### 어르신 직접 통화 시도

![Elder Direct Call](https://via.placeholder.com/800x400?text=Elder+Direct+Call)

#### 보호자 이메일 초대코드

![Invite Code Email](https://via.placeholder.com/800x400?text=Invite+Code+Email)

#### 보호자 이메일 리포트

![Report Email](https://via.placeholder.com/800x400?text=Report+Email)

---

## 🏗️ 시스템 아키텍처

Sori AI는 **3개의 독립적인 플랫폼**이 유기적으로 연결된 풀스택 시스템입니다.

- 웹(보호자), iOS(어르신) 클라이언트가 같은 백엔드 API 사용
- AI 통화 에이전트는 **Vapi.ai** 사용

### 전체 시스템 구조

```
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   Web Client     │      │   iOS Client     │      │   Backend API    │
│  (보호자 대시보드)  │◄────►│  (어르신 통화앱)   │◄────►│   (FastAPI)      │
│   Next.js 15     │      │   SwiftUI        │      │   PostgreSQL     │
└──────────────────┘      └──────────────────┘      └────────┬─────────┘
                                                               │
                        ┌──────────────────────────────────────┼─────────┐
                        │                                      │         │
                        ▼                                      ▼         ▼
                 ┌──────────────┐                      ┌──────────┐  ┌────────┐
                 │   Vapi.ai    │                      │   APNs   │  │ Resend │
                 │  (AI Agent)  │                      │  (Push)  │  │(Email) │
                 └──────────────┘                      └──────────┘  └────────┘
```

### 핵심 워크플로우

#### 1. 통화 연결

- iOS에서 **Vapi SDK** 사용하여 통화를 연결
- 백엔드에서는 **Webhook**으로 Vapi 서버에서 통화 내용을 실시간으로 받음

#### 2. 푸시 알림

- 백엔드에서 **APNs 서버**로 푸시 전송 요청
- 초대코드 입력 성공 후, 백엔드로 전송된 iOS 디바이스 ID를 통해 푸시 전송
- iOS에서는 **PushKit**을 통해 통화 알림을 받고 **CallKit**을 통해 실제 전화와 같은 UI/UX를 제공

#### 3. LLM 및 음성 선택

- Vapi.ai는 대화 시 외부 LLM 모델과 외부 음성 모델을 선택할 수 있음

#### 4. 통화 후 분석

- 통화가 끝나면 정해진 프롬프트로 **요약, 태그 추출, 분석** 등이 가능함

---

## 🚀 시작하기

### 사전 요구사항

- **Node.js** 18+ (Frontend)
- **Python** 3.11+ (Backend)
- **PostgreSQL** 15+
- **Vapi.ai API Key**
- **OpenAI API Key**
- **Apple Developer Account** (iOS 푸시용)

### 1. Backend 설정

```bash
# 레포지토리 클론
git clone https://github.com/codyssey-PRISM/AICareCall-server.git
cd AICareCall-server

# 가상환경 생성
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 패키지 설치
pip install -r requirements.txt

# 환경변수 설정
cp .env.example .env
# .env 파일에서 아래 값 설정:
# - DATABASE_URL
# - VAPI_API_KEY
# - OPENAI_API_KEY
# - RESEND_API_KEY
# - Gmail SMTP 설정

# 데이터베이스 마이그레이션
alembic upgrade head

# 서버 실행
uvicorn app.main:app --reload
```

### 2. Frontend 설정

```bash
# 레포지토리 클론
git clone https://github.com/codyssey-PRISM/AICareCall-web.git
cd AICareCall-web

# 패키지 설치
npm install

# 환경변수 설정
cp .env.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000

# 개발 서버 실행
npm run dev
```

### 3. iOS 설정

```bash
# 레포지토리 클론
git clone https://github.com/codyssey-PRISM/AICareCall-mobile.git

# Xcode에서 프로젝트 열기
open AICareCall.xcodeproj
```

---

## 📁 프로젝트 구조

### Backend (`AICareCall-server`)

```
app/
├── main.py                 # FastAPI 엔트리포인트
├── core/                   # 핵심 설정
│   ├── config.py          # 환경변수 관리
│   └── security.py        # JWT 생성
├── db/                     # 데이터베이스
│   ├── base.py
│   ├── session.py         # Async Engine, SessionLocal
│   └── models/            # SQLAlchemy 모델
│       ├── user.py
│       ├── elder.py
│       └── call_schedule.py
├── schemas/                # Pydantic 스키마
│   ├── auth.py
│   ├── elder.py
│   └── push.py
├── services/               # 비즈니스 로직
│   ├── apns.py           # APNs 푸시
│   ├── auth.py           # 인증 코드 관리
│   ├── email.py          # Gmail SMTP
│   └── elder.py
└── routers/                # API 엔드포인트
    ├── auth.py           # /auth
    ├── push.py           # /push, /push/voip
    ├── elders.py         # /elders
    ├── webhook.py        # /vapi/webhook
    └── health.py         # /, /health
```

---

## 📡 API 문서

### Base URL

- **Production**: https://aicarecall-server-production.up.railway.app
- **Local**: http://localhost:8000

### 주요 엔드포인트

- `GET /` - 헬스체크
- `POST /auth/send-code` - 이메일 인증 코드 발송
- `POST /auth/verify-code` - 인증 코드 확인
- `POST /push` - 일반 푸시 알림
- `POST /push/voip` - VoIP 푸시
- `POST /elders` - 어르신 등록
- `GET /elders/{elder_id}` - 어르신 조회
- `POST /vapi/webhook` - Vapi Webhook

### 상세 문서

OpenAPI (Swagger) 문서: [https://aicarecall-server-production.up.railway.app/docs](https://aicarecall-server-production.up.railway.app/docs)

---

<div align="center">

**Made with ❤️ by Team PRISM**

Codyssey AI 올인원 Term 프로젝트 | [Innovation Academy](https://innovationacademy.kr/)

</div>
