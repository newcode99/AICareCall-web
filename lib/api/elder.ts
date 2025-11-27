/**
 * 어르신 API 클라이언트
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Elder {
    id: number;
    name: string;
    relation: string;
    phone_number: string;
    begin_date: string;
}

export interface ElderCreateResponse {
    id: number;
    user_id: number;
    name: string;
    invite_code: string;
}

export interface ElderCreate {
    name: string;
    gender: string;
    age: number;
    phone: string;
    relation: string;
    residence_type: string;
    health_condition: string;
    begin_date: string;
    end_date: string | null;
    ask_meal: boolean;
    ask_medication: boolean;
    ask_emotion: boolean;
    ask_special_event: boolean;
    additional_info: string;
    call_weekdays: string[];
    call_times: string[];
}

/**
 * 어르신 관련 API
 */
export const elderApi = {
    /**
     * 사용자의 어르신 목록 조회
     */
    async getElders(userId: number): Promise<Elder[]> {
        const response = await fetch(`${API_BASE_URL}/users/${userId}/elders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`어르신 목록 조회 실패: ${response.status}`);
        }

        return response.json();
    },

    /**
     * 어르신 등록
     */
    async createElder(userId: number, elderData: any): Promise<ElderCreateResponse> {
        const response = await fetch(`${API_BASE_URL}/users/${userId}/elders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(elderData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `어르신 등록 실패: ${response.status}`);
        }

        return response.json();
    },
};
