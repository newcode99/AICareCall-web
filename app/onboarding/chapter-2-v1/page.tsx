'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SoriCharacter } from '@/app/components/SoriCharacter';

export default function OnboardingV1Ch2() {
  const router = useRouter();
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [medications, setMedications] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  
  const conditions = [
    { id: 'hypertension', label: '고혈압' },
    { id: 'diabetes', label: '당뇨' },
    { id: 'arthritis', label: '관절염' },
    { id: 'dementia', label: '치매' },
    { id: 'heart', label: '심장 질환' },
    { id: 'none', label: '해당 없음' }
  ];
  
  const toggleCondition = (id: string) => {
    if (id === 'none') {
      setSelectedConditions(['none']);
    } else {
      setSelectedConditions(prev => 
        prev.includes(id) 
          ? prev.filter(c => c !== id && c !== 'none')
          : [...prev.filter(c => c !== 'none'), id]
      );
    }
  };
  
  const isComplete = selectedConditions.length > 0 && emergencyContact && emergencyPhone;
  
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
                  <div className={`w-full h-2 rounded-full ${s <= 2 ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                  <span className={`text-xs font-bold ${s <= 2 ? 'text-indigo-600' : 'text-slate-400'}`}>Step {s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <SoriCharacter size={80} animated />
          <div className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900 leading-snug">건강 정보로<br/>더 세심하게</h2>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">V1의 심플한 입력</p>
          </div>
        </div>
        <div className="mt-auto space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">다음 단계</p>
          <div className="space-y-2">
            <div className="rounded-lg bg-white/60 border border-slate-200 px-4 py-3 hover:bg-white/80 transition-all">
              <div className="flex items-center gap-2">
                <svg className="w-3 h-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p className="text-sm font-bold text-slate-700">통화 설정</p>
              </div>
            </div>
            <div className="rounded-lg bg-white/40 border border-slate-150 px-4 py-2.5">
              <p className="text-xs font-semibold text-slate-500">최종 확인</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-8 py-12">
          <div className="space-y-8">
            <div className="mb-6">
              <h1 className="text-3xl font-black text-slate-900 mb-2">건강 정보</h1>
              <p className="text-base font-medium text-slate-600">소리가 더 세심하게 대화할 수 있어요</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">주요 질환 또는 건강 상태</label>
              <div className="grid grid-cols-2 gap-3">
                {conditions.map((condition) => (
                  <button
                    key={condition.id}
                    onClick={() => toggleCondition(condition.id)}
                    className={`h-12 rounded-xl font-bold text-sm transition-all duration-200 ${
                      selectedConditions.includes(condition.id)
                        ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg scale-[1.02]'
                        : 'bg-slate-50 text-slate-600 border-2 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {condition.label}
                  </button>
                ))}
              </div>
            </div>
            {selectedConditions.length > 0 && !selectedConditions.includes('none') && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">복용 중인 약 (선택)</label>
                <textarea
                  value={medications}
                  onChange={(e) => setMedications(e.target.value)}
                  className="w-full h-24 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-sm font-medium resize-none"
                  placeholder="예) 혈압약 (아침), 당뇨약 (저녁)"
                />
              </div>
            )}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900">긴급 연락처</h3>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">이름</label>
                <input
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-sm font-medium"
                  placeholder="긴급 상황 시 연락할 분"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">연락처</label>
                <input
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-sm font-medium"
                  placeholder="010-0000-0000"
                />
              </div>
            </div>
            <div className="flex gap-4 pt-6">
              <button
                onClick={() => router.push('/onboarding/chapter-1-v1')}
                className="h-14 px-8 rounded-xl bg-slate-100 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-all duration-200 active:scale-95"
              >
                이전
              </button>
              <button
                onClick={() => router.push('/onboarding/chapter-3-v1')}
                disabled={!isComplete}
                className={`flex-1 h-14 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isComplete
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg hover:scale-[1.02] active:scale-95'
                    : 'bg-slate-200 text-slate-400 opacity-50 cursor-not-allowed'
                }`}
              >
                {isComplete ? '다음 →' : '정보를 입력해주세요'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
