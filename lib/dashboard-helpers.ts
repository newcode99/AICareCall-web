/**
 * 대시보드 유틸리티 함수
 * 통계 데이터를 사용자 친화적인 문구로 변환
 */

/**
 * 카드 1: 이번 주 통화 시도 횟수에 따른 설명 문구
 */
export function getAttemptsDescription(count: number): string {
    if (count === 0) return "이번 주는 아직 통화가 없어요";
    if (count <= 3) return "조금 더 자주 연락해보면 좋겠어요";
    if (count <= 7) return "꾸준히 안부를 나누고 있어요";
    return "매우 활발하게 소통하고 있어요";
}

/**
 * 카드 2: 주간 통화 성공 횟수에 따른 설명 문구
 * @param successCount 성공한 통화 횟수
 * @param totalAttempts 전체 시도 횟수 (사용 안 함, 호환성 유지)
 */
export function getSuccessDescription(successCount: number, totalAttempts: number): string {
    if (successCount === 0) return "아직 성공한 통화가 없어요. 저희 시간을 맞춰봐요";
    if (successCount <= 5) return "꾸준히 연결하고 있어요";
    if (successCount <= 10) return "안정적인 케어 연결 유지 중";
    return "매우 활발하게 소통하고 있어요";
}

/**
 * 카드 3: 평균 통화 시간에 따른 설명 문구
 */
export function getAvgDurationDescription(minutes: number): string {
    if (minutes === 0) return "아직 통화 기록이 없어요";
    if (minutes < 5) return "소중한 분과 안부와 마음을 나누고 있어요";
    if (minutes <= 10) return "점점 교감을 쌓고 있어요";
    return "깊은 교감이 이루어지고 있어요";
}

/**
 * 카드 4: 서비스 경과 일수에 따른 설명 문구
 */
export function getDaysDescription(days: number): string {
    if (days < 7) return "소리와 함께 시작한 첫 주예요";
    if (days < 30) return "소리와 함께하는 시간이 쌓이고 있어요";
    if (days < 100) return "매일의 따뜻한 안부를 나누고 있어요";
    return "오랜 시간 함께 해주셔서 감사해요";
}

/**
 * 백엔드 status 값을 프론트엔드 status로 변환
 */
export function convertCallStatus(status: string): 'success' | 'missed' {
    if (status === 'completed') return 'success';
    return 'missed';
}

/**
 * 통화 성공률 계산 (백분율)
 */
export function calculateSuccessRate(successCount: number, totalAttempts: number): number {
    if (totalAttempts === 0) return 0;
    return Math.round((successCount / totalAttempts) * 100);
}
