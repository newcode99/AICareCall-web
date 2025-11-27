'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { elderApi } from '@/lib/api/elder';

export default function DashboardRedirect() {
  const router = useRouter();
  const { userId } = useUserStore();

  useEffect(() => {
    async function redirect() {
        if (!userId) {
        router.replace('/register');
            return;
      }

      try {
        const elders = await elderApi.getElders(userId);
        if (elders.length > 0) {
          router.replace(`/dashboard/${elders[0].id}`);
        } else {
          router.replace('/register');
        }
      } catch (error) {
        console.error('Failed to load elders:', error);
        router.replace('/register');
      }
    }

    redirect();
  }, [userId, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium">대시보드로 이동 중...</p>
                  </div>
                </div>
  );
}
