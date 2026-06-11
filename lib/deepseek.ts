import OpenAI from "openai";

console.log("=================================");
console.log("DEEPSEEK KEY FOUND:", !!process.env.DEEPSEEK_API_KEY);
console.log(
  "KEY PREFIX:",
  process.env.DEEPSEEK_API_KEY?.substring(0, 10)
);
console.log("=================================");

export const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});