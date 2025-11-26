'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { SoriCharacter } from '@/app/components/custom/SoriCharacter';
import { Emotion3D } from '@/app/components/custom/Emotion3D';
import { dashboardApi, CallDetailResponse } from '@/lib/api/dashboard';

export default function CallDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [callData, setCallData] = useState<CallDetailResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        async function fetchCallDetail() {
            try {
                setIsLoading(true);
                const data = await dashboardApi.getCallDetail(parseInt(id, 10));
                setCallData(data);
            } catch (err) {
                console.error('통화 상세 조회 실패:', err);
                setError(err instanceof Error ? err.message : '통화 상세를 불러올 수 없습니다.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchCallDetail();
    }, [id]);

    // 로딩 상태
    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium">통화 상세를 불러오는 중...</p>
                </div>
            </div>
        );
    }

    // 에러 상태
    if (error || !callData) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <p className="text-red-600 font-bold mb-4">{error || '데이터를 불러올 수 없습니다.'}</p>
                    <button
                        onClick={() => router.back()}
                        className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-lg transition-colors"
                    >
                        돌아가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full overflow-hidden bg-slate-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-3 flex-shrink-0">
                <button
                    onClick={() => router.back()}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
                <h1 className="text-xl font-black text-slate-900">통화 상세 리포트</h1>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden p-6">
                <div className="h-full grid grid-cols-[550px_1fr] gap-6">
                    {/* Left Panel */}
                    <div className="overflow-y-auto pr-2 space-y-4">
                        {/* 통화 기본 정보 */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                            <h2 className="text-sm font-black text-slate-900 mb-4">통화 기본 정보</h2>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                <div>
                                    <p className="text-xs text-slate-500 mb-2">통화 일시</p>
                                    <p className="text-sm font-bold text-slate-900 whitespace-nowrap">{callData.date}</p>
                                    <p className="text-xs font-bold text-slate-700 mt-0.5">{callData.time}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-2">통화 시간</p>
                                    <p className="text-sm font-bold text-slate-900">{callData.duration}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-2">대상</p>
                                    <p className="text-sm font-bold text-slate-900 leading-snug">{callData.elder_name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-2">통화 상태</p>
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-2 h-2 rounded-full ${callData.status === 'completed' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                        <p className={`text-sm font-bold ${callData.status === 'completed' ? 'text-emerald-700' : 'text-red-700'}`}>
                                            {callData.status === 'completed' ? '완료' : '부재중'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 상태 분석 */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                            <h2 className="text-sm font-black text-slate-900 mb-4">상태 분석</h2>
                            <div className="grid grid-cols-3 gap-3">
                                <div className={`rounded-xl p-4 border-2 transition-all ${callData.emotion === '좋음'
                                    ? 'bg-yellow-50 border-yellow-400 shadow-md'
                                    : 'bg-slate-50 border-slate-200'
                                    }`}>
                                    <div className="flex flex-col items-center gap-2">
                                        <Emotion3D emotion="좋음" size="lg" />
                                        <p className="text-xs font-black text-slate-900">좋음</p>
                                    </div>
                                </div>
                                <div className={`rounded-xl p-4 border-2 transition-all ${callData.emotion === '보통'
                                    ? 'bg-blue-50 border-blue-400 shadow-md'
                                    : 'bg-slate-50 border-slate-200'
                                    }`}>
                                    <div className="flex flex-col items-center gap-2">
                                        <Emotion3D emotion="보통" size="lg" />
                                        <p className="text-xs font-black text-slate-900">보통</p>
                                    </div>
                                </div>
                                <div className={`rounded-xl p-4 border-2 transition-all ${callData.emotion === '나쁨'
                                    ? 'bg-red-50 border-red-400 shadow-md'
                                    : 'bg-slate-50 border-slate-200'
                                    }`}>
                                    <div className="flex flex-col items-center gap-2">
                                        <Emotion3D emotion="나쁨" size="lg" />
                                        <p className="text-xs font-black text-slate-900">나쁨</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 주요 확인 사항 */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                            <h2 className="text-sm font-black text-slate-900 mb-4">주요 확인 사항</h2>
                            <div className="space-y-3">
                                {/* 1. 식사 여부 */}
                                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-emerald-700">식사 여부</p>
                                        <p className="text-sm font-black text-slate-900">-</p>
                                    </div>
                                </div>
                                {/* 2. 건강/복약 여부 */}
                                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-emerald-700">건강/복약 여부</p>
                                        <p className="text-sm font-black text-slate-900">-</p>
                                    </div>
                                </div>
                                {/* 3. 기분 */}
                                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-emerald-700">기분</p>
                                        <p className="text-sm font-black text-slate-900">{callData.emotion || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 키워드 태그 */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                            <h2 className="text-sm font-black text-slate-900 mb-3">키워드 태그</h2>
                            <div className="flex flex-wrap gap-2">
                                {callData.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${i === 0 ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                                            i === 1 ? 'bg-pink-50 text-pink-700 border border-pink-200' :
                                                'bg-violet-50 text-violet-700 border border-violet-200'
                                            }`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="flex flex-col gap-4 overflow-hidden">
                        {/* AI 요약 - 통화 기본 정보와 높이 일치 */}
                        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border-2 border-violet-200 shadow-md flex-shrink-0" style={{ minHeight: '185px', padding: '20px' }}>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                                    <SoriCharacter size={20} />
                                </div>
                                <div>
                                    <h2 className="text-base font-black text-slate-900">AI 요약</h2>
                                    <p className="text-xs font-bold text-violet-600">인공지능 분석 리포트</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-5 border border-violet-100 shadow-sm flex items-center justify-center" style={{ minHeight: '80px' }}>
                                <p className="text-base text-slate-800 leading-relaxed font-medium" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {callData.summary}
                                </p>
                            </div>
                        </div>

                        {/* 대화 전체 로그 */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
                            {/* 헤더 */}
                            <div className="px-5 py-4 border-b border-slate-200 flex-shrink-0 bg-white">
                                <h2 className="text-sm font-black text-slate-900">대화 전체 로그</h2>
                            </div>
                            {/* 채팅창 박스 - 스크롤 가능 */}
                            <div className="flex-1 overflow-hidden p-4 bg-slate-50">
                                <div className="h-full overflow-y-auto px-3 py-2 pb-6 bg-gradient-to-br from-slate-100 via-white to-slate-50 rounded-lg border border-slate-200 shadow-inner space-y-4">
                                    {callData.messages.map((msg, i) => (
                                        <div key={i} className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                                            {msg.role === 'assistant' ? (
                                                <div className="flex items-start gap-3 max-w-[75%]">
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                                                        <SoriCharacter size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-600 mb-1.5">소리</p>
                                                        <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 border border-slate-200 shadow-sm">
                                                            <p className="text-sm font-medium text-slate-800 leading-relaxed">{msg.message}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-start gap-3 max-w-[75%]">
                                                    <div>
                                                        <p className="text-sm font-bold text-violet-600 mb-1.5 text-right">어르신</p>
                                                        <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl rounded-tr-none px-4 py-3 shadow-lg">
                                                            <p className="text-sm font-medium text-white leading-relaxed">{msg.message}</p>
                                                        </div>
                                                    </div>
                                                    <div className="w-9 h-9 rounded-full bg-slate-300 flex items-center justify-center flex-shrink-0 shadow-sm">
                                                        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
