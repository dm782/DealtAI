
import React, { useRef, useState, useEffect } from 'react';
import { DayFocus, CheckIn } from '../types';
import { 
  Clock, 
  ShieldCheck, 
  Tag, 
  X, 
  Download, 
  Upload, 
  Smartphone, 
  DownloadCloud, 
  Globe, 
  Key, 
  Eye, 
  EyeOff,
  Github,
  ExternalLink
} from 'lucide-react';

interface SettingsProps {
  focus: DayFocus | null;
  setFocus: (f: DayFocus) => void;
  presets: string[];
  setPresets: (p: string[]) => void;
  logs: CheckIn[];
  setLogs: (l: CheckIn[]) => void;
  installPrompt: any;
  onInstall: () => void;
}

const Settings: React.FC<SettingsProps> = ({ focus, setFocus, presets, setPresets, logs, setLogs, installPrompt, onInstall }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [apiKey, setApiKey] = useState(localStorage.getItem('zen_api_key') || '');
  const [showKey, setShowKey] = useState(false);

  const saveApiKey = (val: string) => {
    setApiKey(val);
    localStorage.setItem('zen_api_key', val);
  };

  const handleStartHourChange = (hour: number) => {
    setFocus({
      date: focus?.date || new Date().toISOString().split('T')[0],
      focus: focus?.focus || '',
      startHour: hour
    });
  };

  const removePreset = (preset: string) => {
    if (window.confirm(`Вы уверены, что хотите удалить категорию "${preset}"?`)) {
      setPresets(presets.filter(p => p !== preset));
    }
  };

  const exportData = () => {
    const data = { logs, focus, presets, version: '1.0' };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zencontrol_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.logs) setLogs(data.logs);
        if (data.focus) setFocus(data.focus);
        if (data.presets) setPresets(data.presets);
        alert("Данные импортированы!");
      } catch (err) {
        alert("Ошибка в файле бэкапа.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="animate-in fade-in duration-700 pb-10">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Настройки</h2>
        <p className="text-slate-500">Управление ключами, данными и деплоем.</p>
      </header>

      <div className="space-y-6">
        {/* API Key Management */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-amber-50 p-3 rounded-2xl text-amber-600">
              <Key size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Ключ ИИ (Gemini API)</h3>
              <p className="text-sm text-slate-500">Необходим для работы вкладки "ИИ Тренер"</p>
            </div>
          </div>
          
          <div className="relative">
            <input 
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => saveApiKey(e.target.value)}
              placeholder="Вставьте ваш API Key..."
              className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 transition-all font-mono text-sm"
            />
            <button 
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p className="mt-3 text-[11px] text-slate-400">
            Ключ хранится только в вашем браузере. Получить бесплатно: <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-indigo-500 underline">Google AI Studio</a>
          </p>
        </div>

        {/* GitHub Pages Guide */}
        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-lg overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Github size={120} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white/10 p-2 rounded-xl text-white">
                <Globe size={24} />
              </div>
              <h3 className="font-bold text-lg">Запуск на GitHub Pages</h3>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 font-bold">1</div>
                <p>Создай новый репозиторий на <b>GitHub</b> (например, <code className="bg-white/10 px-1 rounded">zencontrol</code>).</p>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 font-bold">2</div>
                <p>Загрузи все скачанные файлы прямо в корень репозитория.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 font-bold">3</div>
                <p>Перейди в <b>Settings</b> -> <b>Pages</b>. В разделе "Branch" выбери <b>main</b> и нажми <b>Save</b>.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 font-bold">4</div>
                <p>Через минуту твой сайт будет доступен по ссылке <code className="bg-white/10 px-1 rounded">username.github.io/zencontrol/</code></p>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <a 
                href="https://github.com/new" 
                target="_blank" 
                className="bg-white text-slate-900 px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-slate-100 transition-all"
              >
                Создать репозиторий <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Install Guide */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-xl">
                <Smartphone size={24} />
              </div>
              <h3 className="font-bold text-lg">Как установить на телефон</h3>
            </div>
            {installPrompt && (
               <button onClick={onInstall} className="bg-white text-indigo-600 px-4 py-2 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all">
                 Установить
               </button>
            )}
          </div>
          <div className="space-y-2 text-sm opacity-90">
            <p>1. Открой ссылку GitHub Pages в Safari (iOS) или Chrome (Android).</p>
            <p>2. Нажми «Поделиться» или меню «Три точки».</p>
            <p>3. Выбери <b>«На экран Домой»</b>.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Start Hour */}
          <div className="p-6 border-b border-slate-50">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
                <Clock size={24} />
              </div>
              <h3 className="font-bold text-lg">Начало дня</h3>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {[5, 6, 7, 8, 9, 10, 11, 12].map(h => (
                <button
                  key={h}
                  onClick={() => handleStartHourChange(h)}
                  className={`py-2 rounded-xl border-2 font-bold text-sm ${focus?.startHour === h ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 text-slate-400'}`}
                >
                  {h}:00
                </button>
              ))}
            </div>
          </div>

          {/* Backup */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-600">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-lg">Резервное копирование</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={exportData} className="flex-1 flex items-center justify-center gap-2 bg-slate-100 py-3 rounded-xl font-bold"><Download size={18} /> Скачать JSON</button>
              <button onClick={() => fileInputRef.current?.click()} className="flex-1 flex items-center justify-center gap-2 bg-slate-100 py-3 rounded-xl font-bold"><Upload size={18} /> Загрузить JSON</button>
              <input type="file" ref={fileInputRef} onChange={importData} accept=".json" className="hidden" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
