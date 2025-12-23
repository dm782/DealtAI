
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Target, 
  BarChart3, 
  MessageSquareQuote, 
  Plus, 
  Settings as SettingsIcon,
  TrendingUp,
  Clock
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import StatsView from './components/StatsView';
import AICoach from './components/AICoach';
import Settings from './components/Settings';
import CheckInModal from './components/CheckInModal';
import { CheckIn, DayFocus, Mood } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'stats' | 'coach' | 'settings'>('dashboard');
  const [logs, setLogs] = useState<CheckIn[]>([]);
  const [focus, setFocus] = useState<DayFocus | null>(null);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number>(new Date().getHours());
  const [editingLog, setEditingLog] = useState<CheckIn | undefined>(undefined);
  const [presets, setPresets] = useState<string[]>(['Работа', 'Встреча', 'Отдых', 'Обучение', 'Спорт', 'Чтение', 'Семья']);
  
  // PWA Install Prompt state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    const savedLogs = localStorage.getItem('zen_logs');
    const savedFocus = localStorage.getItem('zen_focus');
    const savedPresets = localStorage.getItem('zen_presets');
    
    if (savedLogs) setLogs(JSON.parse(savedLogs));
    if (savedFocus) setFocus(JSON.parse(savedFocus));
    if (savedPresets) setPresets(JSON.parse(savedPresets));

    if (!savedLogs) {
      const dummyLogs: CheckIn[] = [
        { id: '1', timestamp: Date.now() - 3600000 * 3, hour: 9, activity: 'Глубокая работа', mood: Mood.GOOD, productivity: 7, notes: 'Концентрация' },
        { id: '4', timestamp: Date.now() - 3600000 * 3, hour: 9, activity: 'Почта', mood: Mood.NEUTRAL, productivity: 3, notes: 'Разбор входящих' },
        { id: '2', timestamp: Date.now() - 3600000 * 2, hour: 10, activity: 'Встречи', mood: Mood.NEUTRAL, productivity: 6, notes: 'Немного устал' },
        { id: '3', timestamp: Date.now() - 3600000, hour: 11, activity: 'Планирование', mood: Mood.EXCELLENT, productivity: 9, notes: 'Состояние потока' }
      ];
      setLogs(dummyLogs);
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('zen_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('zen_focus', JSON.stringify(focus));
  }, [focus]);

  useEffect(() => {
    localStorage.setItem('zen_presets', JSON.stringify(presets));
  }, [presets]);

  const handleAddLog = (newLog: Omit<CheckIn, 'id' | 'timestamp'>) => {
    if (editingLog) {
      setLogs(prev => prev.map(l => l.id === editingLog.id ? { ...l, ...newLog } : l).sort((a, b) => a.hour - b.hour));
      setEditingLog(undefined);
    } else {
      const log: CheckIn = {
        ...newLog,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
      };
      setLogs(prev => [...prev, log].sort((a, b) => a.hour - b.hour));
    }
    
    if (newLog.activity && !presets.includes(newLog.activity)) {
      setPresets(prev => [...prev, newLog.activity]);
    }
    
    setShowCheckIn(false);
  };

  const handleDeleteLog = (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить эту запись?")) {
      setLogs(prev => prev.filter(l => l.id !== id));
    }
  };

  const handleEditLog = (log: CheckIn) => {
    setEditingLog(log);
    setSelectedHour(log.hour);
    setShowCheckIn(true);
  };

  const currentFocus = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    if (focus?.date === today) return focus;
    return null;
  }, [focus]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900 overflow-x-hidden">
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200 p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <Target size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">ZenControl</h1>
        </div>

        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <LayoutDashboard size={20} /> Панель
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'stats' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <BarChart3 size={20} /> Статистика
          </button>
          <button 
            onClick={() => setActiveTab('coach')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'coach' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <MessageSquareQuote size={20} /> ИИ Тренер
          </button>
        </nav>

        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all mt-auto ${activeTab === 'settings' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          <SettingsIcon size={20} /> Настройки
        </button>
      </aside>

      <main className="flex-1 p-4 md:p-10 pb-24 md:pb-10 overflow-y-auto w-full">
        <div className="max-w-5xl mx-auto">
          {activeTab === 'dashboard' && (
            <Dashboard 
              logs={logs} 
              focus={currentFocus} 
              setFocus={(f) => setFocus({ date: new Date().toISOString().split('T')[0], focus: f, startHour: focus?.startHour || 8 })}
              onCheckIn={(hour) => { setEditingLog(undefined); setSelectedHour(hour); setShowCheckIn(true); }}
              onEditLog={handleEditLog}
              onDeleteLog={handleDeleteLog}
            />
          )}
          {activeTab === 'stats' && <StatsView logs={logs} />}
          {activeTab === 'coach' && <AICoach logs={logs} focus={currentFocus} />}
          {activeTab === 'settings' && (
            <Settings 
              focus={focus} 
              setFocus={setFocus} 
              presets={presets} 
              setPresets={setPresets}
              logs={logs}
              setLogs={setLogs}
              installPrompt={deferredPrompt}
              onInstall={handleInstallClick}
            />
          )}
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 flex justify-around p-3 z-40 pb-safe">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <LayoutDashboard size={20} /> <span className="text-[10px]">Главная</span>
        </button>
        <button onClick={() => setActiveTab('stats')} className={`flex flex-col items-center gap-1 ${activeTab === 'stats' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <BarChart3 size={20} /> <span className="text-[10px]">Статистика</span>
        </button>
        <button onClick={() => { setEditingLog(undefined); setShowCheckIn(true); }} className="flex flex-col items-center -mt-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-200 ring-4 ring-white">
            <Plus size={24} />
          </div>
        </button>
        <button onClick={() => setActiveTab('coach')} className={`flex flex-col items-center gap-1 ${activeTab === 'coach' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <MessageSquareQuote size={20} /> <span className="text-[10px]">Тренер</span>
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 ${activeTab === 'settings' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <SettingsIcon size={20} /> <span className="text-[10px]">Настройки</span>
        </button>
      </nav>

      {showCheckIn && (
        <CheckInModal 
          hour={selectedHour} 
          existingLog={editingLog}
          logsInSameHour={logs.filter(l => l.hour === selectedHour)}
          presets={presets}
          onClose={() => { setShowCheckIn(false); setEditingLog(undefined); }} 
          onSubmit={handleAddLog} 
        />
      )}
    </div>
  );
};

export default App;
