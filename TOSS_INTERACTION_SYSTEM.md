# 🎨 Sori AI - 토스 스타일 인터랙션 시스템

> 토스의 인터랙션 철학을 Sori AI에 적용한 디자인 시스템입니다.

## 📖 목차

1. [Easing 토큰 시스템](#easing-토큰-시스템)
2. [컴포넌트 라이브러리](#컴포넌트-라이브러리)
3. [사용 가이드](#사용-가이드)
4. [인터랙션 원칙](#인터랙션-원칙)

---

## 🎯 인터랙션 원칙

### **토스 철학 기반**
1. ✅ **명확한 피드백** - 모든 인터랙션은 사용자에게 즉각적인 피드백 제공
2. ✅ **직관적인 행동 유도** - 인터랙션으로 다음 행동을 자연스럽게 유도
3. ✅ **신뢰감 전달** - 실시간 정보와 부드러운 애니메이션으로 신뢰 구축
4. ✅ **심미적 가치 < 기능적 가치** - 예쁨보다 명확함이 우선

---

## 🌊 Easing 토큰 시스템

### **Spring Easing** - 자연스러운 튕김

```css
/* 빠른 반응 - 버튼 클릭, 즉각적인 피드백 */
.ease-spring-quick
cubic-bezier(0.2, 0.8, 0.2, 1)

/* 기본 - 대부분의 UI 전환 */
.ease-spring-basic
cubic-bezier(0.34, 1.56, 0.64, 1)

/* 부드러운 - 큰 요소 이동 */
.ease-spring-gentle
cubic-bezier(0.25, 1.2, 0.5, 1)
```

### **Bezier Easing** - 정교한 곡선

```css
/* Expo - 페이지 전환 */
.ease-bezier-expo
cubic-bezier(0.16, 1, 0.3, 1)

/* Smooth - 일반 전환 */
.ease-bezier-smooth
cubic-bezier(0.4, 0, 0.2, 1)

/* Quick - 빠른 전환 */
.ease-bezier-quick
cubic-bezier(0.4, 0, 1, 1)
```

### **사용 예시**

```tsx
// Spring - 버튼 hover
<button className="transition-all duration-200 ease-spring-quick">
  클릭하세요
</button>

// Bezier - 페이지 전환
<div className="transition-all duration-400 ease-bezier-expo">
  콘텐츠
</div>
```

---

## 🧩 컴포넌트 라이브러리

### **1. TossButton** - 토스 스타일 버튼

```tsx
import { TossButton } from '@/app/components/TossButton';

<TossButton 
  variant="primary"  // primary | secondary | ghost
  size="lg"          // sm | md | lg
  onClick={handleClick}
>
  완료!
</TossButton>
```

**특징:**
- ✅ 터치 피드백 (`touch-feedback`)
- ✅ Spring easing 애니메이션
- ✅ Active 상태 스케일 효과
- ✅ 호버 시 그라데이션 오버레이

---

### **2. TossInput** - 토스 스타일 입력 필드

```tsx
import { TossInput } from '@/app/components/TossInput';

<TossInput
  type="text"
  value={name}
  onChange={setName}
  label="성함"
  placeholder="예) 김보호"
  error={errors.name}
  helperText="소리가 부를 이름이에요"
  autoFocus
/>
```

**특징:**
- ✅ 포커스 시 스케일 확대 (`scale-[1.01]`)
- ✅ 실시간 글로우 효과
- ✅ 에러 상태 애니메이션
- ✅ Spring basic easing

---

### **3. TossSelectButton** - 선택 버튼

```tsx
import { TossSelectButton } from '@/app/components/TossSelectButton';

<TossSelectButton
  selected={gender === '남성'}
  onClick={() => setGender('남성')}
  variant="blue"  // blue | purple
>
  남성
</TossSelectButton>
```

**특징:**
- ✅ 선택 시 체크 아이콘 Pop 애니메이션 (`success-pop`)
- ✅ 호버 시 그라데이션 배경
- ✅ 스케일 피드백
- ✅ 터치 최적화

---

### **4. TossPageTransition** - 페이지 전환

```tsx
import { TossPageTransition, TossStepTransition } from '@/app/components/TossPageTransition';

// 페이지 전환
<TossPageTransition>
  {children}
</TossPageTransition>

// 스텝 전환 (온보딩)
<TossStepTransition direction="forward">
  {stepContent}
</TossStepTransition>
```

**특징:**
- ✅ 슬라이드 인/아웃 효과
- ✅ Bezier expo easing
- ✅ 방향 지정 가능
- ✅ 자동 전환 관리

---

## 📐 애니메이션 클래스

### **입장 애니메이션**

```tsx
// 오른쪽에서 슬라이드
<div className="slide-in-right">콘텐츠</div>

// 왼쪽에서 슬라이드
<div className="slide-in-left">콘텐츠</div>

// 스케일 입장
<div className="scale-entrance">콘텐츠</div>

// 성공 팝
<div className="success-pop">완료!</div>
```

### **프로그레스 바**

```tsx
<div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
  <div 
    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 progress-fill"
    style={{ width: `${progress}%` }}
  />
</div>
```

### **로딩 Shimmer**

```tsx
<div className="h-20 bg-slate-200 rounded-2xl shimmer" />
```

---

## 🎨 색상 시스템

### **그라데이션 토큰**

```css
/* Primary - 메인 버튼 */
from-blue-600 via-cyan-600 to-purple-600

/* Blue - 보호자 관련 */
from-blue-500 to-cyan-500

/* Purple - 소중한 분 관련 */
from-purple-500 to-pink-500

/* Success - 완료 상태 */
from-green-500 to-emerald-500
```

---

## 💡 사용 가이드

### **1. 버튼 인터랙션**

```tsx
// ❌ 나쁜 예 - 정적인 버튼
<button className="bg-blue-500 text-white px-4 py-2">
  클릭
</button>

// ✅ 좋은 예 - 토스 스타일
<TossButton variant="primary" size="lg">
  클릭
</TossButton>
```

### **2. 입력 필드**

```tsx
// ❌ 나쁜 예 - 피드백 없음
<input 
  className="border p-2"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// ✅ 좋은 예 - 실시간 피드백
<TossInput
  value={value}
  onChange={setValue}
  label="성함"
  autoFocus
/>
```

### **3. 페이지 전환**

```tsx
// ❌ 나쁜 예 - 뚝뚝 끊김
{step === 1 && <Step1 />}
{step === 2 && <Step2 />}

// ✅ 좋은 예 - 부드러운 전환
<TossStepTransition direction={direction}>
  {getCurrentStep()}
</TossStepTransition>
```

---

## 🎭 Duration 가이드

```typescript
// 즉각적인 피드백 (버튼 클릭, 터치)
duration-150  // 150ms

// 일반 전환 (hover, focus)
duration-200  // 200ms

// 페이지 전환
duration-400  // 400ms

// 복잡한 애니메이션
duration-500  // 500ms
```

---

## 📱 터치 최적화

### **모든 인터랙티브 요소에 적용**

```tsx
<button className="touch-feedback">
  // 터치 시 scale(0.96) 애니메이션
</button>
```

### **터치 하이라이트 제거**

```css
/* globals.css에 이미 적용됨 */
* {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}
```

---

## 🚀 성능 최적화

### **1. will-change 사용**

```tsx
<div className="will-change-transform">
  애니메이션 요소
</div>
```

### **2. GPU 가속**

```tsx
// Transform 사용 (O)
<div className="translate-x-4 scale-105">

// Left/Top 사용 (X)
<div style={{ left: '16px' }}>
```

---

## 📊 지표 개선 사례

### **토스 사례 참고**

1. **대출 심사 로딩** - 이탈률↓, 도달률↑
2. **카드 추천** - 전환율↑
3. **신용점수** - 사용성↑

### **Sori AI 목표**

- 온보딩 완료율 ↑
- 폼 이탈률 ↓
- 사용자 만족도 ↑

---

## 🔗 참고 자료

- [토스 인터랙션 아티클](https://toss.tech/article/interaction)
- [토스 디자인 시스템](https://toss.oopy.io/75f32c87-0eee-434b-8768-215efe9c976b)
- [Bezier Curve Generator](https://cubic-bezier.com/)

---

## 💬 팀 소통

### **공통 언어 사용**

```
// 디자이너 → 개발자
"여기는 spring.quick으로 해주세요"
"페이지 전환은 bezier.expo로 부탁드려요"
"버튼에 touch-feedback 적용 부탁합니다"

// 개발자 → 디자이너
"TossButton 컴포넌트 사용했습니다"
"duration-200 ease-spring-basic 적용했어요"
```

---

**🎉 토스처럼 슬릭한 Sori AI를 만들어봅시다!**

