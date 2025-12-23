
import React, { useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { CheckIn } from '../types';

interface StatsViewProps {
  logs: CheckIn[];
}

// Define interface for grouped hour data to avoid 'unknown' type errors during Object.values inference
interface GroupedHourData {
  hour: number;
  productivity: number;
  moods: number[];
}

const StatsView: React.FC<StatsViewProps> = ({ logs }) => {
  const chartData = useMemo(() => {
    // Group logs by hour and sum productivity
    const grouped = logs.reduce((acc, l) => {
      if (!acc[l.hour]) {
        acc[l.hour] = { hour: l.hour, productivity: 0, moods: [] };
      }
      acc[l.hour].productivity += l.productivity;
      acc[l.hour].moods.push(l.mood);
      return acc;
    }, {} as Record<number, GroupedHourData>);

    // Cast Object.values to GroupedHourData[] to fix "unknown" property access errors
    return (Object.values(grouped) as GroupedHourData[])
      .sort((a, b) => a.hour - b.hour)
      .map(g => ({
        hour: `${g.hour}:00`,
        productivity: Math.min(g.productivity, 10), // Cap at 10 for chart safety
        mood: g.moods.reduce((a, b) => a + b, 0) / g.moods.length // Average mood
      }));
  }, [logs]);

  const activityStats = useMemo(() => {
    const counts: Record<string, number> = {};
    logs.forEach(l => {
      counts[l.activity] = (counts[l.activity] || 0) + l.productivity;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [logs]);

  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-slate-400">
        <p>Начни делать записи, чтобы увидеть статистику!</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Твоя аналитика</h2>
        <p className="text-slate-500">Визуализация продуктивности и настроения (агрегировано за час).</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-lg mb-6 text-slate-800">Общая нагрузка за час</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis domain={[0, 10]} hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  labelFormatter={(value) => `Время: ${value}`}
                />
                <Area type="monotone" dataKey="productivity" name="Продуктивность" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorProd)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-lg mb-6 text-slate-800">Тренды самочувствия</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Line type="monotone" dataKey="mood" name="Среднее настроение" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b' }} />
                <Line type="monotone" dataKey="productivity" name="Суммарная нагрузка" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 col-span-full">
          <h3 className="font-bold text-lg mb-6 text-slate-800">Вес активностей (общий балл)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Bar dataKey="count" name="Сумма баллов" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsView;
