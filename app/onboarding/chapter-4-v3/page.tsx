'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SoriCharacter } from '@/app/components/SoriCharacter';

export default function OnboardingV3Ch4() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  
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
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-black bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-lg scale-110">
                    ✓
                  </div>
                  <span className="text-sm font-bold text-cyan-600">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <SoriCharacter size={80} animated />
          <div className="space-y-3">
            <h2 className="text-2xl font-black text-slate-900 leading-snug">완료!</h2>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">V3 단계별 진행 완료</p>
          </div>
        </div>
        <div className="mt-auto space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">진행률</p>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-600 to-blue-600 transition-all duration-500" style={{width: '100%'}}></div>
          </div>
          <p className="text-xs font-semibold text-cyan-600">4/4 단계</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-8 py-12">
          <div className="bg-white rounded-3xl shadow-2xl p-10 border-2 border-white/50 animate-fadeIn">
            <div className="space-y-6">
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-black text-slate-900 mb-2">모든 준비 완료!</h1>
                <p className="text-base font-medium text-slate-600">소리가 설정하신 시간에 전화드릴게요</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200">
                <h3 className="text-sm font-bold text-slate-700 mb-4">입력하신 정보</h3>
                <div className="space-y-3 text-sm">
                  {['프로필', '건강 정보', '통화 설정'].map(item => (
                    <div key={item} className="flex justify-between">
                      <span className="font-semibold text-slate-600">{item}</span>
                      <span className="font-bold text-slate-900">완료</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-blue-50 border-2 border-blue-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-2 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700 leading-relaxed">
                    개인정보 수집 및 이용에 동의하며, 소리가 안전하게 정보를 관리하는 것을 확인했습니다.
                  </span>
                </label>
              </div>
            </div>
            <div className="flex gap-4 pt-8">
              <button
                onClick={() => router.push('/onboarding/chapter-3-v3')}
                className="h-14 px-8 rounded-xl bg-slate-100 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-all duration-200 active:scale-95"
              >
                ← 이전
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                disabled={!agreed}
                className={`flex-1 h-14 rounded-xl text-sm font-bold transition-all duration-200 ${
                  agreed
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg hover:scale-[1.02] active:scale-95'
                    : 'bg-slate-200 text-slate-400 opacity-50 cursor-not-allowed'
                }`}
              >
                {agreed ? '소리와 함께 시작하기 🎉' : '동의 후 시작'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
