'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SoriCharacter } from '@/app/components/SoriCharacter';

// V3 특성: Fade 전환 - 단계별로 Fade in/out 애니메이션
export default function OnboardingV3Chapter1() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [elderName, setElderName] = useState('');
  const [elderPhone, setElderPhone] = useState('');
  const [callDays, setCallDays] = useState<string[]>([]);
  const [callTime, setCallTime] = useState('10:00');

  const days = ['월', '화', '수', '목', '금', '토', '일'];

  const formatPhone = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const toggleDay = (day: string) => {
    setCallDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleNext = () => {
    if (step === 1 && (!guardianName || !guardianPhone)) {
      alert('보호자 정보를 입력해주세요');
      return;
    }
    if (step === 2 && (!elderName || !elderPhone)) {
      alert('소중한 분 정보를 입력해주세요');
      return;
    }
    if (step === 3 && callDays.length === 0) {
      alert('통화 요일을 선택해주세요');
      return;
    }

    if (step < 3) {
      setIsTransitioning(true);
      setTimeout(() => {
        setStep(step + 1);
        setIsTransitioning(false);
      }, 300);
    } else {
      router.push('/onboarding/complete');
    }
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(step - 1);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* 진행 표시 */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-200 shadow-sm">
              <span className="text-sm font-bold text-indigo-700">V3 • Fade 전환</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`h-2 rounded-full transition-all duration-500 ${
                  num === step
                    ? 'w-16 bg-gradient-to-r from-indigo-600 to-purple-600'
                    : num < step
                    ? 'w-2 bg-green-500'
                    : 'w-2 bg-slate-300'
                }`}
              ></div>
            ))}
          </div>
          <p className="text-center text-sm font-bold text-slate-600">
            단계 {step} / 3
          </p>
        </div>

        {/* 메인 카드 - Fade 애니메이션 */}
        <div
          className={`bg-white rounded-2xl shadow-xl p-10 border border-slate-200 transition-all duration-300 ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {/* Step 1: 보호자 */}
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-block w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">보호자 정보</h2>
                <p className="text-sm text-slate-600">먼저 보호자님을 알려주세요</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">성함</label>
                  <input
                    type="text"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    className="w-full h-14 px-5 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-base font-medium"
                    placeholder="홍길동"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">연락처</label>
                  <input
                    type="tel"
                    value={guardianPhone}
                    onChange={(e) => setGuardianPhone(formatPhone(e.target.value))}
                    className="w-full h-14 px-5 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-base font-medium"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: 소중한 분 */}
          {step === 2 && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-block w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">소중한 분</h2>
                <p className="text-sm text-slate-600">안부를 전할 분을 알려주세요</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">성함</label>
                  <input
                    type="text"
                    value={elderName}
                    onChange={(e) => setElderName(e.target.value)}
                    className="w-full h-14 px-5 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all text-base font-medium"
                    placeholder="김순자"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">연락처</label>
                  <input
                    type="tel"
                    value={elderPhone}
                    onChange={(e) => setElderPhone(formatPhone(e.target.value))}
                    className="w-full h-14 px-5 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all text-base font-medium"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: 통화 설정 */}
          {step === 3 && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-block w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">통화 설정</h2>
                <p className="text-sm text-slate-600">편한 시간을 알려주세요</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">통화 요일</label>
                  <div className="grid grid-cols-7 gap-2">
                    {days.map((day) => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`aspect-square rounded-lg text-base font-bold transition-all ${
                          callDays.includes(day)
                            ? 'bg-gradient-to-br from-amber-600 to-orange-600 text-white'
                            : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">통화 시간</label>
                  <input
                    type="time"
                    value={callTime}
                    onChange={(e) => setCallTime(e.target.value)}
                    className="w-full h-14 px-5 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all text-xl font-black text-center"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 버튼 */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="h-12 px-8 rounded-lg border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all"
              >
                ← 이전
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 h-12 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg transition-all"
            >
              {step === 3 ? '완료하기 →' : '다음 →'}
            </button>
          </div>
        </div>

        {/* 소리 캐릭터 */}
        <div className="flex justify-center mt-8">
          <SoriCharacter size={60} animated />
        </div>
      </div>
    </div>
  );
}
