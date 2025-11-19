'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SoriCharacter } from '@/app/components/SoriCharacter';

export default function OnboardingV1Ch3() {
  const router = useRouter();
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [callTime, setCallTime] = useState('10:00');
  const [tone, setTone] = useState('warm');
  
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const tones = [
    { id: 'warm', label: '따뜻하게' },
    { id: 'bright', label: '밝게' },
    { id: 'calm', label: '차분하게' }
  ];
  
  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };
  
  const isComplete = selectedDays.length > 0 && callTime && tone;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 flex">
      <div className="hidden lg:flex lg:w-[380px] border-r-2 border-indigo-200 bg-gradient-to-br from-indigo-50/80 via-blue-50/60 to-white/40 backdrop-blur-xl flex-col items-center justify-between p-10">
        <div className="w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-indigo-200 shadow-sm mb-8">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-slate-700">Version 1 • 심플 폼</span>
          </div>
          <div className="mb-10">
            <div className="flex items-center justify-between gap-2 mb-6">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2 flex-1">
                  <div className={`w-full h-2 rounded-full ${s <= 3 ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                  <span className={`text-xs font-bold ${s <= 3 ? 'text-indigo-600' : 'text-slate-400'}`}>Step {s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <SoriCharacter size={80} animated />
          <div className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900 leading-snug">통화 시간<br/>설정하기</h2>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">편한 시간을 알려주세요</p>
          </div>
        </div>
        <div className="mt-auto space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">다음 단계</p>
          <div className="space-y-2">
            <div className="rounded-lg bg-white/60 border border-slate-200 px-4 py-3 hover:bg-white/80 transition-all">
              <div className="flex items-center gap-2">
                <svg className="w-3 h-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p className="text-sm font-bold text-slate-700">최종 확인</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-8 py-12">
          <div className="space-y-8">
            <div className="mb-6">
              <h1 className="text-3xl font-black text-slate-900 mb-2">통화 설정</h1>
              <p className="text-base font-medium text-slate-600">소리가 정해진 시간에 전화드릴게요</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">통화 요일</label>
              <div className="flex gap-2">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`flex-1 h-12 rounded-xl font-bold text-sm transition-all duration-200 ${
                      selectedDays.includes(day)
                        ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg scale-[1.02]'
                        : 'bg-slate-50 text-slate-600 border-2 border-slate-200 hover:bg-slate-100'
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
                className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">대화 톤</label>
              <div className="grid grid-cols-3 gap-3">
                {tones.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={`h-12 rounded-xl font-bold text-sm transition-all duration-200 ${
                      tone === t.id
                        ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg scale-[1.02]'
                        : 'bg-slate-50 text-slate-600 border-2 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4 pt-6">
              <button
                onClick={() => router.push('/onboarding/chapter-2-v1')}
                className="h-14 px-8 rounded-xl bg-slate-100 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-all duration-200 active:scale-95"
              >
                이전
              </button>
              <button
                onClick={() => router.push('/onboarding/chapter-4-v1')}
                disabled={!isComplete}
                className={`flex-1 h-14 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isComplete
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg hover:scale-[1.02] active:scale-95'
                    : 'bg-slate-200 text-slate-400 opacity-50 cursor-not-allowed'
                }`}
              >
                {isComplete ? '마지막 단계 →' : '시간을 선택해주세요'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
