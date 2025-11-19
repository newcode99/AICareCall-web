'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SoriCharacter } from '@/app/components/SoriCharacter';

// V1 특성: 심플 단일 페이지 - 모든 정보를 한 화면에 (프로그레스 바 + 스크롤)
export default function OnboardingV1Chapter1() {
  const router = useRouter();
  
  // 프로필
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [elderName, setElderName] = useState('');
  const [elderPhone, setElderPhone] = useState('');
  
  // 건강
  const [conditions, setConditions] = useState<string[]>([]);
  const [medications, setMedications] = useState('');
  
  // 통화
  const [callDays, setCallDays] = useState<string[]>([]);
  const [callTime, setCallTime] = useState('10:00');

  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const conditionOptions = ['고혈압', '당뇨', '관절염', '치매', '심장 질환', '해당 없음'];

  const formatPhone = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const toggleCondition = (cond: string) => {
    setConditions(prev =>
      prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
    );
  };

  const toggleDay = (day: string) => {
    setCallDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleComplete = () => {
    if (!guardianName || !guardianPhone || !elderName || !elderPhone) {
      alert('필수 정보를 모두 입력해주세요');
      return;
    }
    if (callDays.length === 0) {
      alert('통화 요일을 선택해주세요');
      return;
    }
    router.push('/onboarding/complete');
  };

  const isComplete = guardianName && guardianPhone && elderName && elderPhone && callDays.length > 0;

  // 진행률 계산
  const progress = [
    guardianName && guardianPhone,
    elderName && elderPhone,
    conditions.length > 0,
    callDays.length > 0
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* 상단 고정 프로그레스 바 */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <SoriCharacter size={32} animated />
              <span className="text-sm font-bold text-slate-700">V1 • 심플 폼</span>
            </div>
            <span className="text-xs font-bold text-violet-700 bg-violet-100 px-3 py-1 rounded-full">
              {progress} / 4 완료
            </span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex-1">
                <div className={`h-1.5 rounded-full transition-all duration-500 ${
                  num <= progress ? 'bg-gradient-to-r from-violet-600 to-purple-600' : 'bg-slate-200'
                }`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 스크롤 가능한 폼 */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          {/* 헤더 */}
          <div className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 mb-2">빠르게 시작하기</h1>
            <p className="text-sm text-slate-600">필요한 정보를 한 번에 입력하세요</p>
          </div>

          <div className="space-y-10">
            {/* 섹션 1: 프로필 */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                  <span className="text-sm font-black text-violet-700">1</span>
                </div>
                <h2 className="text-xl font-black text-slate-900">프로필 정보</h2>
              </div>
              
              <div className="space-y-4 pl-11">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2">보호자 성함</label>
                    <input
                      type="text"
                      value={guardianName}
                      onChange={(e) => setGuardianName(e.target.value)}
                      className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all text-sm"
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2">보호자 연락처</label>
                    <input
                      type="tel"
                      value={guardianPhone}
                      onChange={(e) => setGuardianPhone(formatPhone(e.target.value))}
                      className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all text-sm"
                      placeholder="010-0000-0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2">소중한 분 성함</label>
                    <input
                      type="text"
                      value={elderName}
                      onChange={(e) => setElderName(e.target.value)}
                      className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all text-sm"
                      placeholder="김순자"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2">소중한 분 연락처</label>
                    <input
                      type="tel"
                      value={elderPhone}
                      onChange={(e) => setElderPhone(formatPhone(e.target.value))}
                      className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all text-sm"
                      placeholder="010-0000-0000"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 섹션 2: 건강 정보 (선택) */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <span className="text-sm font-black text-emerald-700">2</span>
                </div>
                <h2 className="text-xl font-black text-slate-900">건강 정보</h2>
                <span className="text-xs text-slate-500">(선택)</span>
              </div>

              <div className="space-y-4 pl-11">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2">주요 질환</label>
                  <div className="grid grid-cols-3 gap-2">
                    {conditionOptions.map((cond) => (
                      <button
                        key={cond}
                        onClick={() => toggleCondition(cond)}
                        className={`h-10 rounded-lg text-xs font-bold transition-all ${
                          conditions.includes(cond)
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2">복용 약물</label>
                  <textarea
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                    className="w-full h-20 px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all resize-none text-sm"
                    placeholder="예: 혈압약 (아침), 혈당강하제"
                  />
                </div>
              </div>
            </section>

            {/* 섹션 3: 통화 설정 */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <span className="text-sm font-black text-amber-700">3</span>
                </div>
                <h2 className="text-xl font-black text-slate-900">통화 설정</h2>
              </div>

              <div className="space-y-4 pl-11">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2">통화 요일</label>
                  <div className="grid grid-cols-7 gap-2">
                    {days.map((day) => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`aspect-square rounded-lg text-sm font-bold transition-all ${
                          callDays.includes(day)
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2">통화 시간</label>
                  <input
                    type="time"
                    value={callTime}
                    onChange={(e) => setCallTime(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all text-sm font-bold text-center"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* 완료 버튼 */}
          <div className="mt-10 pt-8 border-t border-slate-200">
            <button
              onClick={handleComplete}
              disabled={!isComplete}
              className={`w-full h-12 rounded-xl font-bold text-sm transition-all ${
                isComplete
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isComplete ? '소리와 함께 시작하기 →' : '필수 정보를 입력해주세요'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
