# Sori AI (소리)
> **Active AI Care Call & Monitoring System for Structural Isolation**

<div align="center">
  <img src="assets/sori-logo.svg" alt="Sori AI Logo" width="180" height="180" />
  
  <br/><br/>

  <h3><b>"Hello! I'm Sori, your warm-hearted AI companion."</b></h3>
  <p>
    We connect hearts with technology, bridging the gap of social isolation through 
    <b>Active Outbound AI Calls</b> and <b>Data-Driven Monitoring</b>.
  </p>

  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/FrontEnd-Next.js_14-black?logo=next.js" /></a>
    <a href="https://fastapi.tiangolo.com/"><img src="https://img.shields.io/badge/BackEnd-FastAPI-009688?logo=fastapi" /></a>
    <a href="https://vapi.ai/"><img src="https://img.shields.io/badge/Voice_AI-Vapi-purple?logo=openai" /></a>
    <a href="https://www.apple.com/kr/ios/"><img src="https://img.shields.io/badge/Mobile-iOS_VoIP-000000?logo=apple" /></a>
  </p>
</div>

---

## 📢 **Project Overview**

### **The Silent Disaster: Structural Isolation**
In 2025, over **2 million elderly people** in Korea live alone. The average time to discover a lonely death is **3 days**.
Existing care systems are collapsing under the weight of a **1:80 caregiver-to-patient ratio**. This is not just loneliness; it is a **structural disaster**.

### **Our Solution: "Active Outbound"**
**Sori AI** is not a passive chatbot. It is a **proactive care system** that reaches out first.
Using the most universal device—the **telephone**—Sori AI initiates calls based on personalized schedules, engages in deep conversations, and detects health anomalies (biomarkers) in real-time.

> **Key Value:**
> 1.  **Connection:** The only lifeline to the outside world.
> 2.  **Validation:** Emotional support that says, "Someone remembers you."
> 3.  **Intervention:** Non-pharmacological prescription for cognitive health.

---

## 🌊 **Service Flow**

<div align="center">
  <img src="https://via.placeholder.com/800x300/3b82f6/ffffff?text=Service+Flow+Image+(Replace+with+Actual)" alt="Service Flow" />
  <br/>
  <i>(Replace this placeholder with the actual flow image from the original repo)</i>
</div>

### **1. The Personalizer (Onboarding)**
*   **Guardians** input health data (medication, chronic diseases) & interests.
*   **AI** generates a hyper-personalized persona & conversation scenario.

### **2. The Companion (Active Call)**
*   **Active Outbound:** AI calls first at scheduled times. No action needed from the elder.
*   **Low-Latency:** <1.5s response time for natural turn-taking conversations.
*   **VoIP Technology:** High-quality voice call via iOS CallKit integration.

### **3. Actionable Insight (Dashboard)**
*   **Real-time Analysis:** Summarizes 5-min conversations into **3 key sentences**.
*   **Sentiment Analysis:** Detects emotional state (Good/Neutral/Bad) & keywords.
*   **Health Tags:** Automatically extracts health-related tags (e.g., #LegPain, #SkippedMeal).

---

## 🏗 **System Architecture**

We implemented an **Event-Driven Architecture** to handle real-time voice streams and webhook events efficiently.

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
    SCHED -- "1. Trigger Call" --> API
    API -- "2. VoIP Push" --> IOS
    IOS <-->| "3. Real-time Voice (RTP)" | VAPI
    VAPI -- "4. Webhook (Analysis)" --> API
    API -- "5. Store Insight" --> DB
    WEB -- "6. View Report" --> API
```

---

## 💻 **Tech Stack**

### **Frontend (Web)**
| Stack | Version | Usage |
| :--- | :--- | :--- |
| **Next.js** | 14.2 (App Router) | Server Components, SEO, Performance |
| **Zustand** | 5.0 | Lightweight Global State Management |
| **Tailwind CSS** | 3.4 | Utility-first Styling |
| **Shadcn/ui** | Latest | Reusable UI Components |

### **Backend (Server)**
| Stack | Version | Usage |
| :--- | :--- | :--- |
| **FastAPI** | 0.104 | High-performance Async API |
| **SQLAlchemy** | 2.0 | Async ORM & Schema Management |
| **APScheduler** | 3.10 | Cron-style Job Scheduling |
| **Pydantic** | 2.5 | Data Validation & Settings |

---

## 🚀 **Getting Started**

### **Prerequisites**
*   Node.js 18+
*   Python 3.10+
*   Vapi API Key

### **1. Clone & Setup**
```bash
git clone https://github.com/codyssey-PRISM/SoriAI.git
cd SoriAI
```

### **2. Backend (FastAPI)**
```bash
cd AICareCall-server
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# Server: http://localhost:8000 | Docs: http://localhost:8000/docs
```

### **3. Frontend (Next.js)**
```bash
cd sori-ai
npm install
npm run dev
# Web: http://localhost:3000
```

---

## 👥 **Team PRISM**

<div align="center">
  <table>
    <tr>
      <td align="center" width="200">
        <a href="https://github.com/KimSeungWoo">
          <img src="https://avatars.githubusercontent.com/u/placeholder?v=4" width="100" alt="KimSeungWoo"/><br />
          <sub><b>Kim SeungWoo</b></sub>
        </a><br/>
        Backend / iOS<br/>(VoIP, Push, Auth)
      </td>
      <td align="center" width="200">
        <a href="https://github.com/SongGeunYoung">
          <img src="https://avatars.githubusercontent.com/u/placeholder?v=4" width="100" alt="SongGeunYoung"/><br />
          <sub><b>Song GeunYoung</b></sub>
        </a><br/>
        PM / Backend<br/>(Planning, DB Schema)
      </td>
      <td align="center" width="200">
        <a href="https://github.com/HongJiSu">
          <img src="https://avatars.githubusercontent.com/u/placeholder?v=4" width="100" alt="HongJiSu"/><br />
          <sub><b>Hong JiSu</b></sub>
        </a><br/>
        Backend / AI<br/>(Vapi, Prompt Eng)
      </td>
      <td align="center" width="200">
        <a href="https://github.com/HwangJungHyun">
          <img src="https://avatars.githubusercontent.com/u/placeholder?v=4" width="100" alt="HwangJungHyun"/><br />
          <sub><b>Hwang JungHyun</b></sub>
        </a><br/>
        Frontend / PM<br/>(UI/UX, Client Logic)
      </td>
    </tr>
  </table>
</div>

---

## 📜 **License**

This project is licensed under the MIT License.

<div align="center">
  <br/>
  <b>Sori AI - 2025 Codyssey Term Project</b><br/>
  <i>"We illuminate the isolated corners of society with technology."</i>
</div>
```
