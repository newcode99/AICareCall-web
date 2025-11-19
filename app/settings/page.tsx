'use client';

import { useState } from 'react';
import { LNB } from '@/app/components/LNB';
import { SoriCharacter } from '@/app/components/SoriCharacter';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'schedule'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  // 프로필 데이터
  const [guardianName, setGuardianName] = useState('홍길동');
  const [guardianPhone, setGuardianPhone] = useState('010-1234-5678');
  const [guardianRelation, setGuardianRelation] = useState('자녀');
  const [elderName, setElderName] = useState('김순자');
  const [elderPhone, setElderPhone] = useState('010-9876-5432');
  
  // 건강 정보
  const [selectedConditions, setSelectedConditions] = useState<string[]>(['고혈압', '당뇨']);
  const [medications, setMedications] = useState<string[]>(['혈압약 (아침)', '혈당강하제']);
  const [emergencyContact, setEmergencyContact] = useState('이민수');
  const [emergencyPhone, setEmergencyPhone] = useState('010-5555-6666');
  
  // 통화 설정
  const [callSchedules, setCallSchedules] = useState([
    { id: '1', days: ['월', '수', '금'], time: '10:00' }
  ]);
  const [tone, setTone] = useState('따뜻하게');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const conditions = ['고혈압', '당뇨', '관절염', '치매', '심장 질환', '해당 없음'];
  const relations = ['자녀', '손자녀', '친척', '지인', '기타'];
  const tones = ['따뜻하게', '밝게', '차분하게'];

  const formatPhone = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleSave = () => {
    // 저장 로직 (API 호출)
    alert('설정이 저장되었습니다!');
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10">
      <LNB />
      
      <main className="flex-1 overflow-y-auto">
        {/* 헤더 */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b-2 border-slate-200 shadow-sm">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  설정 관리
                </h1>
                <p className="text-sm font-medium text-slate-600">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded-md font-bold">
                    <SoriCharacter size={14} animated={false} />
                    소리
                  </span>의 서비스 설정을 관리하세요
                </p>
              </div>
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
                  isEditing
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-xl'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl'
                }`}
              >
                {isEditing ? '✓ 저장하기' : '✏️ 수정하기'}
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* 탭 네비게이션 */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-4 px-6 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-[1.02]'
                  : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <span>소중한 분 프로필</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex-1 py-4 px-6 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'schedule'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-[1.02]'
                  : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span>통화 설정</span>
              </div>
            </button>
          </div>

          {/* 프로필 탭 */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* 기본 정보 */}
              <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">👤</span>
                  <span>기본 정보</span>
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4 p-5 bg-purple-50 rounded-xl border-2 border-purple-200">
                    <h4 className="text-sm font-black text-purple-700 mb-3">보호자 정보</h4>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">성함 *</label>
                      <input
                        value={guardianName}
                        onChange={(e) => setGuardianName(e.target.value)}
                        disabled={!isEditing}
                        className="w-full h-11 px-4 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-sm font-medium disabled:bg-slate-50 disabled:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">연락처 *</label>
                      <input
                        value={guardianPhone}
                        onChange={(e) => setGuardianPhone(formatPhone(e.target.value))}
                        disabled={!isEditing}
                        maxLength={13}
                        className="w-full h-11 px-4 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-sm font-medium disabled:bg-slate-50 disabled:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">관계 *</label>
                      <select
                        value={guardianRelation}
                        onChange={(e) => setGuardianRelation(e.target.value)}
                        disabled={!isEditing}
                        className="w-full h-11 px-4 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-sm font-medium disabled:bg-slate-50 disabled:text-slate-500"
                      >
                        {relations.map((rel) => (
                          <option key={rel} value={rel}>{rel}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4 p-5 bg-blue-50 rounded-xl border-2 border-blue-200">
                    <h4 className="text-sm font-black text-blue-700 mb-3">소중한 분 정보</h4>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">성함 *</label>
                      <input
                        value={elderName}
                        onChange={(e) => setElderName(e.target.value)}
                        disabled={!isEditing}
                        className="w-full h-11 px-4 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm font-medium disabled:bg-slate-50 disabled:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">연락처 *</label>
                      <input
                        value={elderPhone}
                        onChange={(e) => setElderPhone(formatPhone(e.target.value))}
                        disabled={!isEditing}
                        maxLength={13}
                        className="w-full h-11 px-4 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm font-medium disabled:bg-slate-50 disabled:text-slate-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 건강 프로필 */}
              <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">🏥</span>
                  <span>건강 프로필</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">주요 질환</label>
                    <div className="grid grid-cols-3 gap-2">
                      {conditions.map((condition) => (
                        <button
                          key={condition}
                          onClick={() => {
                            if (!isEditing) return;
                            setSelectedConditions(prev =>
                              prev.includes(condition)
                                ? prev.filter(c => c !== condition)
                                : [...prev, condition]
                            );
                          }}
                          disabled={!isEditing}
                          className={`h-11 rounded-lg font-bold text-sm transition-all ${
                            selectedConditions.includes(condition)
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                              : 'bg-slate-50 text-slate-600 border-2 border-slate-200 hover:bg-slate-100'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {condition}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">복용 중인 약</label>
                    <div className="flex flex-wrap gap-2 p-4 bg-emerald-50 rounded-lg border-2 border-emerald-200 min-h-[60px]">
                      {medications.map((med, idx) => (
                        <span key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full text-sm font-bold">
                          💊 {med}
                          {isEditing && (
                            <button
                              onClick={() => setMedications(medications.filter((_, i) => i !== idx))}
                              className="hover:bg-white/20 rounded-full p-0.5"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                              </svg>
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 bg-red-50 rounded-xl border-2 border-red-200">
                    <h4 className="text-sm font-black text-red-700 mb-3 flex items-center gap-2">
                      <span className="text-lg">🚨</span>
                      <span>긴급 연락처</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        value={emergencyContact}
                        onChange={(e) => setEmergencyContact(e.target.value)}
                        disabled={!isEditing}
                        placeholder="이름"
                        className="h-11 px-4 rounded-lg border-2 border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all text-sm font-medium disabled:bg-white/50"
                      />
                      <input
                        value={emergencyPhone}
                        onChange={(e) => setEmergencyPhone(formatPhone(e.target.value))}
                        disabled={!isEditing}
                        maxLength={13}
                        placeholder="010-0000-0000"
                        className="h-11 px-4 rounded-lg border-2 border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all text-sm font-medium disabled:bg-white/50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 통화 설정 탭 */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              {/* 통화 일정 */}
              <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">📅</span>
                  <span>통화 일정</span>
                </h3>
                <div className="space-y-4">
                  {callSchedules.map((schedule) => (
                    <div key={schedule.id} className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-black text-slate-900">⏰ {schedule.time}</p>
                        {isEditing && (
                          <button className="px-3 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold transition-all">
                            삭제
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {schedule.days.map((day, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white/80 text-amber-700 rounded-md text-sm font-bold">
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 대화 톤 */}
              <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">💬</span>
                  <span>대화 톤</span>
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {tones.map((t) => (
                    <button
                      key={t}
                      onClick={() => isEditing && setTone(t)}
                      disabled={!isEditing}
                      className={`h-12 rounded-xl font-bold text-sm transition-all ${
                        tone === t
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                          : 'bg-slate-50 text-slate-600 border-2 border-slate-200 hover:bg-slate-100'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* 알림 설정 */}
              <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">🔔</span>
                  <span>알림 설정</span>
                </h3>
                <label className="flex items-center justify-between p-5 bg-blue-50 rounded-xl border-2 border-blue-200 cursor-pointer group">
                  <div>
                    <p className="text-sm font-black text-slate-900 mb-1">통화 알림 받기</p>
                    <p className="text-xs font-medium text-slate-600">통화 전후로 알림을 보내드려요</p>
                  </div>
                  <button
                    onClick={() => isEditing && setNotificationsEnabled(!notificationsEnabled)}
                    disabled={!isEditing}
                    className={`relative w-14 h-8 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      notificationsEnabled ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${
                        notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></span>
                  </button>
                </label>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
