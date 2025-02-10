import { generateManimCode } from "./manim-generator";
import { getAIResponse } from "./ai";


export async function processManimRequest(userInput: string): Promise<string> {
    const aiResponse = await getAIResponse(userInput);
    const manimCode = generateManimCode(aiResponse);
    return manimCode;
}
