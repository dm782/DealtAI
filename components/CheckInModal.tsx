
import React, { useState, useMemo } from 'react';
import { Mood, CheckIn } from '../types';
import { X, Check, Plus, AlertTriangle } from 'lucide-react';

interface CheckInModalProps {
  hour: number;
  existingLog?: CheckIn;
  logsInSameHour: CheckIn[];
  presets: string[];
  onClose: () => void;
  onSubmit: (log: Omit<CheckIn, 'id' | 'timestamp'>) => void;
}

const CheckInModal: React.FC<CheckInModalProps> = ({ hour, existingLog, logsInSameHour, presets, onClose, onSubmit }) => {
  const [activity, setActivity] = useState(existingLog?.activity || '');
  const [mood, setMood] = useState<Mood>(existingLog?.mood || Mood.NEUTRAL);
  
  // Calculate how much productivity is already taken (excluding current editing log)
  const usedProductivity = useMemo(() => {
    return logsInSameHour
      .filter(l => l.id !== existingLog?.id)
      .reduce((acc, l) => acc + l.productivity, 0);
  }, [logsInSameHour, existingLog]);

  const maxAllowed = 10 - usedProductivity;

  const [productivity, setProductivity] = useState(existingLog?.productivity || Math.min(5, maxAllowed));
  const [notes, setNotes] = useState(existingLog?.notes || '');
  const [newPreset, setNewPreset] = useState('');
  const [showAddPreset, setShowAddPreset] = useState(false);

  // If maxAllowed changed and current productivity exceeds it
  if (productivity > maxAllowed) {
    setProductivity(maxAllowed);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity) return;
    if (productivity <= 0) return;
    onSubmit({ hour, activity, mood, productivity, notes });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8">
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">{existingLog ? 'Редактирование' : 'Новое занятие'}</h3>
            <p className="text-sm text-slate-500">Время: {hour}:00 | Доступно баллов: <span className="font-bold text-indigo-600">{maxAllowed}</span></p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {maxAllowed <= 0 && !existingLog ? (
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex gap-3 text-rose-700">
              <AlertTriangle className="shrink-0" />
              <p className="text-sm">Лимит продуктивности на этот час (10 баллов) исчерпан. Удалите что-то, чтобы добавить новое.</p>
            </div>
          ) : (
            <>
              <section>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Основное занятие</label>
                <input 
                  autoFocus
                  type="text"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  placeholder="Глубокая работа, звонок, обед..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
                
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {presets.slice(0, 8).map(act => (
                      <button
                        key={act}
                        type="button"
                        onClick={() => setActivity(act)}
                        className={`text-xs px-3 py-1.5 rounded-full transition-colors ${activity === act ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-700'}`}
                      >
                        {act}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setShowAddPreset(!showAddPreset)}
                      className="text-xs px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 flex items-center gap-1"
                    >
                      <Plus size={12} /> Свой пресет
                    </button>
                  </div>
                  
                  {showAddPreset && (
                    <div className="mt-2 flex gap-2 animate-in zoom-in-95 duration-200">
                      <input 
                        type="text"
                        value={newPreset}
                        onChange={(e) => setNewPreset(e.target.value)}
                        placeholder="Название пресета"
                        className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-slate-200 outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <button 
                        type="button"
                        onClick={() => {
                          if (newPreset && !presets.includes(newPreset)) {
                            setActivity(newPreset);
                            setNewPreset('');
                            setShowAddPreset(false);
                          }
                        }}
                        className="bg-indigo-600 text-white p-1.5 rounded-lg"
                      >
                        <Check size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </section>

              <section>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Настроение</label>
                <div className="grid grid-cols-5 gap-2">
                  {[Mood.AWFUL, Mood.BAD, Mood.NEUTRAL, Mood.GOOD, Mood.EXCELLENT].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMood(m)}
                      className={`py-3 rounded-xl text-2xl border-2 transition-all ${mood === m ? 'border-indigo-500 bg-indigo-50 shadow-sm' : 'border-slate-100 bg-slate-50 hover:bg-white'}`}
                    >
                      {m === Mood.AWFUL ? '😫' : m === Mood.BAD ? '🙁' : m === Mood.NEUTRAL ? '😐' : m === Mood.GOOD ? '🙂' : '🤩'}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-700">Вес активности (балл)</label>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold text-indigo-600">{productivity}</span>
                    <span className="text-slate-400 text-xs mt-1">/ {maxAllowed}</span>
                  </div>
                </div>
                <input 
                  type="range"
                  min="1"
                  max={maxAllowed}
                  step="1"
                  value={productivity}
                  onChange={(e) => setProductivity(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:opacity-30"
                />
                <p className="text-[10px] text-slate-400 mt-2">Чем выше балл, тем больше времени и сил заняла активность.</p>
              </section>

              <section>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Заметки</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Детали..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none h-20 resize-none transition-all text-sm"
                />
              </section>

              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
              >
                <Check size={20} /> {existingLog ? 'Обновить данные' : 'Сохранить запись'}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckInModal;
