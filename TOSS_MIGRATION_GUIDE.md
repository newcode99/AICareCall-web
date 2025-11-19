# 🔄 토스 스타일 마이그레이션 가이드

> 기존 컴포넌트를 토스 스타일로 변환하는 실전 가이드

---

## 📝 Before & After 예시

### **1. 버튼 변환**

#### Before (기존)
```tsx
<button
  onClick={handleNext}
  className="flex h-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-10 text-base font-bold text-white shadow-lg hover:scale-[1.02]"
>
  다음으로
</button>
```

#### After (토스 스타일)
```tsx
import { TossButton } from '@/app/components/TossButton';

<TossButton 
  variant="primary" 
  size="lg"
  onClick={handleNext}
>
  다음으로
</TossButton>
```

**개선 사항:**
- ✅ 터치 피드백 자동 적용
- ✅ Spring easing으로 자연스러운 애니메이션
- ✅ Active 상태 스케일 효과
- ✅ 일관된 스타일

---

### **2. 입력 필드 변환**

#### Before (기존)
```tsx
<input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="예) 김보호"
  className="h-16 w-full rounded-2xl border-2 border-slate-200 px-5 text-lg"
/>
{error && <p className="text-red-500">{error}</p>}
```

#### After (토스 스타일)
```tsx
import { TossInput } from '@/app/components/TossInput';

<TossInput
  type="text"
  value={name}
  onChange={setName}
  placeholder="예) 김보호"
  label="성함"
  error={error}
  autoFocus
/>
```

**개선 사항:**
- ✅ 포커스 시 스케일 확대
- ✅ 실시간 글로우 효과
- ✅ 에러 애니메이션
- ✅ Spring basic easing

---

### **3. 선택 버튼 변환**

#### Before (기존)
```tsx
{['남성', '여성', '무관'].map((gender) => (
  <button
    key={gender}
    onClick={() => setGender(gender)}
    className={`h-14 rounded-2xl ${
      selectedGender === gender
        ? 'bg-blue-500 text-white'
        : 'border-2 border-slate-200 bg-white'
    }`}
  >
    {gender}
  </button>
))}
```

#### After (토스 스타일)
```tsx
import { TossSelectButton } from '@/app/components/TossSelectButton';

{['남성', '여성', '무관'].map((gender) => (
  <TossSelectButton
    key={gender}
    selected={selectedGender === gender}
    onClick={() => setGender(gender)}
    variant="blue"
  >
    {gender}
  </TossSelectButton>
))}
```

**개선 사항:**
- ✅ 체크 아이콘 Pop 애니메이션
- ✅ 호버 시 그라데이션
- ✅ 터치 피드백
- ✅ 스케일 효과

---

### **4. 페이지 전환 추가**

#### Before (기존)
```tsx
// 온보딩 스텝 변경
const handleNext = () => {
  setCurrentStep(prev => prev + 1);
};

// 렌더링
return <div>{getCurrentStepContent()}</div>;
```

#### After (토스 스타일)
```tsx
import { TossStepTransition } from '@/app/components/TossPageTransition';

// 온보딩 스텝 변경 + 방향 추적
const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

const handleNext = () => {
  setDirection('forward');
  setCurrentStep(prev => prev + 1);
};

const handlePrev = () => {
  setDirection('backward');
  setCurrentStep(prev => prev - 1);
};

// 렌더링
return (
  <TossStepTransition direction={direction}>
    {getCurrentStepContent()}
  </TossStepTransition>
);
```

**개선 사항:**
- ✅ 슬라이드 인/아웃
- ✅ 방향 인지 가능
- ✅ Bezier expo easing
- ✅ 부드러운 연결감

---

### **5. 프로그레스 바 강화**

#### Before (기존)
```tsx
<div className="h-2 w-full bg-slate-200 rounded-full">
  <div 
    className="h-full bg-blue-500 rounded-full"
    style={{ width: `${progress}%` }}
  />
</div>
```

#### After (토스 스타일)
```tsx
<div className="relative h-3 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
  {/* 메인 바 */}
  <div
    className="absolute inset-0 h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 shadow-lg transition-all duration-700 ease-spring-basic progress-fill"
    style={{ width: `${progress}%` }}
  />
  {/* 글로우 효과 */}
  <div
    className="absolute inset-0 h-full bg-gradient-to-r from-blue-400/50 to-purple-400/50 blur-sm"
    style={{ width: `${progress}%` }}
  />
</div>

{/* 텍스트 정보 */}
<div className="flex items-center justify-between mt-2">
  <p className="text-sm font-bold text-slate-700">
    {getCurrentStepName()}
  </p>
  <p className="text-sm font-extrabold text-blue-600">
    {Math.round(progress)}% 완료
  </p>
</div>
```

**개선 사항:**
- ✅ Progress-fill 애니메이션
- ✅ 그라데이션 + 글로우
- ✅ Spring easing
- ✅ 정보 텍스트 추가

---

## 🎯 우선순위 적용 가이드

### **Phase 1: 기본 터치 피드백 (1일)**
모든 버튼에 `touch-feedback` 클래스 추가

```tsx
// 모든 버튼에 추가
<button className="touch-feedback ...">
```

### **Phase 2: 컴포넌트 교체 (2-3일)**
TossButton, TossInput, TossSelectButton으로 교체

```tsx
// 기존 버튼 → TossButton
// 기존 input → TossInput
// 기존 선택 버튼 → TossSelectButton
```

### **Phase 3: 페이지 전환 (1-2일)**
TossPageTransition, TossStepTransition 적용

