'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { LNB } from '@/app/components/LNB';
import { SidebarInset } from '@/components/ui/sidebar';
import { dashboardApi, CallListResponse } from '@/lib/api/dashboard';
import { convertCallStatus } from '@/lib/dashboard-helpers';

export const dynamic = 'force-dynamic';

function CallHistoryContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const elderId = params.elderId ? Number(params.elderId) : null;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // State
  const [callListData, setCallListData] = useState<CallListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCallList() {
      if (!elderId) {
        setError('잘못된 접근입니다.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await dashboardApi.getCallList(elderId, currentPage);
        setCallListData(data);
      } catch (err) {
        console.error('통화 목록 조회 실패:', err);
        setError(err instanceof Error ? err.message : '통화 목록을 불러올 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCallList();
  }, [elderId, currentPage]);

  const handlePageChange = (page: number) => router.push(`/call-list/${elderId}?page=${page}`);
  const handleCallClick = (call: any) => router.push(`/call-list/${elderId}/${call.id}`);

  return (
    <>
      <LNB />
      <SidebarInset className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
          <div className="px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-900">전체 통화 기록</h1>
                <p className="text-sm text-slate-600 mt-1 font-medium">소리와 어르신의 모든 대화 기록</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10 w-full mx-auto">
          {/* Component Box without Tabs */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Feed List */}
            <div className="p-8 bg-slate-50/30">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <div className="text-slate-600 text-lg font-semibold">로딩 중...</div>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-red-600 text-lg font-semibold mb-4">{error}</div>
                  <button
                    onClick={() => router.push(`/dashboard/${elderId}`)}
                    className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold rounded-lg transition-colors"
                  >
                    대시보드로 돌아가기
                  </button>
                </div>
              ) : callListData && callListData.items.length > 0 ? (
                <>
                  <div className="space-y-5">
                    {callListData.items.map((call) => {
                      const displayStatus = convertCallStatus(call.status);
                      const statusText = displayStatus === 'success' ? '통화 성공' : '부재중';

                      return (
                        <div key={call.id} className="bg-white rounded-2xl border-2 border-blue-200 shadow-sm p-6 hover:border-blue-300 transition-colors">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-base font-black text-slate-900">{call.date}</span>
                                <span className="text-sm font-medium text-slate-500">{call.time}</span>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${displayStatus === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>{statusText}</span>
                                {call.duration_minutes > 0 && <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-700">{call.duration_minutes}분 통화</span>}
                              </div>
                              <p className="text-sm text-slate-700 leading-relaxed mb-3">{call.summary}</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {call.tags.map((tag: string, index: number) => <span key={index} className="px-2.5 py-0.5 text-xs font-bold bg-blue-50 text-blue-600 rounded-md">#{tag}</span>)}
                              </div>
                              <button onClick={() => handleCallClick(call)} className="w-full bg-blue-50 hover:bg-blue-100 rounded-lg py-3 text-center transition-colors cursor-pointer group">
                                <span className="text-blue-600 group-hover:text-blue-700 text-sm font-bold inline-flex items-center gap-1">
                                  <span>통화 상세 리포트</span>
                                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </span>
                              </button>
                            </div>
                            {/* 감정 아이콘 */}
                            {call.emotion ? (
                              <div className={`w-12 h-12 rounded-2xl ${call.emotion === '좋음' ? 'bg-emerald-100 border-emerald-200' : call.emotion === '보통' ? 'bg-blue-100 border-blue-200' : 'bg-red-100 border-red-200'} border flex items-center justify-center shadow-sm`}>
                                <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-yellow-500 flex items-center justify-center relative">
                                  <div className="absolute top-2.5 left-1.5 w-1 h-1 rounded-full bg-slate-800" />
                                  <div className="absolute top-2.5 right-1.5 w-1 h-1 rounded-full bg-slate-800" />
                                  {call.emotion === '좋음' && <svg className="absolute bottom-1.5 w-4 h-2" viewBox="0 0 16 8"><path d="M2 2C4 6 12 6 14 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" className="text-slate-800" /></svg>}
                                  {call.emotion === '보통' && <div className="absolute bottom-2.5 w-4 h-0.5 bg-slate-800 rounded-full" />}
                                  {call.emotion === '나쁨' && <svg className="absolute bottom-1.5 w-4 h-2" viewBox="0 0 16 8"><path d="M2 6C4 2 12 2 14 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" className="text-slate-800" /></svg>}
                                </div>
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-sm">
                                <div className="w-3 h-1 bg-slate-400 rounded-full" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  {callListData.total_pages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${currentPage === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 cursor-pointer'}`}>이전</button>
                      {[...Array(callListData.total_pages)].map((_, i) => <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={`px-4 py-2 text-sm font-bold rounded-lg cursor-pointer ${i + 1 === currentPage ? 'bg-violet-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'}`}>{i + 1}</button>)}
                      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === callListData.total_pages} className={`px-4 py-2 text-sm font-bold rounded-lg ${currentPage === callListData.total_pages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 cursor-pointer'}`}>다음</button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-slate-600 text-lg font-semibold">통화 기록이 없습니다.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}

export default function CallHistoryPage() {
  return (
    <Suspense fallback={<><LNB /><SidebarInset className="flex-1 overflow-y-auto flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100"><div className="text-slate-600 text-lg font-semibold">로딩 중...</div></SidebarInset></>}>
      <CallHistoryContent />
    </Suspense>
  );
}

