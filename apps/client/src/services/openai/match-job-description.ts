/* eslint-disable lingui/text-restrictions */

import { t } from "@lingui/macro";

import { DEFAULT_MAX_TOKENS, DEFAULT_MODEL } from "@/client/constants/llm";
import { useOpenAiStore } from "@/client/stores/openai";

import { openai } from "./client";

const PROMPT = `You are an expert resume writer.
Using the following job description, tailor the provided resume text so that it better matches the role.
Return the revised text in the same language as the input.
Job Description: """{description}"""
Resume Text: """{input}"""
Tailored Text: """`;

export const matchJobDescription = async (text: string, description: string) => {
  const prompt = PROMPT.replace("{input}", text).replace("{description}", description);

  const { model, maxTokens } = useOpenAiStore.getState();

  const result = await openai().chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: model ?? DEFAULT_MODEL,
    max_tokens: maxTokens ?? DEFAULT_MAX_TOKENS,
    temperature: 0.3,
    stop: ['"""'],
    n: 1,
  });

  if (result.choices.length === 0) {
    throw new Error(t`OpenAI did not return any choices for your text.`);
  }

  return result.choices[0].message.content ?? text;
};
