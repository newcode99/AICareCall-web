'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SoriCharacter } from '@/app/components/SoriCharacter';

export default function OnboardingV3Ch2() {
  const router = useRouter();
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 flex">
      <div className="hidden lg:flex lg:w-[380px] border-r-2 border-cyan-200 bg-gradient-to-br from-cyan-50/80 via-blue-50/60 to-white/40 backdrop-blur-xl flex-col items-center justify-between p-10">
        <div className="w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-cyan-200 shadow-sm mb-8">
            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-slate-700">Version 3 • 단계별 전환</span>
          </div>
          <div className="mb-10">
            <div className="flex flex-col gap-4">
              {[{n:1,t:'프로필'},{n:2,t:'건강'},{n:3,t:'통화'},{n:4,t:'완료'}].map(({n,t}) => (
                <div key={n} className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-black transition-all duration-300 ${n <= 2 ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-lg scale-110' : 'bg-slate-200 text-slate-400'}`}>
                    {n <= 1 ? '✓' : n}
                  </div>
                  <span className={`text-sm font-bold transition-colors ${n <= 2 ? 'text-cyan-600' : 'text-slate-400'}`}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <SoriCharacter size={80} animated />
          <div className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900 leading-snug">건강 정보<br/>입력</h2>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">V3 단계별 진행</p>
          </div>
        </div>
        <div className="mt-auto space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">진행률</p>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-600 to-blue-600 transition-all duration-500" style={{width: '50%'}}></div>
          </div>
          <p className="text-xs font-semibold text-cyan-600">2/4 단계</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-8 py-12">
          <div className="bg-white rounded-3xl shadow-2xl p-10 border-2 border-white/50 animate-fadeIn">
            <div className="space-y-6">
              <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 text-white flex items-center justify-center text-lg font-black">2</div>
                  건강 정보
                </h1>
                <p className="text-base font-medium text-slate-600 ml-13">소리가 더 세심하게 대화할 수 있어요</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">주요 질환</label>
                <div className="grid grid-cols-2 gap-3">
                  {conditions.map((condition) => (
                    <button
                      key={condition.id}
                      onClick={() => toggleCondition(condition.id)}
                      className={`h-12 rounded-xl font-bold text-sm transition-all duration-200 ${
                        selectedConditions.includes(condition.id)
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg scale-[1.02]'
                          : 'bg-slate-50 text-slate-600 border-2 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {condition.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-black text-slate-900">긴급 연락처</h3>
                <div>
                  <input
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    className="w-full h-12 px-4 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all text-sm font-medium"
                    placeholder="이름"
                  />
                </div>
                <div>
                  <input
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    className="w-full h-12 px-4 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all text-sm font-medium"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4 pt-8">
              <button
                onClick={() => router.push('/onboarding/chapter-1-v3')}
                className="h-14 px-8 rounded-xl bg-slate-100 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-all duration-200 active:scale-95"
              >
                ← 이전 단계
              </button>
              <button
                onClick={() => router.push('/onboarding/chapter-3-v3')}
                disabled={!isComplete}
                className={`flex-1 h-14 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isComplete
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg hover:scale-[1.02] active:scale-95'
                    : 'bg-slate-200 text-slate-400 opacity-50 cursor-not-allowed'
                }`}
              >
                {isComplete ? '다음 단계 →' : '정보를 입력해주세요'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
