# Sori AI (소리)
> **사회적 고립 해소를 위한 능동형 AI 안부 관제 시스템**

<div align="center">
  <!-- 중요: 로고는 프로젝트 루트의 assets 폴더에 있어야 합니다 -->
  <img src="assets/sori-logo.svg" alt="Sori AI Logo" width="160" height="160" />
  
  <br/><br/>

  <h3><b>"안녕하세요! 당신의 곁을 지키는 따뜻한 말벗, 소리(Sori)입니다."</b></h3>
  <p>
    <b>소리(Sori)</b>는 단순한 AI가 아닙니다.<br/>
    단절된 이들에게 <b>먼저 손을 내밀고(Active Outbound)</b>,<br/>
    그들의 목소리에서 <b>삶의 신호를 감지(Data-Driven Care)</b>하는<br/>
    <b>세상에서 가장 따뜻한 기술적 생명선</b>입니다.
  </p>

  <p>
    <img src="https://img.shields.io/badge/FrontEnd-Next.js_14-black?logo=next.js&style=flat-square" />
    <img src="https://img.shields.io/badge/BackEnd-FastAPI-009688?logo=fastapi&style=flat-square" />
    <img src="https://img.shields.io/badge/Voice_AI-Vapi-9C27B0?logo=openai&style=flat-square" />
    <img src="https://img.shields.io/badge/Mobile-iOS_VoIP-000000?logo=apple&style=flat-square" />
  </p>
</div>

<br/>

## 📢 **기획 의도: 침묵 속의 재난을 막다**

### **"혹시, 부모님의 목소리를 마지막으로 들은 게 언제인가요?"**

2025년 대한민국, 독거노인 200만 명 시대.
가족이 있어도 물리적 거리와 경제적 이유로 소통이 끊긴 **'관계의 빈곤'**은 단순한 외로움을 넘어 **고독사**라는 사회적 재난이 되었습니다.
복지사 1명이 80명을 담당하는 현재의 시스템으로는, 이 침묵 속의 위기를 막을 수 없습니다.

### **소리(Sori)의 해답: "기다리지 않고, 먼저 다가갑니다."**
우리는 앱을 켤 줄 모르는 어르신들에게 "사용법"을 가르치지 않습니다.
그저 **가장 익숙한 '전화'**를 받으시기만 하면 됩니다.

*   **Active Outbound:** 정해진 시간에 소리가 먼저 전화를 걸어 안부를 묻습니다.
*   **Deep Connection:** "식사는 하셨나요?"를 넘어, "어제 무릎 아프신 건 좀 어떠세요?"라며 기억하고 공감합니다.
*   **Social Lifeline:** 통화가 연결되는 그 순간, 어르신은 세상과 연결되고 보호자는 안심을 얻습니다.

---

## 🌊 **핵심 서비스 흐름 (Service Flow)**

<div align="center">
  <!-- 여기에 실제 서비스 플로우 이미지나 GIF를 넣으세요 -->
  <img src="https://via.placeholder.com/800x300/e0f2fe/1e3a8a?text=Sori+AI+Service+Flow" alt="Service Flow" />
</div>

### **1. The Personalizer (맞춤형 온보딩)**
*   보호자가 부모님의 건강 정보(지병, 투약), 관심사, 성격을 입력합니다.
*   소리는 이 데이터를 학습하여 **세상에 단 하나뿐인 '우리 부모님 전담 AI'**로 태어납니다.

### **2. The Companion (정기 안부 통화)**
*   **먼저 거는 전화:** 약속된 시간에 소리가 전화를 겁니다. (VoIP 기술 적용)
*   **초저지연 대화:** 실제 사람과 대화하듯, 1.5초 이내에 반응하고 말 끊기도 자연스럽게 받아줍니다.
*   **정서적 교감:** 단순 문답이 아닌, 감정을 어루만지는 따뜻한 대화를 나눕니다.

### **3. Actionable Insight (실행형 리포트)**
*   통화가 끝나자마자, 보호자에게 **'오늘의 리포트'**가 도착합니다.
*   **3줄 요약:** 5분의 긴 통화도 핵심만 쏙 뽑아 보여줍니다.
*   **감정 분석:** "오늘 기분이 좋아 보이세요" 혹은 "우울감이 감지되었습니다"를 알려줍니다.
*   **건강 태그:** #두통 #식사거름 #수면부족 같은 건강 신호를 태그로 추출합니다.

---

## 🏗 **시스템 아키텍처 (Architecture)**

소리는 **실시간성(Real-time)**과 **안정성(Reliability)**을 최우선으로 설계된 **이벤트 기반 아키텍처**입니다.

