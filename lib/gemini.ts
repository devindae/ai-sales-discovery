import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("=================================");
console.log("GEMINI KEY FOUND:", !!process.env.GEMINI_API_KEY);
console.log(
  "KEY PREFIX:",
  process.env.GEMINI_API_KEY?.substring(0, 10)
);
console.log("=================================");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

export const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});