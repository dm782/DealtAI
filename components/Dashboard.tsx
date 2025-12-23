
import React, { useState } from 'react';
import { CheckIn, DayFocus, Mood } from '../types';
import { Target, Clock, TrendingUp, Edit2, Trash2, PlusCircle, Plus } from 'lucide-react';

interface DashboardProps {
  logs: CheckIn[];
  focus: DayFocus | null;
  setFocus: (f: string) => void;
  onCheckIn: (hour: number) => void;
  onEditLog: (log: CheckIn) => void;
  onDeleteLog: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ logs, focus, setFocus, onCheckIn, onEditLog, onDeleteLog }) => {
  const [focusInput, setFocusInput] = useState(focus?.focus || '');
  const startHour = focus?.startHour || 8;
  const currentHour = new Date().getHours();
  
  const hours = Array.from({ length: 16 }, (_, i) => startHour + i).filter(h => h < 24);

  const getMoodEmoji = (mood: Mood) => {
    switch (mood) {
      case Mood.AWFUL: return '😫';
      case Mood.BAD: return '🙁';
      case Mood.NEUTRAL: return '😐';
      case Mood.GOOD: return '🙂';
      case Mood.EXCELLENT: return '🤩';
    }
  };

  const getProductivityColor = (score: number) => {
    if (score >= 8) return 'bg-emerald-500';
    if (score >= 5) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const avgProductivity = logs.length > 0 
    ? (logs.reduce((acc, l) => acc + l.productivity, 0) / logs.length).toFixed(1)
    : '0';

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">С возвращением!</h2>
        <p className="text-slate-500">Управляй своим днем шаг за шагом.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 text-indigo-600 mb-3 font-semibold text-sm uppercase tracking-wider">
            <Target size={18} /> Фокус дня
          </div>
          <input 
            type="text"
            placeholder="Какая главная цель сегодня?"
            value={focusInput}
            onChange={(e) => setFocusInput(e.target.value)}
            onBlur={() => setFocus(focusInput)}
            className="text-xl font-medium w-full bg-transparent border-b-2 border-transparent focus:border-indigo-500 outline-none pb-1 transition-all"
          />
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 text-emerald-600 mb-3 font-semibold text-sm uppercase tracking-wider">
            <TrendingUp size={18} /> Ср. Продуктивность
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{avgProductivity}</span>
            <span className="text-slate-400">/ 10</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 text-amber-600 mb-3 font-semibold text-sm uppercase tracking-wider">
            <Clock size={18} /> Записи за сегодня
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{logs.length}</span>
            <span className="text-slate-400">отметок</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Clock className="text-indigo-500" size={20} /> График дня
          </h3>
          <span className="text-xs font-medium text-slate-400 uppercase">Начало в {startHour}:00</span>
        </div>
        
        <div className="divide-y divide-slate-100">
          {hours.map((hour) => {
            const hourLogs = logs.filter(l => l.hour === hour);
            const totalHourProd = hourLogs.reduce((acc, l) => acc + l.productivity, 0);
            const isFuture = hour > currentHour;
            const isCurrent = hour === currentHour;

            return (
              <div 
                key={hour} 
                className={`flex items-start gap-4 p-4 transition-all hover:bg-slate-50 ${isCurrent ? 'bg-indigo-50/30' : ''}`}
              >
                <div className={`w-14 pt-1 text-sm font-bold ${isCurrent ? 'text-indigo-600' : 'text-slate-400'}`}>
                  {hour}:00
                </div>

                <div className="flex-1 space-y-3">
                  {hourLogs.length > 0 ? (
                    <>
                      {hourLogs.map((log) => (
                        <div key={log.id} className="flex flex-col md:flex-row md:items-center justify-between gap-2 group/item">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{getMoodEmoji(log.mood)}</span>
                            <div>
                              <p className="font-semibold text-slate-800 leading-none">{log.activity}</p>
                              {log.notes && <p className="text-[11px] text-slate-500 mt-1">{log.notes}</p>}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col items-end">
                              <div className={`h-1.5 w-12 rounded-full bg-slate-200 overflow-hidden`}>
                                <div 
                                  className={`h-full ${getProductivityColor(log.productivity)}`} 
                                  style={{ width: `${log.productivity * 10}%` }}
                                />
                              </div>
                              <span className="text-[9px] font-bold text-slate-400 mt-0.5">{log.productivity}</span>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                              <button 
                                onClick={() => onEditLog(log)}
                                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                title="Редактировать"
                              >
                                <Edit2 size={12} />
                              </button>
                              <button 
                                onClick={() => onDeleteLog(log.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                title="Удалить"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {totalHourProd < 10 && !isFuture && (
                        <button 
                          onClick={() => onCheckIn(hour)}
                          className="flex items-center gap-2 text-[11px] font-semibold text-indigo-500 hover:text-indigo-700 transition-colors pt-1"
                        >
                          <Plus size={12} /> Добавить активность ({10 - totalHourProd} ост.)
                        </button>
                      )}
                    </>
                  ) : (
                    <button 
                      onClick={() => !isFuture && onCheckIn(hour)}
                      disabled={isFuture}
                      className={`group flex items-center gap-2 text-sm italic transition-all ${isFuture ? 'text-slate-300 cursor-not-allowed' : 'text-slate-400 hover:text-indigo-600 cursor-pointer'}`}
                    >
                      {isFuture ? 'Скоро...' : (
                        <>
                          <PlusCircle size={16} className="opacity-0 group-hover:opacity-100" />
                          <span>Нажми, чтобы отметить прогресс</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
