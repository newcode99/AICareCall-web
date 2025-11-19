'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SoriCharacter } from '@/app/components/SoriCharacter';

// V4 특성: 아코디언 형식 - 섹션별로 접고 펼치기
export default function OnboardingV4Chapter1() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<number>(0);
  
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

  const sections = [
    { title: '보호자 정보', complete: guardianName && guardianPhone },
    { title: '소중한 분', complete: elderName && elderPhone },
    { title: '통화 설정', complete: callDays.length > 0 }
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <span className="text-sm font-bold text-slate-700">V4 • 아코디언</span>
          </div>
          <div className="mb-4">
            <SoriCharacter size={80} animated />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">소리와 함께 시작하기</h1>
          <p className="text-sm text-slate-600">섹션을 펼쳐서 입력하세요</p>
        </div>

        {/* 아코디언 섹션 */}
        <div className="space-y-4">
          {/* 섹션 1: 보호자 */}
          <div className={`bg-white rounded-xl border-2 overflow-hidden transition-all ${
            expandedSection === 0 ? 'border-violet-500' : 'border-slate-200'
          }`}>
            <button
              onClick={() => setExpandedSection(expandedSection === 0 ? -1 : 0)}
              className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                  <span className="text-sm font-black text-violet-700">1</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">보호자 정보</h3>
              </div>
              <div className="flex items-center gap-3">
                {sections[0].complete && (
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                )}
                <svg className={`w-5 h-5 text-slate-400 transition-transform ${expandedSection === 0 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </button>
            {expandedSection === 0 && (
              <div className="p-5 border-t border-slate-200 space-y-4 animate-slideInDown">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">성함</label>
                  <input
                    type="text"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all text-sm"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">연락처</label>
                  <input
                    type="tel"
                    value={guardianPhone}
                    onChange={(e) => setGuardianPhone(formatPhone(e.target.value))}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all text-sm"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 섹션 2: 소중한 분 */}
          <div className={`bg-white rounded-xl border-2 overflow-hidden transition-all ${
            expandedSection === 1 ? 'border-pink-500' : 'border-slate-200'
          }`}>
            <button
              onClick={() => setExpandedSection(expandedSection === 1 ? -1 : 1)}
              className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                  <span className="text-sm font-black text-pink-700">2</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">소중한 분</h3>
              </div>
              <div className="flex items-center gap-3">
                {sections[1].complete && (
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                )}
                <svg className={`w-5 h-5 text-slate-400 transition-transform ${expandedSection === 1 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </button>
            {expandedSection === 1 && (
              <div className="p-5 border-t border-slate-200 space-y-4 animate-slideInDown">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">성함</label>
                  <input
                    type="text"
                    value={elderName}
                    onChange={(e) => setElderName(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all text-sm"
                    placeholder="김순자"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">연락처</label>
                  <input
                    type="tel"
                    value={elderPhone}
                    onChange={(e) => setElderPhone(formatPhone(e.target.value))}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all text-sm"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 섹션 3: 통화 설정 */}
          <div className={`bg-white rounded-xl border-2 overflow-hidden transition-all ${
            expandedSection === 2 ? 'border-amber-500' : 'border-slate-200'
          }`}>
            <button
              onClick={() => setExpandedSection(expandedSection === 2 ? -1 : 2)}
              className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <span className="text-sm font-black text-amber-700">3</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">통화 설정</h3>
              </div>
              <div className="flex items-center gap-3">
                {sections[2].complete && (
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                )}
                <svg className={`w-5 h-5 text-slate-400 transition-transform ${expandedSection === 2 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </button>
            {expandedSection === 2 && (
              <div className="p-5 border-t border-slate-200 space-y-4 animate-slideInDown">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">통화 요일</label>
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
                  <label className="block text-sm font-bold text-slate-700 mb-2">통화 시간</label>
                  <input
                    type="time"
                    value={callTime}
                    onChange={(e) => setCallTime(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all text-sm font-bold text-center"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 완료 버튼 */}
        <div className="mt-8">
          <button
            onClick={handleComplete}
            disabled={!isComplete}
            className={`w-full h-12 rounded-xl font-bold text-sm transition-all ${
              isComplete
                ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isComplete ? '소리와 함께 시작하기 →' : '모든 정보를 입력해주세요'}
          </button>
        </div>
      </div>
    </div>
  );
}
