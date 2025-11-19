'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SoriCharacter } from '@/app/components/SoriCharacter';

// V2 특성: 카드 슬라이드 - 각 섹션이 카드로 나타남 (좌우 이동)
export default function OnboardingV2Chapter1() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  
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

  const handleNext = () => {
    if (currentSection === 0 && (!guardianName || !guardianPhone)) {
      alert('보호자 정보를 입력해주세요');
      return;
    }
    if (currentSection === 1 && (!elderName || !elderPhone)) {
      alert('소중한 분 정보를 입력해주세요');
      return;
    }
    if (currentSection === 2 && callDays.length === 0) {
      alert('통화 요일을 선택해주세요');
      return;
    }
    
    if (currentSection < 2) {
      setCurrentSection(currentSection + 1);
    } else {
      router.push('/onboarding/complete');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-violet-200 shadow-sm mb-6">
            <span className="text-sm font-bold text-violet-700">V2 • 카드 슬라이드</span>
          </div>
          <div className="mb-4">
            <SoriCharacter size={80} animated />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">소리와 함께 시작하기</h1>
          <p className="text-sm text-slate-600">카드를 넘겨가며 입력하세요</p>
        </div>

        {/* 진행 표시 */}
        <div className="flex justify-center gap-3 mb-10">
          {sections.map((section, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSection(idx)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                idx === currentSection
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg scale-110'
                  : section.complete
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-white text-slate-400 border border-slate-200'
              }`}
            >
              {section.title}
              {section.complete && idx !== currentSection && (
                <span className="ml-2">✓</span>
              )}
            </button>
          ))}
        </div>

        {/* 카드 컨테이너 */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSection * 100}%)` }}
          >
            {/* 카드 1: 보호자 */}
            <div className="w-full flex-shrink-0 px-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-violet-200">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-slate-900 mb-2">보호자 정보</h2>
                  <p className="text-sm text-slate-600">먼저 보호자님을 알려주세요</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">성함</label>
                    <input
                      type="text"
                      value={guardianName}
                      onChange={(e) => setGuardianName(e.target.value)}
                      className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all text-base"
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">연락처</label>
                    <input
                      type="tel"
                      value={guardianPhone}
                      onChange={(e) => setGuardianPhone(formatPhone(e.target.value))}
                      className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all text-base"
                      placeholder="010-0000-0000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 카드 2: 소중한 분 */}
            <div className="w-full flex-shrink-0 px-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-pink-200">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-slate-900 mb-2">소중한 분</h2>
                  <p className="text-sm text-slate-600">안부를 전할 분을 알려주세요</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">성함</label>
                    <input
                      type="text"
                      value={elderName}
                      onChange={(e) => setElderName(e.target.value)}
                      className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all text-base"
                      placeholder="김순자"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">연락처</label>
                    <input
                      type="tel"
                      value={elderPhone}
                      onChange={(e) => setElderPhone(formatPhone(e.target.value))}
                      className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all text-base"
                      placeholder="010-0000-0000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 카드 3: 통화 설정 */}
            <div className="w-full flex-shrink-0 px-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-amber-200">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-slate-900 mb-2">통화 설정</h2>
                  <p className="text-sm text-slate-600">편한 시간을 알려주세요</p>
                </div>
                <div className="space-y-4">
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
                      className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all text-base font-bold text-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="flex gap-4 justify-center mt-8">
          {currentSection > 0 && (
            <button
              onClick={() => setCurrentSection(currentSection - 1)}
              className="px-8 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all"
            >
              ← 이전
            </button>
          )}
          <button
            onClick={handleNext}
            className="px-12 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:shadow-lg transition-all"
          >
            {currentSection === 2 ? '완료하기 →' : '다음 →'}
          </button>
        </div>
      </div>
    </div>
  );
}