```tsx
// 온보딩 스텝 전환
<TossStepTransition direction={direction}>
  {content}
</TossStepTransition>
```

### **Phase 4: 디테일 폴리싱 (2-3일)**
프로그레스 바, 로딩, 완료 애니메이션 강화

---

## 🔧 실전 팁

### **1. Easing 선택 가이드**

```typescript
// 즉각적인 반응이 필요한 경우
duration-150 ease-spring-quick
예) 버튼 클릭, 터치 피드백

// 일반적인 UI 전환
duration-200 ease-spring-basic
예) hover, focus, 선택 상태 변경

// 페이지 전환
duration-400 ease-bezier-expo
예) 온보딩 스텝 변경, 페이지 이동

// 큰 요소 이동
duration-300 ease-spring-gentle
예) 모달, 드로어, 큰 카드
```

### **2. 스케일 가이드**

```typescript
// 버튼 hover
scale-[1.02]  // 2% 확대

// 버튼 active
scale-[0.97]  // 3% 축소

// 입력 필드 focus
scale-[1.01]  // 1% 확대

// 선택 상태
scale-105     // 5% 확대
```

### **3. Shadow 가이드**

```typescript
// 기본
shadow-xl shadow-slate-200/50

// Primary 버튼
shadow-2xl shadow-blue-500/50

// Hover 강화
hover:shadow-3xl hover:shadow-purple-500/60

// 선택 상태
shadow-2xl shadow-blue-500/40
```

---

## 🚨 흔한 실수

### **❌ 실수 1: Easing 없이 transition만**
```tsx
// 나쁜 예
<button className="transition-all duration-200">

// 좋은 예
<button className="transition-all duration-200 ease-spring-quick">
```

### **❌ 실수 2: 터치 피드백 누락**
```tsx
// 나쁜 예
<button onClick={handleClick}>

// 좋은 예
<button className="touch-feedback" onClick={handleClick}>
// 또는
<TossButton onClick={handleClick}>
```

### **❌ 실수 3: 페이지 전환 애니메이션 없음**
```tsx
// 나쁜 예
{step === 1 && <Step1 />}
{step === 2 && <Step2 />}

// 좋은 예
<TossStepTransition direction={direction}>
  {getCurrentStep()}
</TossStepTransition>
```

### **❌ 실수 4: 입력 필드에 피드백 없음**
```tsx
// 나쁜 예
<input className="border-2" />

// 좋은 예
<TossInput 
  // 자동으로 focus scale, glow 효과 적용
/>
```

---

## 📊 체크리스트

### **컴포넌트별 적용 확인**

- [ ] 모든 버튼에 터치 피드백
- [ ] Primary 버튼 → TossButton
- [ ] 입력 필드 → TossInput
- [ ] 선택 버튼 → TossSelectButton
- [ ] 페이지 전환 애니메이션
- [ ] 프로그레스 바 강화
- [ ] 에러 메시지 애니메이션
- [ ] 완료 축하 애니메이션

### **Easing 적용 확인**

- [ ] 모든 transition에 easing 지정
- [ ] 버튼: spring-quick
- [ ] 일반 UI: spring-basic
- [ ] 페이지 전환: bezier-expo

### **성능 확인**

- [ ] Transform 사용 (left/top X)
- [ ] will-change 적용
- [ ] GPU 가속 활용

---

## 🎬 실제 코드 예시

### **온보딩 페이지 완전 변환**

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TossButton } from '@/app/components/TossButton';
import { TossInput } from '@/app/components/TossInput';
import { TossSelectButton } from '@/app/components/TossSelectButton';
import { TossStepTransition } from '@/app/components/TossPageTransition';

export default function OnboardingV1() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: '',
  });

  const handleNext = () => {
    setDirection('forward');
    setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep === 0) {
      router.back();
    } else {
      setDirection('backward');
      setCurrentStep(prev => prev - 1);
    }
  };

  const progress = ((currentStep + 1) / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 프로그레스 바 */}
      <div className="relative h-3 w-full bg-slate-200">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        <TossStepTransition direction={direction}>
          <div className="flex flex-col gap-8">
            {/* 질문 */}
            <h1 className="text-[clamp(2rem,5.5vw,3.5rem)] font-black leading-[1.15] tracking-tight">
              {steps[currentStep].question}
            </h1>

            {/* 입력 */}
            {steps[currentStep].type === 'text' && (
              <TossInput
                type="text"
                value={formData.name}
                onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                placeholder={steps[currentStep].placeholder}
                autoFocus
              />
            )}

            {steps[currentStep].type === 'select' && (
              <div className="grid grid-cols-3 gap-4">
                {steps[currentStep].options?.map((option) => (
                  <TossSelectButton
                    key={option}
                    selected={formData.gender === option}
                    onClick={() => setFormData(prev => ({ ...prev, gender: option }))}
                    variant="blue"
                  >
                    {option}
                  </TossSelectButton>
                ))}
              </div>
            )}

            {/* 버튼 */}
            <div className="flex items-center gap-4">
              <TossButton
                variant="secondary"
                size="md"
                onClick={handlePrev}
              >
                {currentStep === 0 ? '잠깐만요' : '이전'}
              </TossButton>

              <TossButton
                variant="primary"
                size="lg"
                onClick={handleNext}
                className="flex-1"
              >
                {currentStep === 2 ? '완료!' : '다음으로'}
              </TossButton>
            </div>
          </div>
        </TossStepTransition>
      </div>
    </div>
  );
}
```

---

**🎉 이제 토스처럼 슬릭한 Sori AI가 완성됩니다!**

