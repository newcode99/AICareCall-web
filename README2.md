<div align="center">

<img src="public/sori-symbol-512.svg"/>

# Sori(소리) AI

<h3><b>"안녕하세요! 당신의 곁을 지키는 따뜻한 말벗, 소리(Sori)입니다."</b></h3>
  <p>
    <b>소리(Sori)</b>는 단순한 AI가 아닙니다.<br/>
    단절된 이들에게 <b>먼저 손을 내밀고(Active Outbound)</b>,<br/>
    그들의 목소리에서 <b>삶의 신호를 감지(Data-Driven Care)</b>합니다.<br/>
    <b>' 세상에서 가장 따뜻한 목소리로 단절된 마음을 </b>잇다. '

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
- **주최**: 이노베이션 아카데미 - Codyssey

## 👥 팀원

<table>
<tr>
<td align="center" width="25%">
<a href="https://github.com/jaylovegood">
<img src="https://github.com/jaylovegood.png" width="100px;" alt="jaylovegood"/><br />
<sub><b>@jaylovegood</b></sub>
</a>
</td>
<td align="center" width="25%">
<a href="https://github.com/stevenkim18">
<img src="https://github.com/stevenkim18.png" width="100px;" alt="stevenkim18"/><br />
<sub><b>@stevenkim18</b></sub>
</a>
</td>
<td align="center" width="25%">
<a href="https://github.com/newcode99">
<img src="https://github.com/newcode99.png" width="100px;" alt="newcode99"/><br />
<sub><b>@newcode99</b></sub>
</a>
</td>
<td align="center" width="25%">
<a href="https://github.com/x0cloud69">
<img src="https://github.com/x0cloud69.png" width="100px;" alt="x0cloud69"/><br />
<sub><b>@x0cloud69</b></sub>
</a>
</td>
</tr>
</table>

## 🔗 링크들

