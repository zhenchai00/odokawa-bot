require('dotenv').config();

const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// This function will run the Gemini Pro model
async function runGeminiProText (prompt) {
    console.log("start runGeminiProText prompt: ", prompt);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log("end runGeminiProText text");
    return text;
}

function splitResponse (response) {
    const maxChunkLength = 2000;
    let chunks = [];
    for (let i = 0; i < response.length; i += maxChunkLength) {
        chunks.push(response.substring(i, i + maxChunkLength));
    }
    return chunks;
}

function fileToGenerativePart (path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString('base64'),
            mimeType
        }
    };
}

async function runGeminiVision (prompt, path, mimeType) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = "";

    const imageParts = [
        fileToGenerativePart(path, mimeType),
    ];

    const result = await model.generateContent(prompt, ...imageParts);
    const response = result.response;
    const text = response.text();
    return text;
}

module.exports = { runGeminiProText, splitResponse, runGeminiVision };