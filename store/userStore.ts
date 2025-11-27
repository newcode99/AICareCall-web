import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * 사용자 상태 관리 스토어
 * - userId: 백엔드 인증 후 받은 사용자 ID
 * - elderId: 현재 선택된 어르신 ID
 */
interface UserState {
    userId: number | null;
    elderId: number | null;
    setUser: (userId: number, email: string) => void;
    setUserId: (userId: number) => void;
    setElderId: (elderId: number) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            userId: null,
            elderId: null,
            setUser: (userId, email) => set({ userId }),
            setUserId: (userId) => set({ userId }),
            setElderId: (elderId) => set({ elderId }),
            clearUser: () => set({ userId: null, elderId: null }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