| 🌐 서비스         | 설명                                             | URL                                                                  | 배포                                                                                                   |
| ----------------- | ------------------------------------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Web Dashboard** | 보호자용 대시보드 (통화 리포트, 통계, 일정 관리) | [sori-ai.vercel.app](https://sori-ai.vercel.app/)                    | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)    |
| **API Server**    | FastAPI 기반 백엔드 (Swagger 문서)               | [API Docs](https://aicarecall-server-production.up.railway.app/docs) | ![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=flat-square&logo=railway&logoColor=white) |

---

> [!NOTE]
> 📱 **iOS 앱 배포 상태**
>
> iOS 앱은 애플 앱스토어 심사 절차가 진행 중입니다. 심사 승인 후 곧 다운로드 가능하도록 준비하고 있습니다!
>
> 테스트하고 싶으신 분은 아래 Github 소스 코드를 다운 받아 Xcode에서 실행하실 수 있습니다.

| 📦 Repository | 주요 기술 스택                   | 설명                                      | 링크                                                          |
| ------------- | -------------------------------- | ----------------------------------------- | ------------------------------------------------------------- |
| **Web**       | Next.js, TypeScript, TailwindCss | 보호자용 웹 대시보드 프론트엔드           | [GitHub](https://github.com/codyssey-PRISM/AICareCall-web)    |
| **Server**    | FastAPI, PostgreSQL, APScheduler | AI 통화 스케줄링 및 APNs 푸시 백엔드      | [GitHub](https://github.com/codyssey-PRISM/AICareCall-server) |
| **iOS**       | Swift, SwiftUI, TCA              | 어르신용 AI 통화 iOS 앱 (CallKit/PushKit) | [GitHub](https://github.com/codyssey-PRISM/AICareCall-mobile) |

---

> [!IMPORTANT]
> 💡 **각 플랫폼의 전체 소스 코드는 위의 GitHub Repository 링크를 통해 확인하실 수 있습니다!**
>
> 현재 레포지토리는 전체 프로젝트의 문서화 및 아키텍처 설명을 위한 메인 README입니다.

## 💡 소개 (Project Background)

### **"연결의 부재가 만드는 고립"**
2025년 대한민국, 독거노인 200만명 시대.
가족이 있어도 물리적 거리와 경제적 이유로 소통이 끊긴 **'관계의 빈곤'**은 단순한 외로움을 넘어 **고독사**라는 사회적 재난이 되었습니다.
복지사 1명이 80명을 담당하는 현재의 시스템으로는, 이 침묵 속의 위기를 막을 수 없습니다.

### 해결 방안
#### **소리(Sori)의 해답: "기다리지 않고, 먼저 다가갑니다."**
우리는 앱을 켤 줄 모르는 어르신들에게 "사용법"을 가르치지 않습니다.
그저 **가장 익숙한 '전화'**를 받으시기만 하면 됩니다.

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
AI가 1차 스크리닝, 인간은 위험군에 집중.  

### 🌊 **핵심 서비스 흐름 (Service Flow)**

<div align="center">
  <!-- 여기에 실제 서비스 플로우 이미지나 GIF를 넣으세요 -->
  <img src="https://via.placeholder.com/800x300/e0f2fe/1e3a8a?text=Sori+AI+Service+Flow" alt="Service Flow" />
</div>

#### **1. The Personalizer (맞춤형 온보딩)**
*   보호자가 부모님의 건강 정보(지병, 투약), 관심사, 성격을 입력합니다.
*   소리는 이 데이터를 학습하여 **세상에 단 하나뿐인 '우리 부모님 전담 AI'**로 태어납니다.

#### **2. The Companion (정기 안부 통화)**
*   **먼저 거는 전화:** 약속된 시간에 소리가 전화를 겁니다. (VoIP 기술 적용)
*   **초저지연 대화:** 실제 사람과 대화하듯, 1.5초 이내에 반응하고 말 끊기도 자연스럽게 받아줍니다.
*   **정서적 교감:** 단순 문답이 아닌, 감정을 어루만지는 따뜻한 대화를 나눕니다.

#### **3. Actionable Insight (실행형 리포트)**
*   통화가 끝나자마자, 보호자에게 **'오늘의 리포트'**가 도착합니다.
*   **3줄 요약:** 5분의 긴 통화도 핵심만 쏙 뽑아 보여줍니다.
*   **감정 분석:** "오늘 기분이 좋아 보이세요" 혹은 "우울감이 감지되었습니다"를 알려줍니다.
*   **건강 태그:** #두통 #식사거름 #수면부족 같은 건강 신호를 태그로 추출합니다.

” 본 프로덕트/서비스는 실제 건강 상태나 투약 여부, 정서적 우울감을 객관적으로 파악하고,
독거노인들의 '우울증과 사회적 고립을 방지하기 위해 기획/개발됨. “ 

---

## 🛠️ 기술 스택

### Frontend (Web - 보호자용)

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Shadcn](https://img.shields.io/badge/Shadcn-black?style=flat)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=flat)

- **프레임워크**: Next.js / React (App Router 기반 SSR)
- **언어**: TypeScript (타입 안정성)
- **스타일링**: Tailwind CSS + Shadcn (유틸리티 퍼스트 CSS + 재사용 컴포넌트)
- **상태 관리**: Zustand (경량 전역 상태 관리)

### Backend (API Server)

![Python](https://img.shields.io/badge/Python_3.11-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=flat)
![APScheduler](https://img.shields.io/badge/APScheduler-green?style=flat)
![Vapi](https://img.shields.io/badge/Vapi_Server_SDK-9333EA?style=flat)
![SendGrid](https://img.shields.io/badge/SendGrid-0080FF?style=flat)

- **프레임워크**: Python / FastAPI (비동기 고성능 API 서버)
- **데이터베이스**: SQLAlchemy + PostgreSQL (비동기 ORM + 관계형 DB)
- **푸시 알림**: APNs (HTTP/2) - iOS VoIP 푸시
- **스케줄러**: APScheduler (자동 통화 예약 시스템)
- **AI 음성**: Vapi Server SDK (AI 음성 통화 연동)
- **이메일**: SendGrid (인증 코드 발송)

### Mobile (iOS - 어르신용)

![Swift](https://img.shields.io/badge/Swift-F05138?style=flat&logo=swift&logoColor=white)
![SwiftUI](https://img.shields.io/badge/SwiftUI-0066CC?style=flat)
![TCA](https://img.shields.io/badge/TCA-orange?style=flat)
![CallKit](https://img.shields.io/badge/CallKit-black?style=flat&logo=apple)
![PushKit](https://img.shields.io/badge/PushKit-black?style=flat&logo=apple)
![Vapi](https://img.shields.io/badge/Vapi_iOS_SDK-9333EA?style=flat)

- **프레임워크**: Swift / SwiftUI (네이티브 iOS 개발)
- **아키텍처**: TCA (The Composable Architecture - 단방향)
- **통화 시스템**: CallKit / PushKit (시스템 전화 UI + VoIP 푸시 수신)
- **AI 음성**: Vapi iOS SDK (AI 음성 통화 클라이언트)
- **의존성 관리**: swift-dependencies (테스트 가능한 의존성 주입)

### Infrastructure

![Vercel](https://img.shields.io/badge/Vercel-black?style=flat&logo=vercel)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=flat&logo=railway)

- **Web 배포**: Vercel
- **Backend 배포**: Railway

---

## 🔄 서비스 주요 플로우

### 1. (보호자) 온보딩 화면

![onboarding](images/onboarding.gif)

### 2. (보호자) 보호자 + 어르신 정보 입력 및 신청

![register](images/register.gif)

### 3. (어르신) iOS앱 초대 코드 입력

<img width=250 src="images/iOS-invite-code.gif">

### 4. (어르신) 백엔드(스케줄러) 푸시 알림 발송 -> 통화 수락

<img width=250 src="images/iOS-voip-push.gif">

### 5. (보호자) 통화 종료 후 보호자 이메일로 리포트 전송 -> 대시보드

![dashboard](images/dashboard.gif)

### 6. 기타

#### 어르신 직접 통화 시도

<img width=250 src="images/iOS-user-call.gif">

#### 보호자 이메일 초대코드

![invite-code](images/mail-invite-code.png)

#### 보호자 이메일 리포트

![report](images/mail-report.png)

---

## 🏗️ 시스템 아키텍처

Sori AI는 **3개의 독립적인 플랫폼**이 유기적으로 연결된 풀스택 시스템입니다.

- 웹(보호자), iOS(어르신) 클라이언트가 같은 백엔드 API 사용
- AI 통화 에이전트는 **Vapi.ai** 사용

### 전체 시스템 구조

![아키텍처 다이어그램](아키택처%20다이어그램.png)

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

### Web (`AICareCall-web`)

```
app/
├── (dashboard)/            # 대시보드 라우트 그룹
│   ├── page.tsx           # 메인 대시보드
│   ├── report/            # 리포트 페이지
│   ├── settings/          # 설정 페이지
│   └── chat/              # 채팅 페이지
├── onboarding/             # 온보딩 5단계
│   └── page.tsx
├── register/               # 회원가입
│   └── page.tsx
├── components/             # 재사용 컴포넌트
│   ├── Sidebar.tsx
│   ├── LNB.tsx
│   └── custom/            # 커스텀 컴포넌트
components/
├── onboarding/            # 온보딩 단계별 컴포넌트
│   ├── Step1GuardianInfo.tsx
│   ├── Step2ElderInfo.tsx
│   ├── Step3CallSettings.tsx
│   ├── Step4CallContent.tsx
│   └── Step5Confirmation.tsx
lib/
├── api/                   # API 호출 함수
│   ├── elder.ts
│   ├── dashboard.ts
│   └── convert.ts
└── store/                 # Zustand 전역 상태
    └── userStore.ts
```

### Server (`AICareCall-server`)

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
│   ├── email.py          # SendGrid 이메일
│   └── elder.py
└── routers/                # API 엔드포인트
    ├── auth.py           # /auth
    ├── push.py           # /push, /push/voip
    ├── elders.py         # /elders
    ├── webhook.py        # /vapi/webhook
    └── health.py         # /, /health
```

### iOS (`AICareCall-mobile`)

```
AICareCall/
├── App/                    # 앱 진입점
│   └── AICareCallApp.swift
├── Features/               # TCA 기반 기능 모듈
│   ├── Onboarding/        # 온보딩 (초대코드 입력)
│   ├── Call/              # 통화 화면
│   └── Settings/          # 설정
├── Services/               # 서비스 레이어
│   ├── VapiService.swift  # Vapi SDK 래퍼
│   ├── APNsService.swift  # Push 처리
│   └── CallKitService.swift # CallKit 관리
├── Models/                 # 데이터 모델
│   ├── Elder.swift
│   └── CallSession.swift
└── Dependencies/           # swift-dependencies
    └── DependencyValues+.swift
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

**Made with by Team PRISM**

Codyssey AI 올인원 Term 프로젝트 | [Innovation Academy](https://innovationacademy.kr/)

</div>
