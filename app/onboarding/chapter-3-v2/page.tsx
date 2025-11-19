'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SoriCharacter } from '@/app/components/SoriCharacter';
export default function OnboardingV2Ch3() {
  const router = useRouter();
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [callTime, setCallTime] = useState('10:00');
  const [tone, setTone] = useState('warm');
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const tones = [{ id: 'warm', label: '따뜻하게' }, { id: 'bright', label: '밝게' }, { id: 'calm', label: '차분하게' }];
  const toggleDay = (day: string) => { setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]); };
  const isComplete = selectedDays.length > 0 && callTime && tone;
  const progress = ((selectedDays.length>0?1:0)+(callTime?1:0)+(tone?1:0))/3*100;
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 flex items-center justify-center p-6"><div className="max-w-4xl w-full"><div className="mb-8 text-center"><div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-rose-200 shadow-sm mb-4"><div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></div><span className="text-sm font-bold text-slate-700">Version 2 • 카드형 레이아웃</span></div><div className="flex justify-center gap-2 mb-4">{[1, 2, 3, 4].map((num) => <div key={num} className={`h-2 w-16 rounded-full ${num <= 3 ? 'bg-gradient-to-r from-rose-600 to-pink-600' : 'bg-slate-200'}`}></div>)}</div><div className="flex items-center justify-center gap-4 mb-6"><SoriCharacter size={60} animated /><h1 className="text-3xl font-black text-slate-900">통화 시간을<br/>정해볼까요?</h1></div><p className="text-base font-medium text-slate-600">편한 시간을 알려주세요</p></div>
      <div className="p-10 rounded-3xl bg-white shadow-2xl border-2 border-rose-200 hover:border-rose-300 hover:shadow-rose-200/50 transition-all duration-300"><div className="space-y-6"><div><label className="block text-sm font-bold text-slate-700 mb-3">통화 요일</label><div className="flex gap-2">{days.map((day) => <button key={day} onClick={() => toggleDay(day)} className={`flex-1 h-12 rounded-xl font-bold text-sm transition-all duration-200 ${selectedDays.includes(day) ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg scale-[1.02]' : 'bg-slate-50 text-slate-600 border-2 border-slate-200 hover:bg-slate-100'}`}>{day}</button>)}</div></div>
        <div><label className="block text-sm font-bold text-slate-700 mb-2">통화 시간</label><input type="time" value={callTime} onChange={(e) => setCallTime(e.target.value)} className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all text-sm font-medium"/></div>
        <div><label className="block text-sm font-bold text-slate-700 mb-3">대화 톤</label><div className="grid grid-cols-3 gap-3">{tones.map((t) => <button key={t.id} onClick={() => setTone(t.id)} className={`h-12 rounded-xl font-bold text-sm transition-all duration-200 ${tone === t.id ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg scale-[1.02]' : 'bg-slate-50 text-slate-600 border-2 border-slate-200 hover:bg-slate-100'}`}>{t.label}</button>)}</div></div>
        <div className="pt-4"><div className={`h-1 rounded-full transition-all duration-500 bg-gradient-to-r from-rose-600 to-pink-600`} style={{width: `${progress}%`}}></div></div></div></div>
      <div className="flex gap-3 mt-8"><button onClick={() => router.push('/onboarding/chapter-2-v2')} className="h-14 px-8 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-all duration-200 active:scale-95">이전</button><button onClick={() => router.push('/onboarding/chapter-4-v2')} disabled={!isComplete} className={`flex-1 h-14 rounded-xl font-bold text-base transition-all duration-200 ${isComplete ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-40'}`}>{isComplete ? '마지막 단계 →' : '시간을 선택해주세요'}</button></div></div>
    </div>
  );
}
