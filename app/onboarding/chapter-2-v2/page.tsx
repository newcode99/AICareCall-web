'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SoriCharacter } from '@/app/components/SoriCharacter';

export default function OnboardingV2Ch2() {
  const router = useRouter();
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [medicationTags, setMedicationTags] = useState<string[]>([]);
  const [currentMed, setCurrentMed] = useState('');
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

  const formatPhone = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const toggleCondition = (id: string) => {
    if (id === 'none') {
      setSelectedConditions(['none']);
    } else {
      setSelectedConditions((prev) =>
        prev.includes(id)
          ? prev.filter((c) => c !== id && c !== 'none')
          : [...prev.filter((c) => c !== 'none'), id]
      );
    }
  };

  const addMedicationTag = () => {
    if (currentMed.trim() && !medicationTags.includes(currentMed.trim())) {
      setMedicationTags([...medicationTags, currentMed.trim()]);
      setCurrentMed('');
    }
  };

  const removeMedicationTag = (tag: string) => {
    setMedicationTags(medicationTags.filter((t) => t !== tag));
  };

  const isComplete = selectedConditions.length > 0 && emergencyContact && emergencyPhone;

  const handleNext = () => {
    if (selectedConditions.length === 0) {
      alert('건강 상태를 선택해주세요');
      return;
    }
    if (!emergencyContact.trim() || !/^[가-힣a-zA-Z\s]+$/.test(emergencyContact)) {
      alert('긴급 연락처 이름을 올바르게 입력해주세요 (한글 또는 영문)');
      return;
    }
    if (emergencyPhone.replace(/-/g, '').length !== 11) {
      alert('올바른 전화번호를 입력해주세요 (11자리)');
      return;
    }
    router.push('/onboarding/chapter-3-v2');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* 헤더 */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-rose-200 shadow-sm mb-6">
            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-slate-700">Version 2 • 카드형 레이아웃</span>
          </div>
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4].map((num) => (
              <div 
                key={num} 
                className={`h-2 w-20 rounded-full transition-all duration-500 ${
                  num <= 2
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 shadow-lg' 
                    : 'bg-slate-200'
                }`}
              ></div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <SoriCharacter size={70} animated />
            <h1 className="text-4xl font-black text-slate-900 leading-tight">
              <span className="text-rose-600">건강 정보</span>를<br/>
              알려주세요
            </h1>
          </div>
          <p className="text-base font-medium text-slate-600">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-100 text-rose-700 rounded-md font-bold">
              <SoriCharacter size={16} animated={false} />
              소리
            </span>가 <span className="font-bold">더 세심하게</span> 대화할 수 있어요
          </p>
        </div>

        {/* 카드 */}
        <div className="p-10 rounded-3xl bg-white shadow-2xl border-2 border-rose-200 hover:border-rose-300 hover:shadow-rose-200/50 transition-all duration-300">
          <div className="space-y-8">
            {/* 질환 선택 */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <span className="text-lg">🏥</span>
                <span>주요 질환 또는 건강 상태</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {conditions.map((condition) => (
                  <button
                    key={condition.id}
                    onClick={() => toggleCondition(condition.id)}
                    className={`h-12 rounded-xl font-bold text-sm transition-all duration-200 ${
                      selectedConditions.includes(condition.id)
                        ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg scale-[1.02]'
                        : 'bg-slate-50 text-slate-600 border-2 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {condition.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 약 태그 */}
            {selectedConditions.length > 0 && !selectedConditions.includes('none') && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <span className="text-lg">💊</span>
                  <span>복용 중인 약 (선택)</span>
                </label>
                <div className="space-y-2">
                  <input
                    value={currentMed}
                    onChange={(e) => setCurrentMed(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addMedicationTag();
                      }
                    }}
                    className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all text-sm font-medium"
                    placeholder="약 이름 입력 후 Enter"
                  />
                  {medicationTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {medicationTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-100 text-rose-700 rounded-lg text-sm font-bold"
                        >
                          {tag}
                          <button
                            onClick={() => removeMedicationTag(tag)}
                            className="hover:text-rose-900"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 긴급 연락처 */}
            <div className="space-y-4 p-6 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span className="text-2xl">🚨</span>
                <span>긴급 연락처</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="h-12 px-4 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all text-sm font-medium"
                  placeholder="이름"
                />
                <input
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(formatPhone(e.target.value))}
                  maxLength={13}
                  className="h-12 px-4 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all text-sm font-medium"
                  placeholder="010-0000-0000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-4 mt-10">
          <button
            onClick={() => router.push('/onboarding/chapter-1-v2')}
            className="h-14 px-8 rounded-xl bg-slate-100 border-2 border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-200 hover:border-slate-400 transition-all duration-200 active:scale-95"
          >
            ← 이전
          </button>
          <button
            onClick={handleNext}
            disabled={!isComplete}
            className={`flex-1 h-14 rounded-xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 ${
              isComplete
                ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-40'
            }`}
          >
            {isComplete ? (
              <>
                <span>다음 단계로</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </>
            ) : (
              '정보를 모두 입력해주세요'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
