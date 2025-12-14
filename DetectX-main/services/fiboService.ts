import { BASE_SYSTEM_PROMPT } from '../constants';
import { FacialAttributes } from '../types';

// Helper to convert blob to base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * Generates the initial forensic sketch using Pollinations AI.
 * No API key required.
 */
export const generateInitialSketch = async (
  attributes: FacialAttributes, 
  description: string
): Promise<string> => {
  try {
    // Construct a highly detailed prompt for Pollinations
    let prompt = `${BASE_SYSTEM_PROMPT} `;
    
    // Add structured attributes if present
    if (attributes.gender) prompt += `Gender: ${attributes.gender}. `;
    if (attributes.ageRange) prompt += `Age: ${attributes.ageRange}. `;
    
    // Add main description
    prompt += `Witness Description: ${description}. `;
    
    // Enforce Style
    prompt += `Style: forensic pencil sketch, black and white graphite, high contrast, rough paper texture, mugshot, neutral expression, white background.`;

    // Generate random seed for variations
    const seed = Math.floor(Math.random() * 1000000);
    const encodedPrompt = encodeURIComponent(prompt);
    
    // Use 'flux' model for high quality adherence to prompt
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${seed}&model=flux`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Pollinations API Error: ${response.statusText}`);
    }

    const blob = await response.blob();
    return await blobToBase64(blob);
  } catch (error) {
    console.error("Initial Sketch Error:", error);
    throw error;
  }
};

/**
 * Refines an existing sketch.
 * Since Pollinations URL API is Text-to-Image, we generate a new version 
 * with the instruction emphasized in the prompt context.
 */
export const refineSketch = async (currentImageBase64: string, instruction: string): Promise<string> => {
  try {
    // Construct a prompt that emphasizes the correction
    const prompt = `${BASE_SYSTEM_PROMPT} Modify the subject based on this specific correction: ${instruction}. The rest of the face should remain consistent with a typical forensic sketch. Style: forensic pencil sketch, black and white graphite, high contrast, mugshot.`;

    const seed = Math.floor(Math.random() * 1000000);
    const encodedPrompt = encodeURIComponent(prompt);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${seed}&model=flux`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Pollinations API Error: ${response.statusText}`);
    }

    const blob = await response.blob();
    return await blobToBase64(blob);
  } catch (error) {
    console.error("Refinement Error:", error);
    throw error;
  }
};