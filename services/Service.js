import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = "AIzaSyDaBsQyXA_qYaS0ee-gLmV8uidUIg-Rb6g"; // Replace with your actual API key
const MODEL_NAME = "gemini-1.5-pro";

export async function generateTravelPlan(formData) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const prompt = `
    As an AI travel planner, create a detailed itinerary for a trip with the following details:
    Traveler's Name: ${formData.name}
    Starting Location: ${formData.startingPlace}
    Destination: ${formData.destination}
    Duration: ${formData.duration} days
    Budget: ${formData.budget} INR
    Additional Requirements: ${formData.additionalRequirements}

    Please provide a day-by-day itinerary including:
    - Recommended attractions and activities
    - Suggested restaurants or local cuisine to try
    - Estimated costs for activities and meals
    - Travel tips specific to the destination
    - Any cultural customs or etiquette to be aware of
    
    Ensure the plan stays within the specified budget and accommodates any additional requirements mentioned.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}