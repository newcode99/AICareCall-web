# 🎨 Sori AI - 토스 스타일 완전 적용

> **"노션 같고 올드한 느낌"을 벗어나 토스처럼 생동감 있고 슬릭한 UI로!**

---

## 🎯 토스 인터랙션 철학

토스 인터랙션 아티클([링크](https://toss.tech/article/interaction))에서 배운 핵심 원칙:

### **1. 인터랙션의 진짜 목적**
- ❌ 단순히 "예쁘게" 만드는 것이 아님
- ✅ **명확한 피드백** - 사용자에게 즉각적인 반응 제공
- ✅ **직관적인 행동 유도** - 다음에 무엇을 해야 할지 자연스럽게 안내
- ✅ **신뢰감 전달** - 실시간 정보로 안심시키기

### **2. 토스가 성공한 이유**
- **지표 개선**: 이탈률↓, 전환율↑, 도달률↑
- **시스템화**: Rally 같은 인터랙션 시스템으로 개발 공수 획기적 절감
- **Easing 토큰**: `spring.quick`, `bezier.expo` 같은 공통 언어로 소통

---

## 🚀 완성된 토스 스타일 시스템

### **📦 컴포넌트 라이브러리**

```
/app/components/
├── TossButton.tsx          # 토스 스타일 버튼 (터치 피드백)
├── TossInput.tsx           # 토스 스타일 입력 필드 (포커스 애니메이션)
├── TossSelectButton.tsx    # 선택 버튼 (체크 아이콘 Pop)
└── TossPageTransition.tsx  # 페이지 전환 (슬라이드 애니메이션)
```

### **🎨 Easing 토큰 시스템**

```css
/* Spring - 자연스러운 튕김 */
.ease-spring-quick   /* 버튼 클릭, 즉각 반응 */
.ease-spring-basic   /* 일반 UI 전환 */
.ease-spring-gentle  /* 큰 요소 이동 */

/* Bezier - 정교한 곡선 */
.ease-bezier-expo    /* 페이지 전환 */
.ease-bezier-smooth  /* 일반 전환 */
.ease-bezier-quick   /* 빠른 전환 */
```

### **✨ 애니메이션 클래스**

```css
.touch-feedback      /* 터치 시 scale(0.96) */
.slide-in-right      /* 오른쪽에서 슬라이드 */
.slide-in-left       /* 왼쪽에서 슬라이드 */
.scale-entrance      /* 스케일 입장 */
.success-pop         /* 완료 축하 */
.progress-fill       /* 프로그레스 바 채우기 */
.shimmer             /* 로딩 효과 */
```

---

## 🎬 사용 예시

### **1. 버튼 - 즉각적인 터치 피드백**

```tsx
import { TossButton } from '@/app/components/TossButton';

// 이전 (정적, 노션 같음)
<button className="bg-blue-500 px-4 py-2">클릭</button>

// 토스 스타일 (생동감)
<TossButton variant="primary" size="lg">
  완료! 🎉
</TossButton>
```

**효과:**
- ✅ 클릭 시 `scale(0.97)` 애니메이션
- ✅ Spring easing으로 자연스러운 튕김
- ✅ 호버 시 그라데이션 오버레이

---

### **2. 입력 필드 - 실시간 피드백**

```tsx
import { TossInput } from '@/app/components/TossInput';

// 이전 (정적, 피드백 없음)
<input className="border p-2" />

// 토스 스타일 (실시간 반응)
<TossInput
  value={name}
  onChange={setName}
  label="성함"
  autoFocus
/>
```

**효과:**
- ✅ 포커스 시 `scale-[1.01]` 확대
- ✅ 실시간 글로우 효과
- ✅ 에러 메시지 애니메이션

---

### **3. 선택 버튼 - 명확한 선택 피드백**

```tsx
import { TossSelectButton } from '@/app/components/TossSelectButton';

// 이전 (단순 색상 변경)
<button className={selected ? 'bg-blue-500' : 'bg-white'}>
  남성
</button>

// 토스 스타일 (생동감 있는 피드백)
<TossSelectButton
  selected={gender === '남성'}
  onClick={() => setGender('남성')}
  variant="blue"
>
  남성
</TossSelectButton>
```

**효과:**
- ✅ 선택 시 체크 아이콘 Pop 애니메이션
- ✅ 호버 시 그라데이션 배경
- ✅ `scale-105` 확대 효과

---

### **4. 페이지 전환 - 부드러운 연결감**

```tsx
import { TossStepTransition } from '@/app/components/TossPageTransition';

// 이전 (뚝뚝 끊김)
{step === 1 && <Step1 />}
{step === 2 && <Step2 />}

// 토스 스타일 (슬라이드 애니메이션)
<TossStepTransition direction="forward">
  {getCurrentStep()}
</TossStepTransition>
```

**효과:**
- ✅ 슬라이드 인/아웃 효과
- ✅ Bezier expo easing
- ✅ 자연스러운 페이지 연결

---

## 📊 Before & After 비교

### **Before (노션 같은 올드한 느낌)**
- ❌ 정적인 UI, 피드백 없음
- ❌ 버튼 클릭 시 반응 없음
- ❌ 페이지 전환 시 뚝뚝 끊김
- ❌ 입력 필드 상호작용 없음
- ❌ 일관성 없는 애니메이션

### **After (토스 스타일 슬릭함)**
- ✅ 모든 요소에 즉각적인 피드백
- ✅ 터치 시 자연스러운 스케일 효과
- ✅ 부드러운 페이지 전환
- ✅ 포커스 시 실시간 글로우
- ✅ 시스템화된 easing 토큰

---

## 🎯 적용 방법

### **Step 1: 컴포넌트 import**

```tsx
import { TossButton } from '@/app/components/TossButton';
import { TossInput } from '@/app/components/TossInput';
import { TossSelectButton } from '@/app/components/TossSelectButton';
import { TossStepTransition } from '@/app/components/TossPageTransition';
```

### **Step 2: 기존 컴포넌트 교체**

```tsx
// button → TossButton
// input → TossInput
// 선택 버튼 → TossSelectButton
```

### **Step 3: 페이지 전환 추가**

```tsx
// 온보딩 스텝에 TossStepTransition 래핑
<TossStepTransition direction={direction}>
  {content}
</TossStepTransition>
```

---

## 📖 상세 문서

### **📘 `TOSS_INTERACTION_SYSTEM.md`**
- Easing 토큰 시스템
- 컴포넌트 API 문서
- 애니메이션 클래스
- Duration 가이드

### **📗 `TOSS_MIGRATION_GUIDE.md`**
- Before/After 실전 예시
- 우선순위 적용 가이드
- 흔한 실수 방지
- 체크리스트

---

## 🎨 토스 디자인 원칙

### **1. 즉각적인 피드백**
모든 터치 가능한 요소는 즉시 반응해야 함

```tsx
<button className="touch-feedback">
  // 터치 시 scale(0.96)
</button>
```

### **2. 자연스러운 애니메이션**
Spring easing으로 물리적 법칙 따르기

```css
transition-all duration-200 ease-spring-basic
```

### **3. 명확한 상태 변화**
사용자가 현재 상태를 명확히 인지

```tsx
// 선택 시 체크 아이콘 + 그라데이션
<TossSelectButton selected={true}>
```

### **4. 부드러운 전환**
페이지 간 끊김 없는 연결

```tsx
<TossStepTransition direction="forward">
```

---

## 💡 핵심 차이점

| 항목 | 기존 (노션 스타일) | 토스 스타일 |
|------|-------------------|------------|
| **버튼** | 정적, 피드백 없음 | 터치 피드백, Spring easing |
| **입력** | 단순 border 변경 | 포커스 스케일, 글로우 효과 |
| **선택** | 색상만 변경 | 체크 아이콘 Pop, 그라데이션 |
| **전환** | 뚝뚝 끊김 | 슬라이드, Bezier expo |
| **프로그레스** | 단순 바 | Fill 애니메이션, 글로우 |

---

## 🚀 성능 최적화

### **1. GPU 가속**
```tsx
// Transform 사용 (O)
<div className="translate-x-4 scale-105">

// Left/Top 사용 (X)
<div style={{ left: '16px' }}>
```

### **2. will-change**
```tsx
<div className="will-change-transform">
```

### **3. 터치 하이라이트 제거**
```css
/* globals.css에 자동 적용됨 */
* {
  -webkit-tap-highlight-color: transparent;
}
```

---

## 🎉 결과

### **사용자 경험**
- ✅ **"와, 진짜 슬릭하다"** 느낌
- ✅ 앱처럼 자연스러운 반응
- ✅ 신뢰감 있는 인터랙션
- ✅ 직관적인 피드백

### **개발 효율**
- ✅ 재사용 가능한 컴포넌트
- ✅ 공통 언어로 소통
- ✅ 일관된 디자인 시스템
- ✅ 유지보수 용이

---

## 📚 참고 자료

- 📖 [토스 인터랙션 아티클](https://toss.tech/article/interaction)
- 📖 [토스 디자인 시스템](https://toss.oopy.io/75f32c87-0eee-434b-8768-215efe9c976b)
- 📖 [Cubic Bezier Generator](https://cubic-bezier.com/)

---

## 🎯 다음 단계

1. ✅ **기본 컴포넌트 적용** - TossButton, TossInput
2. ✅ **페이지 전환 추가** - TossStepTransition
3. ✅ **프로그레스 바 강화** - Fill 애니메이션
4. ⏳ **완료 축하 애니메이션** - Success celebration
5. ⏳ **로딩 shimmer** - 대기 시간 최소화

---

**🎉 이제 Sori AI도 토스처럼 생동감 넘치는 서비스가 되었습니다!**

---

## 💬 팀 소통 예시

```
// 디자이너 → 개발자
"여기는 spring.quick으로 해주세요"
"버튼에 touch-feedback 적용 부탁합니다"

// 개발자 → 디자이너
"TossButton 컴포넌트로 구현했습니다"
"duration-200 ease-spring-basic 적용했어요"
```

**토스의 Rally 시스템처럼, 우리도 공통 언어로 효율적으로 소통합시다!** 🚀

