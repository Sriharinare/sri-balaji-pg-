import { GoogleGenAI } from "@google/genai";
import type { Booking } from '../types';

export async function getActivitySuggestions(booking: Booking): Promise<string> {
    if (!process.env.API_KEY) {
        throw new Error("API key for Gemini is not configured.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `You are a helpful travel assistant. I have booked a room at a PG (Paying Guest accommodation) in 'Bengaluru, India' from ${booking.checkIn} to ${booking.checkOut}. Please suggest 5 fun, budget-friendly activities suitable for a young professional or student living in Bengaluru. Format the response as a markdown list.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        return response.text;
    } catch (error) {
        console.error("Error fetching activity suggestions:", error);
        throw new Error("Failed to get suggestions from AI. Please try again later.");
    }
}