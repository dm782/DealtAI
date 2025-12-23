
import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Loader2, RefreshCcw, Target, AlertCircle, ExternalLink } from 'lucide-react';
import { getAICoachAdvice } from '../services/geminiService';
import { CheckIn, DayFocus } from '../types';

interface AICoachProps {
  logs: CheckIn[];
  focus: DayFocus | null;
}

const AICoach: React.FC<AICoachProps> = ({ logs, focus }) => {
  const [advice, setAdvice] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isKeyMissing, setIsKeyMissing] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    const result = await getAICoachAdvice(logs, focus);
    if (result.includes("API ключ не найден")) {
      setIsKeyMissing(true);
    } else {
      setIsKeyMissing(false);
    }
    setAdvice(result);
    setLoading(false);
  };

  useEffect(() => {
    if (logs.length > 0 && !advice) {
      fetchAdvice();
    }
  }, []);

  return (
    <div className="animate-in fade-in duration-700">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Brain className="text-indigo-600" /> ИИ Тренер
        </h2>
        <p className="text-slate-500">Интеллектуальный анализ твоей продуктивности.</p>
      </header>

      <div className="relative">
        <div className={`rounded-3xl p-8 text-white shadow-xl overflow-hidden transition-colors duration-500 ${isKeyMissing ? 'bg-slate-800' : 'bg-indigo-600'}`}>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              {isKeyMissing ? <AlertCircle size={20} className="text-rose-400" /> : <Sparkles size={24} className="text-amber-300 fill-amber-300" />}
              <span className="font-bold tracking-widest text-xs uppercase opacity-80">
                {isKeyMissing ? 'Требуется настройка' : 'Персональный разбор'}
              </span>
            </div>

            <div className="min-h-[150px] flex items-center justify-center">
              {loading ? (
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="animate-spin" size={40} />
                  <p className="text-indigo-100 animate-pulse">Связываюсь с нейросетью...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-xl md:text-2xl font-medium leading-relaxed italic">
                    {advice || "Добавь хотя бы одну запись за сегодня!"}
                  </div>
                  
                  {isKeyMissing && (
                    <div className="bg-white/10 p-4 rounded-2xl text-sm not-italic border border-white/10">
                      <p className="mb-2">Чтобы ИИ заработал на вашем сайте:</p>
                      <ol className="list-decimal list-inside space-y-1 opacity-80">
                        <li>Получите ключ на <a href="https://aistudio.google.com/app/apikey" target="_blank" className="underline font-bold">ai.google.dev</a></li>
                        <li>В настройках Vercel добавьте <b>API_KEY</b></li>
                        <li>Сделайте <b>Redeploy</b></li>
                      </ol>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex justify-between items-center">
              <p className="text-sm opacity-60">ZenControl Intelligence</p>
              <button 
                disabled={loading}
                onClick={fetchAdvice}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all disabled:opacity-50"
              >
                <RefreshCcw size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoach;
