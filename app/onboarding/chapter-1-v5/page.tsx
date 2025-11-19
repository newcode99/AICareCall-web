'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SoriCharacter } from '@/app/components/SoriCharacter';

// V5 특성: 최소화 & 빠른 시작 - 필수 항목만
export default function OnboardingV5Chapter1() {
  const router = useRouter();
  
  const [guardianPhone, setGuardianPhone] = useState('');
  const [elderPhone, setElderPhone] = useState('');
  const [callTime, setCallTime] = useState('10:00');

  const formatPhone = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleQuickStart = () => {
    if (!guardianPhone || !elderPhone) {
      alert('연락처를 입력해주세요');
      return;
    }
    router.push('/onboarding/complete');
  };

  const isComplete = guardianPhone.replace(/-/g, '').length === 11 && 
                     elderPhone.replace(/-/g, '').length === 11;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-10 border-4 border-white/10">
          {/* 헤더 */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 shadow-sm mb-6">
              <span className="text-xs font-bold text-slate-700">V5 • 빠른 시작</span>
            </div>
            
            <div className="mb-6">
              <SoriCharacter size={80} animated />
            </div>

            <h1 className="text-3xl font-black text-slate-900 mb-2">30초 만에 시작</h1>
            <p className="text-sm text-slate-600">연락처만 입력하세요</p>
            <p className="text-xs text-slate-500 mt-2">나머지는 나중에 추가할 수 있어요</p>
          </div>

          {/* 필수 입력 */}
          <div className="space-y-5 mb-8">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                </svg>
                <span>보호자 연락처</span>
              </label>
              <input
                type="tel"
                value={guardianPhone}
                onChange={(e) => setGuardianPhone(formatPhone(e.target.value))}
                className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all text-lg font-bold"
                placeholder="010-0000-0000"
              />
              {guardianPhone && guardianPhone.replace(/-/g, '').length === 11 && (
                <p className="text-xs text-green-600 font-bold mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>확인</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
                <span>소중한 분 연락처</span>
              </label>
              <input
                type="tel"
                value={elderPhone}
                onChange={(e) => setElderPhone(formatPhone(e.target.value))}
                className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all text-lg font-bold"
                placeholder="010-0000-0000"
              />
              {elderPhone && elderPhone.replace(/-/g, '').length === 11 && (
                <p className="text-xs text-green-600 font-bold mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>확인</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
                <span>통화 시간</span>
                <span className="text-slate-400">(기본 설정)</span>
              </label>
              <input
                type="time"
                value={callTime}
                onChange={(e) => setCallTime(e.target.value)}
                className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all text-lg font-bold text-center"
              />
              <p className="text-xs text-slate-500 mt-2">매주 월/수/금 기본 설정 (변경 가능)</p>
            </div>
          </div>

          {/* 빠른 시작 버튼 */}
          <button
            onClick={handleQuickStart}
            disabled={!isComplete}
            className={`w-full h-16 rounded-xl font-black text-lg transition-all flex items-center justify-center gap-2 ${
              isComplete
                ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isComplete ? (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <span>빠른 시작 🚀</span>
              </>
            ) : (
              '연락처를 입력해주세요'
            )}
          </button>

          {/* 추가 정보 안내 */}
          <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-xs font-bold text-slate-700 mb-1">💡 이렇게 시작하면</p>
            <ul className="space-y-1">
              <li className="text-xs text-slate-600">✓ 즉시 통화 서비스 시작</li>
              <li className="text-xs text-slate-600">✓ 나중에 건강 정보 추가 가능</li>
              <li className="text-xs text-slate-600">✓ 설정은 언제든 변경 가능</li>
            </ul>
          </div>
        </div>

        {/* 진행 표시 */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <div className="w-2 h-2 rounded-full bg-slate-600"></div>
          <div className="w-2 h-2 rounded-full bg-slate-600"></div>
        </div>
        <p className="text-center text-xs text-slate-400 mt-2">최소 정보만 입력</p>
      </div>
    </div>
  );
}
