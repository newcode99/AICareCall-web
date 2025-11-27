/**
 * 대시보드 API 클라이언트
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// 백엔드 스키마와 1:1 매칭되는 타입 정의
export interface ElderBasicInfo {
    id: number;
    name: string;
    relation: string;
    service_days: number;
}

export interface TodayHighlight {
    message: string;
    call_time: string;
    emotion: string;
    tags: string[];
}

export interface CallAttemptsStats {
    count: number;
}

export interface CallSuccessStats {
    count: number;
}

export interface AvgDurationStats {
    minutes: number;
}

export interface WeeklyStats {
    call_attempts: CallAttemptsStats;
    call_success_count: CallSuccessStats;
    avg_duration: AvgDurationStats;
}

export interface RecentCallItem {
    id: number;
    date: string; // "2025.01.19"
    time: string; // "10:30"
    duration_minutes: number;
    summary: string;
    tags: string[];
    emotion: string | null;
    status: string; // completed, missed, failed
}

export interface NextScheduledCall {
    datetime: string;
    date_display: string;
    time_display: string;
    day_of_week: string;
    is_today: boolean;
}

export interface WeeklyScheduleItem {
    day_of_week: string;
    date: string;
    date_display: string;
    scheduled_times: string[];
}

export interface DashboardResponse {
    elder: ElderBasicInfo;
    today_highlight: TodayHighlight | null;
    weekly_stats: WeeklyStats;
    recent_calls: RecentCallItem[];
    next_scheduled_call: NextScheduledCall | null;
    this_week_schedule: WeeklyScheduleItem[];
}

/**
 * 대시보드 데이터 조회
 */
export const dashboardApi = {
    async getDashboard(elderId: number): Promise<DashboardResponse> {
        const response = await fetch(`${API_BASE_URL}/dashboard/${elderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`대시보드 데이터 조회 실패: ${response.status}`);
        }

        return response.json();
    },

    async getCallList(elderId: number, page: number = 1): Promise<CallListResponse> {
        const response = await fetch(`${API_BASE_URL}/dashboard/${elderId}/call-list?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`통화 목록 조회 실패: ${response.status}`);
        }

        return response.json();
    },

    async getCallDetail(callId: number): Promise<CallDetailResponse> {
        const response = await fetch(`${API_BASE_URL}/dashboard/call-detail/${callId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`통화 상세 조회 실패: ${response.status}`);
        }

        return response.json();
    },
};

// 통화 목록 응답 타입
export interface CallListResponse {
    items: RecentCallItem[];
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
}

// 통화 상세 응답 타입
export interface CallDetailResponse {
    id: number;
    elder_name: string;
    date: string;  // "2023년 10월 27일"
    time: string;  // "10:30 AM"
    duration: string;  // "5분 32초"
    status: string;
    emotion: string | null;
    summary: string;
    tags: string[];
    messages: CallMessageItem[];
}

export interface CallMessageItem {
    role: string;  // "user" | "assistant"
    message: string;
    timestamp: string;
}
