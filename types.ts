
export enum Mood {
  AWFUL = 1,
  BAD = 2,
  NEUTRAL = 3,
  GOOD = 4,
  EXCELLENT = 5
}

export interface CheckIn {
  id: string;
  timestamp: number;
  hour: number;
  activity: string;
  mood: Mood;
  productivity: number; // 1-10
  notes: string;
}

export interface DayFocus {
  date: string; // YYYY-MM-DD
  focus: string;
  startHour: number;
}

export interface UserStats {
  dailyCheckins: CheckIn[];
  historicalFocus: DayFocus[];
}
