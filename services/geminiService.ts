
import { GoogleGenAI } from "@google/genai";
import { CheckIn, DayFocus } from "../types";

export const getAICoachAdvice = async (logs: CheckIn[], focus: DayFocus | null): Promise<string> => {
  // Пытаемся взять ключ из переменных окружения (Vercel) или из локального хранилища (GitHub Pages)
  const apiKey = process.env.API_KEY || localStorage.getItem('zen_api_key');

  if (!apiKey || apiKey === "undefined" || apiKey.length < 5) {
    return "⚠️ API ключ не настроен. Перейдите в Настройки и вставьте свой ключ Google Gemini, чтобы тренер заработал.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const logSummary = logs.map(l => 
    `Час ${l.hour}:00 - Занятие: ${l.activity}, Настроение: ${l.mood}, Продуктивность: ${l.productivity}/10`
  ).join('\n');

  const prompt = `
    Действуй как тренер по личной эффективности. 
    Проанализируй записи и дай короткий (до 100 слов), мотивирующий и очень конкретный отзыв на РУССКОМ.
    
    Фокус дня: ${focus?.focus || "Не задан"}
    
    Логи за сегодня:
    ${logSummary || "Записей пока нет."}
    
    Дай один практический совет на основе этих данных.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Продолжай в том же духе! Отличный темп.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ошибка ИИ: Проверьте правильность ключа в Настройках или лимиты API.";
  }
};
