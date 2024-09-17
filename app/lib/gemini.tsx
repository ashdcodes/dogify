import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env['NEXT_PUBLIC_GEMINI_API_KEY']);

export async function identifyDog(imageFile) {
  console.log('Entering identifyDog function');
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  console.log('Converting image file to GenerativePart');
  const imageData = await fileToGenerativePart(imageFile);

  const prompt = `Analyze this image and identify the dog breed. If a dog is present, provide the following information in JSON format:
  {
    "breed": "Dog breed name",
    "size": "Size category (e.g., small, medium, large)",
    "temperament": "Brief description of typical temperament",
    "lifeExpectancy": "Average life expectancy range",
    "exerciseNeeds": "Exercise requirements",
    "grooming": "Grooming needs"
  }
  If no dog is present in the image, respond with: { "error": "No dog detected in the image" }`;

  console.log('Generating content with Gemini API');
  try {
    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    const text = response.text();

    console.log('Raw response from Gemini API:', text);

    try {
      const parsedResponse = JSON.parse(text);
      console.log('Parsed response:', parsedResponse);
      return parsedResponse;
    } catch (error) {
      console.error('Error parsing JSON response:', error);
      console.log('Attempting to extract information from the response');
      const extractedInfo = extractInformation(text);
      return extractedInfo;
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error(`Failed to call Gemini API: ${error.message}`);
  }
}

function extractInformation(text) {
  const infoFields = ['breed', 'size', 'temperament', 'lifeExpectancy', 'exerciseNeeds', 'grooming'];
  const extractedInfo = {};

  infoFields.forEach(field => {
    const regex = new RegExp(`${field}:?\\s*(.+)`, 'i');
    const match = text.match(regex);
    if (match) {
      extractedInfo[field] = match[1].trim();
    }
  });

  console.log('Extracted information:', extractedInfo);
  return Object.keys(extractedInfo).length > 0 ? extractedInfo : { error: "Could not extract dog information from the response" };
}

async function fileToGenerativePart(file) {
  console.log('Converting file to base64');
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });

  const base64Data = await base64EncodedDataPromise;
  console.log('File converted to base64');

  return {
    inlineData: {
      data: base64Data,
      mimeType: file.type,
    },
  };
}