```mermaid
graph TD
    subgraph Client ["Client Side"]
        WEB[Web Dashboard<br/>(Next.js 14)]
        IOS[iOS App<br/>(SwiftUI / VoIP)]
    end

    subgraph Server ["Core Backend"]
        API[FastAPI Server]
        SCHED[APScheduler]
        DB[(SQLite / PostgreSQL)]
    end

    subgraph AI ["AI Pipeline"]
        VAPI[Vapi Voice AI]
        LLM[LLM Engine]
    end

    %% Flow
    SCHED -- "1. 통화 발신 트리거" --> API
    API -- "2. VoIP 푸시 전송" --> IOS
    IOS <-->| "3. 실시간 음성 대화 (RTP)" | VAPI
    VAPI -- "4. 분석 결과 웹훅" --> API
    API -- "5. 인사이트 저장" --> DB
    WEB -- "6. 리포트 조회" --> API
```

---

## 💻 **기술 스택 (Tech Stack)**

### **Frontend (Web)**
| 기술 | 설명 |
| :--- | :--- |
| **Next.js 14** | 최신 App Router 기반의 고성능 웹 프레임워크 |
| **Zustand** | 복잡한 온보딩 상태를 효율적으로 관리하는 경량 라이브러리 |
| **Tailwind CSS** | 빠르고 일관된 디자인 시스템 적용 |
| **Shadcn/ui** | 재사용 가능한 고품질 UI 컴포넌트 |

### **Backend (Server)**
| 기술 | 설명 |
| :--- | :--- |
| **FastAPI** | Python 기반의 초고속 비동기(Async) API 서버 |
| **SQLAlchemy** | 안정적인 데이터베이스 스키마 관리 및 ORM |
| **APScheduler** | 수천 건의 통화 스케줄을 오차 없이 관리하는 스케줄러 |
| **Pydantic** | 엄격한 데이터 검증으로 시스템 안정성 확보 |

---

## 🚀 **설치 및 실행 가이드 (Getting Started)**

### **필수 요구사항**
*   Node.js 18+
*   Python 3.10+
*   Vapi API Key

### **1. 프로젝트 클론**
```bash
git clone https://github.com/codyssey-PRISM/SoriAI.git
cd SoriAI
```

### **2. 백엔드 설정 (FastAPI)**
```bash
cd AICareCall-server
python -m venv venv
# Windows: venv\Scripts\activate
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# 서버 주소: http://localhost:8000
# API 문서: http://localhost:8000/docs
```

### **3. 프론트엔드 설정 (Next.js)**
```bash
cd sori-ai
npm install
npm run dev
# 웹 주소: http://localhost:3000
```

---

## 👥 **Team PRISM (팀 프리즘)**

**"기술로 세상의 그늘진 곳을 비춥니다."**

<div align="center">
  <table>
    <tr>
      <td align="center" width="200">
        <a href="https://github.com/KimSeungWoo">
          <img src="https://avatars.githubusercontent.com/u/placeholder?v=4" width="100" alt="김승우"/><br />
          <sub><b>김승우</b></sub>
        </a><br/>
        Backend / iOS<br/>(VoIP, Push, Auth)
      </td>
      <td align="center" width="200">
        <a href="https://github.com/SongGeunYoung">
          <img src="https://avatars.githubusercontent.com/u/placeholder?v=4" width="100" alt="송근영"/><br />
          <sub><b>송근영</b></sub>
        </a><br/>
        PM / Backend<br/>(기획, DB 설계)
      </td>
      <td align="center" width="200">
        <a href="https://github.com/HongJiSu">
          <img src="https://avatars.githubusercontent.com/u/placeholder?v=4" width="100" alt="홍지수"/><br />
          <sub><b>홍지수</b></sub>
        </a><br/>
        Backend / AI<br/>(Vapi, 프롬프트)
      </td>
      <td align="center" width="200">
        <a href="https://github.com/HwangJungHyun">
          <img src="https://avatars.githubusercontent.com/u/placeholder?v=4" width="100" alt="황정현"/><br />
          <sub><b>황정현</b></sub>
        </a><br/>
        Frontend / PM<br/>(UI/UX, API 연동)
      </td>
    </tr>
  </table>
</div>

---

## 📜 **라이선스 (License)**

이 프로젝트는 **MIT License**를 따릅니다.

<div align="center">
  <br/>
  <b>Sori AI - 2025 Codyssey Term Project</b><br/>
  <i>Connecting Hearts with Technology.</i>
</div>
```

---

**[로고 엑박 해결을 위한 추가 조치]**

제가 아까 `mkdir -p assets && cp ...` 명령어로 로고를 옮겨두었습니다.
이 `README.md`를 레포지토리에 푸시할 때, **반드시 `assets` 폴더와 그 안의 `sori-logo.svg` 파일도 함께 푸시(add & commit)**되어야 합니다. 그래야 GitHub에서 보입니다.

**내 로컬 파일에만 있어서 작동을 안 하는 것인가?**
-> **맞습니다.** GitHub 웹사이트는 사용자님의 컴퓨터에 있는 `c:\Users\...` 경로를 읽을 수 없습니다. 그래서 프로젝트 폴더 안에 이미지를 넣고, 그 폴더 통째로 GitHub에 올려야(Push) 웹상에서 이미지가 보이게 됩니다. 제가 해둔 `assets/sori-logo.svg` 방식이 바로 그것입니다.
