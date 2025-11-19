'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LNB } from '@/app/components/LNB';
import { SoriCharacter } from '@/app/components/SoriCharacter';
import { NotificationCenter } from '@/app/components/NotificationCenter';

export default function Dashboard() {
  const router = useRouter();
  const [selectedCallId, setSelectedCallId] = useState<number | null>(null);
  const [showAllInsights, setShowAllInsights] = useState(false);

  // 실제 데이터 구조
  const summaryData = {
    elderName: '김순자',
    healthScore: 92,
    totalCalls: 42,
    avgDuration: 14,
    nextCall: { date: '2025-01-20', time: '10:00', dayName: '월요일' },
    lastCallStatus: 'completed', // completed, scheduled, in-progress
    careLevel: 'good' // excellent, good, warning, alert
  };

  const upcomingCalls = [
    { id: 1, date: '01/20', day: '월', time: '10:00', status: 'scheduled' },
    { id: 2, date: '01/22', day: '수', time: '10:00', status: 'scheduled' },
    { id: 3, date: '01/24', day: '금', time: '10:00', status: 'scheduled' }
  ];

  const recentCalls = [
    {
      id: 1,
      date: '2025-01-19',
      time: '10:30',
      duration: 15,
      emotion: '밝음',
      emotionScore: 92,
      emotionColor: 'green',
      summary: '평소보다 밝은 목소리로 손주 이야기를 많이 하셨어요',
      detailedSummary: '오늘은 날씨가 좋아서 기분이 좋으시다고 하셨습니다. 손주가 다음 주에 방문한다는 소식에 매우 기뻐하셨어요. 다만 무릎 통증이 아직 남아있어 걱정이라고 말씀하셨습니다.',
      keywords: ['무릎 통증', '손주 방문', '날씨', '기분 좋음'],
      hasAlert: true,
      alertMessage: '무릎 통증 3일 연속 언급',
      alertType: 'warning',
      topics: [
        { category: '가족', content: '손주가 다음 주 방문 예정' },
        { category: '건강', content: '무릎 통증 지속 (3일째)' },
        { category: '일상', content: '날씨가 좋아 기분 좋음' }
      ],
      voiceAnalysis: {
        energy: 85,
        clarity: 90,
        pace: 'normal'
      }
    },
    {
      id: 2,
      date: '2025-01-18',
      time: '14:20',
      duration: 12,
      emotion: '차분함',
      emotionScore: 85,
      emotionColor: 'blue',
      summary: '점심 식사를 잘 하셨고, 약도 제때 드셨다고 하셨어요',
      detailedSummary: '오늘 점심은 된장찌개와 밥을 드셨다고 하셨습니다. 혈압약과 당뇨약을 제때 복용하셨고, 오후에는 TV 시청 예정이라고 하셨어요.',
      keywords: ['식사', '약 복용', 'TV 시청', '혈압약'],
      hasAlert: false,
      topics: [
        { category: '일상', content: '된장찌개 식사' },
        { category: '건강', content: '약 정시 복용 (혈압약, 당뇨약)' },
        { category: '여가', content: 'TV 시청 예정' }
      ],
      voiceAnalysis: {
        energy: 70,
        clarity: 88,
        pace: 'slow'
      }
    },
    {
      id: 3,
      date: '2025-01-17',
      time: '10:15',
      duration: 18,
      emotion: '기쁨',
      emotionScore: 95,
      emotionColor: 'yellow',
      summary: '친구분과 즐거운 시간을 보내셨어요',
      detailedSummary: '오랜 친구와 만나 이야기를 나누셨습니다. 함께 산책도 하셨고, 건강에 대한 이야기도 많이 나누셨다고 하셨어요.',
      keywords: ['친구 만남', '산책', '건강 대화'],
      hasAlert: false,
      topics: [
        { category: '사회', content: '친구와 만남' },
        { category: '활동', content: '산책 (30분)' },
        { category: '건강', content: '건강 정보 교환' }
      ],
      voiceAnalysis: {
        energy: 92,
        clarity: 95,
        pace: 'normal'
      }
    }
  ];

  const insights = [
    {
      id: 1,
      type: '건강',
      title: '무릎 통증 반복 언급',
      desc: '최근 3일간 5회 언급되었습니다',
      detail: '지속적인 무릎 통증 호소가 감지되었습니다. 정형외과 방문을 권장합니다.',
      priority: 'high',
      action: '병원 예약 추천',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      timestamp: '2시간 전',
      // 4단계 구조
      situation: '최근 3일간 통화에서 무릎 통증을 5회 언급하셨습니다. 특히 계단 오르내릴 때 불편함을 호소하셨어요.',
      analysis: '지속적인 무릎 통증은 관절염이나 연골 손상의 신호일 수 있습니다. 조기 진단과 치료가 중요합니다.',
      guardianAction: '정형외과 진료 예약을 권장합니다. 가까운 병원 정보를 확인하시고, 동행이 필요하시면 일정을 조율해주세요.',
      aiPlan: '다음 통화 때 무릎 상태를 다시 확인하고, 병원 방문 여부를 물어볼 예정입니다. 통증이 심해지면 즉시 알려드리겠습니다.'
    },
    {
      id: 2,
      type: '감정',
      title: '전반적으로 안정적인 상태',
      desc: '주간 평균 감정 점수 89점 (양호)',
      detail: '최근 일주일간 감정 상태가 안정적으로 유지되고 있습니다.',
      priority: 'normal',
      icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      timestamp: '1시간 전',
      situation: '최근 일주일간 통화에서 평균 감정 점수 89점을 기록했습니다. 밝은 목소리와 긍정적인 대화가 이어지고 있어요.',
      analysis: '안정적인 감정 상태는 전반적인 건강과 삶의 질이 좋다는 신호입니다. 현재 상태를 잘 유지하고 계십니다.',
      guardianAction: '현재 상태가 매우 좋으니, 꾸준히 관심을 가져주시고 정기적으로 연락해주세요.',
      aiPlan: '긍정적인 대화를 이어가며, 감정 상태를 지속적으로 모니터링하겠습니다.'
    },
    {
      id: 3,
      type: '사회',
      title: '사회 활동 증가',
      desc: '친구 만남 횟수 전주 대비 2배 증가',
      detail: '긍정적인 사회 활동이 증가하고 있습니다. 이는 정신 건강에 매우 좋은 신호입니다.',
      priority: 'low',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      timestamp: '3시간 전',
      situation: '이번 주 친구 만남이 2회 있었습니다. 전주 대비 2배 증가했으며, 만남 후 기분이 매우 좋아지셨어요.',
      analysis: '사회적 교류는 외로움을 줄이고 정신 건강을 향상시킵니다. 매우 긍정적인 변화입니다.',
      guardianAction: '사회 활동을 격려해주세요. 정기적인 모임이나 활동을 제안하시면 좋습니다.',
      aiPlan: '친구 만남에 대해 자주 이야기를 나누며, 다음 만남 일정도 물어보겠습니다.'
    },
    {
      id: 4,
      type: '약물',
      title: '약 복용 일정 완벽 준수',
      desc: '최근 7일간 100% 복용률',
      detail: '처방된 모든 약물을 정시에 복용하고 계십니다.',
      priority: 'low',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
      timestamp: '1일 전',
      situation: '최근 7일간 모든 약을 정시에 복용하셨습니다. 혈압약과 당뇨약을 빠짐없이 드셨어요.',
      analysis: '규칙적인 약 복용은 건강 관리의 핵심입니다. 완벽하게 지키고 계십니다.',
      guardianAction: '계속 격려해주시고, 약이 떨어지기 전에 미리 재처방받을 수 있도록 도와주세요.',
      aiPlan: '매일 약 복용 여부를 확인하고, 잊으셨을 경우 상기시켜 드리겠습니다.'
    }
  ];

  const weeklyTrend = [
    { day: '월', emotion: 85, health: 90 },
    { day: '화', emotion: 82, health: 88 },
    { day: '수', emotion: 88, health: 92 },
    { day: '목', emotion: 90, health: 91 },
    { day: '금', emotion: 92, health: 93 },
    { day: '토', emotion: 95, health: 92 },
    { day: '일', emotion: 89, health: 90 }
  ];

  const getCareLevelColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'from-green-600 to-emerald-600';
      case 'good': return 'from-blue-600 to-cyan-600';
      case 'warning': return 'from-yellow-600 to-orange-600';
      case 'alert': return 'from-red-600 to-pink-600';
      default: return 'from-slate-600 to-slate-700';
    }
  };

  const getCareLevelText = (level: string) => {
    switch (level) {
      case 'excellent': return '매우 좋음';
      case 'good': return '양호';
      case 'warning': return '주의 필요';
      case 'alert': return '긴급 대응 필요';
      default: return '확인 중';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-200 text-red-700';
      case 'normal': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'low': return 'bg-slate-50 border-slate-200 text-slate-700';
      default: return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case '밝음':
      case '기쁨':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        );
      case '차분함':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <LNB />
      
      <main className="flex-1 overflow-y-auto">
        {/* 프로페셔널 헤더 */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-xl bg-white/90">
          <div className="px-8 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <SoriCharacter size={28} animated />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-slate-900">
                    {summaryData.elderName} 님 케어 현황
                  </h1>
                  <p className="text-sm text-slate-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    실시간 업데이트 중
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* 케어 레벨 */}
                <div className={`px-4 py-2.5 rounded-xl bg-gradient-to-r ${getCareLevelColor(summaryData.careLevel)} shadow-lg`}>
                  <span className="text-sm font-black text-white">
                    케어 점수 {summaryData.healthScore}점 • {getCareLevelText(summaryData.careLevel)}
                  </span>
                </div>

                {/* 알림 센터 */}
                <NotificationCenter />

                {/* 빠른 액션 */}
                <button 
                  onClick={() => router.push('/chat')}
                  className="px-4 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-bold hover:bg-violet-700 transition-all flex items-center gap-2 shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  긴급 연락
                </button>

                <button 
                  onClick={() => router.push('/report')}
                  className="px-4 py-2.5 rounded-xl border-2 border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  리포트
                </button>

                <button 
                  onClick={() => router.push('/chat')}
                  className="px-4 py-2.5 rounded-xl border-2 border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  실시간 대화
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* 핵심 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* 총 통화 횟수 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                  +12%
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-600 mb-1">총 통화 횟수</p>
                <p className="text-3xl font-black text-slate-900 mb-1">{summaryData.totalCalls}회</p>
                <p className="text-xs text-slate-500">지난주 대비 5회 증가</p>
              </div>
            </div>

            {/* 평균 통화 시간 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                  +8%
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-600 mb-1">평균 통화 시간</p>
                <p className="text-3xl font-black text-slate-900 mb-1">{summaryData.avgDuration}분</p>
                <p className="text-xs text-slate-500">지난주 대비 1분 증가</p>
              </div>
            </div>

            {/* 감정 점수 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                  +3%
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-600 mb-1">평균 감정 점수</p>
                <p className="text-3xl font-black text-slate-900 mb-1">89점</p>
                <p className="text-xs text-slate-500">매우 안정적인 상태</p>
              </div>
            </div>

            {/* 케어 일수 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded-full">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  연속
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-600 mb-1">소리와 함께한 날</p>
                <p className="text-3xl font-black text-slate-900 mb-1">128일</p>
                <p className="text-xs text-slate-500">2024년 9월 13일부터</p>
              </div>
            </div>
          </div>

          {/* 온기 요약 카드 */}
          <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-black text-white mb-1">한 주간의 온기 요약</h2>
                <p className="text-sm text-white/90 font-medium">소리가 전하는 이번 주 이야기</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 가장 밝았던 순간 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                  </svg>
                  <h3 className="text-sm font-black text-white uppercase tracking-wide">가장 밝았던 순간</h3>
                </div>
                <p className="text-sm text-white/90 font-medium leading-relaxed">
                  금요일 오후, 손주가 전화해서 다음 주 방문 소식을 전했을 때
                </p>
                <p className="text-xs text-white/70 mt-2">감정 점수: 95점</p>
              </div>

              {/* 가장 많이 이야기한 주제 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                  </svg>
                  <h3 className="text-sm font-black text-white uppercase tracking-wide">가장 많이 이야기한 주제</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-white">가족 (12회)</span>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-white">건강 (8회)</span>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-white">날씨 (6회)</span>
                </div>
              </div>

              {/* 이번 주 건강 상태 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                  </svg>
                  <h3 className="text-sm font-black text-white uppercase tracking-wide">이번 주 건강 상태</h3>
                </div>
                <p className="text-sm text-white/90 font-medium leading-relaxed mb-2">
                  전반적으로 양호하나 무릎 통증 지속 관찰 필요
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-xs font-black text-white">85%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 메인 그리드 */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            {/* 좌측: AI 케어 인사이트 */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* AI 인사이트 카드 */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900">AI 케어 인사이트</h2>
                      <p className="text-xs text-slate-600">실시간 분석 결과</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setShowAllInsights(!showAllInsights)}
                    className="text-sm font-bold text-violet-600 hover:text-violet-700 transition-colors"
                  >
                    {showAllInsights ? '접기' : `전체 보기 (${insights.length})`}
                  </button>
                </div>

                <div className="space-y-3">
                  {(showAllInsights ? insights : insights.slice(0, 2)).map((insight) => (
                    <div
                      key={insight.id}
                      className={`p-5 rounded-xl border-2 ${getPriorityColor(insight.priority)} hover:shadow-lg transition-all`}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          insight.priority === 'high' ? 'bg-red-100' : 
                          insight.priority === 'normal' ? 'bg-blue-100' : 
                          'bg-slate-100'
                        }`}>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={insight.icon}/>
                          </svg>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-black uppercase tracking-wide opacity-60">
                              {insight.type}
                            </span>
                            <span className="text-xs text-slate-500">• {insight.timestamp}</span>
                          </div>
                          <h3 className="text-lg font-black text-slate-900 mb-1">{insight.title}</h3>
                          <p className="text-sm text-slate-600">{insight.desc}</p>
                        </div>
                      </div>

                      {/* 4단계 구조 */}
                      {showAllInsights && (
                        <div className="space-y-3 mt-4 pt-4 border-t border-slate-200">
                          {/* 1. 상황 (What) */}
                          <div className="p-3 rounded-lg bg-white/70">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center">
                                <span className="text-xs font-black text-blue-700">1</span>
                              </div>
                              <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide">상황 (What)</h4>
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed pl-8">{insight.situation}</p>
                          </div>

                          {/* 2. 분석 (Why) */}
                          <div className="p-3 rounded-lg bg-white/70">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-md bg-violet-100 flex items-center justify-center">
                                <span className="text-xs font-black text-violet-700">2</span>
                              </div>
                              <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide">분석 (Why)</h4>
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed pl-8">{insight.analysis}</p>
                          </div>

                          {/* 3. 보호자 제안 (Action) */}
                          <div className="p-3 rounded-lg bg-white/70 border-2 border-orange-200">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-md bg-orange-100 flex items-center justify-center">
                                <span className="text-xs font-black text-orange-700">3</span>
                              </div>
                              <h4 className="text-xs font-black text-orange-700 uppercase tracking-wide">보호자 제안 (Action)</h4>
                            </div>
                            <p className="text-sm font-bold text-slate-900 leading-relaxed pl-8">{insight.guardianAction}</p>
                          </div>

                          {/* 4. 소리의 계획 (AI's Plan) */}
                          <div className="p-3 rounded-lg bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                                </svg>
                              </div>
                              <h4 className="text-xs font-black text-violet-700 uppercase tracking-wide">소리의 계획 (AI&apos;s Plan)</h4>
                            </div>
                            <p className="text-sm font-bold text-violet-900 leading-relaxed pl-8">{insight.aiPlan}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 최근 통화 기록 */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900">최근 통화 기록</h2>
                      <p className="text-xs text-slate-600">최근 7일간 {recentCalls.length}건</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => router.push('/chat')}
                    className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    전체 보기
                  </button>
                </div>

                <div className="space-y-3">
                  {recentCalls.map((call) => (
                    <div key={call.id} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all">
                      {/* 통화 헤더 */}
                      <button
                        onClick={() => setSelectedCallId(selectedCallId === call.id ? null : call.id)}
                        className="w-full p-4 text-left hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            {/* 감정 아이콘 */}
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              call.emotionColor === 'green' ? 'bg-green-100 text-green-600' :
                              call.emotionColor === 'blue' ? 'bg-blue-100 text-blue-600' :
                              call.emotionColor === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                              {getEmotionIcon(call.emotion)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-black text-slate-900">{call.date}</span>
                                <span className="text-xs text-slate-500">• {call.time}</span>
                                <span className="text-xs text-slate-500">• {call.duration}분</span>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                  call.emotionColor === 'green' ? 'bg-green-100 text-green-700' :
                                  call.emotionColor === 'blue' ? 'bg-blue-100 text-blue-700' :
                                  call.emotionColor === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-slate-100 text-slate-700'
                                }`}>
                                  {call.emotion} {call.emotionScore}점
                                </span>
                              </div>
                              <p className="text-sm text-slate-600 truncate">{call.summary}</p>
                            </div>
                          </div>

                          {/* 알림 + 펼치기 */}
                          <div className="flex items-center gap-2 ml-4">
                            {call.hasAlert && (
                              <div className="px-2 py-1 rounded-lg bg-red-50 border border-red-200">
                                <span className="text-xs font-bold text-red-700">주의</span>
                              </div>
                            )}
                            <svg
                              className={`w-5 h-5 text-slate-400 transition-transform ${
                                selectedCallId === call.id ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                            </svg>
                          </div>
                        </div>
                      </button>

                      {/* 통화 상세 */}
                      {selectedCallId === call.id && (
                        <div className="p-4 bg-slate-50 border-t border-slate-200 animate-slideInDown">
                          {/* 알림 메시지 */}
                          {call.hasAlert && (
                            <div className="mb-4 p-3 rounded-lg bg-red-50 border-2 border-red-200">
                              <div className="flex items-center gap-2 mb-1">
                                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                </svg>
                                <span className="text-xs font-black text-red-700 uppercase">주의 필요</span>
                              </div>
                              <p className="text-sm font-bold text-red-900">{call.alertMessage}</p>
                            </div>
                          )}

                          {/* 상세 요약 */}
                          <div className="mb-4">
                            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide mb-2">통화 내용</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">{call.detailedSummary}</p>
                          </div>

                          {/* 주요 주제 */}
                          <div className="mb-4">
                            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide mb-2">주요 주제</h4>
                            <div className="space-y-2">
                              {call.topics.map((topic, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <span className="text-xs font-bold text-violet-600 bg-violet-100 px-2 py-1 rounded-md">
                                    {topic.category}
                                  </span>
                                  <span className="text-sm text-slate-700">{topic.content}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 키워드 */}
                          <div className="mb-4">
                            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide mb-2">키워드</h4>
                            <div className="flex flex-wrap gap-2">
                              {call.keywords.map((keyword, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* 음성 분석 */}
                          <div>
                            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide mb-2">음성 분석</h4>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="p-3 rounded-lg bg-white border border-slate-200">
                                <p className="text-xs text-slate-600 mb-1">에너지</p>
                                <p className="text-lg font-black text-slate-900">{call.voiceAnalysis.energy}%</p>
                              </div>
                              <div className="p-3 rounded-lg bg-white border border-slate-200">
                                <p className="text-xs text-slate-600 mb-1">명료도</p>
                                <p className="text-lg font-black text-slate-900">{call.voiceAnalysis.clarity}%</p>
                              </div>
                              <div className="p-3 rounded-lg bg-white border border-slate-200">
                                <p className="text-xs text-slate-600 mb-1">말속도</p>
                                <p className="text-lg font-black text-slate-900 capitalize">{call.voiceAnalysis.pace}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 우측: 예정 통화 + 주간 트렌드 */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* 다음 통화 */}
              <div className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-wide">다음 통화 예정</h3>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-4">
                  <p className="text-xs opacity-80 mb-2">{summaryData.nextCall.dayName}</p>
                  <p className="text-3xl font-black mb-1">{summaryData.nextCall.time}</p>
                  <p className="text-sm font-bold opacity-90">{summaryData.nextCall.date}</p>
                </div>

                <button 
                  onClick={() => router.push('/settings')}
                  className="w-full h-10 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all text-sm font-bold border border-white/30"
                >
                  일정 관리
                </button>
              </div>

              {/* 예정 통화 목록 */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-sm font-black text-slate-900 mb-4">이번 주 통화 일정</h3>
                <div className="space-y-2">
                  {upcomingCalls.map((call) => (
                    <div key={call.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center">
                          <span className="text-xs font-black">{call.day}</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{call.date}</p>
                          <p className="text-xs text-slate-600">{call.time}</p>
                        </div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 주간 트렌드 */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-sm font-black text-slate-900 mb-4">주간 트렌드</h3>
                <div className="space-y-4">
                  {/* 감정 추이 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-600">감정 점수</span>
                      <span className="text-xs font-black text-green-600">평균 89점</span>
                    </div>
                    <div className="flex items-end gap-1 h-20">
                      {weeklyTrend.map((day, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                          <div className="w-full bg-gradient-to-t from-green-600 to-emerald-500 rounded-t-lg transition-all hover:opacity-80" 
                               style={{ height: `${day.emotion}%` }}></div>
                          <span className="text-xs font-bold text-slate-600">{day.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 건강 추이 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-600">건강 점수</span>
                      <span className="text-xs font-black text-blue-600">평균 91점</span>
                    </div>
                    <div className="flex items-end gap-1 h-20">
                      {weeklyTrend.map((day, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                          <div className="w-full bg-gradient-to-t from-blue-600 to-cyan-500 rounded-t-lg transition-all hover:opacity-80" 
                               style={{ height: `${day.health}%` }}></div>
                          <span className="text-xs font-bold text-slate-600">{day.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 빠른 메모 */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-sm font-black text-slate-900 mb-4">빠른 메모</h3>
                <textarea
                  className="w-full h-24 p-3 rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 resize-none text-sm"
                  placeholder="케어 노트를 작성하세요..."
                />
                <button className="w-full mt-2 h-9 rounded-lg bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all">
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
