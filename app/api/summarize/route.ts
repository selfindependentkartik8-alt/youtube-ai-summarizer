import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { fetchTranscript } from "youtube-transcript";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function extractVideoId(input: string) {
  try {
    const url = new URL(input);

    if (url.hostname === "youtu.be") {
      return url.pathname.slice(1);
    }

    if (
      url.hostname.includes("youtube.com") ||
      url.hostname.includes("youtube-nocookie.com")
    ) {
      return url.searchParams.get("v");
    }

    return null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const youtubeUrl = body?.youtubeUrl?.trim();

    if (!youtubeUrl) {
      return NextResponse.json(
        { error: "Please provide a YouTube URL." },
        { status: 400 }
      );
    }

    const videoId = extractVideoId(youtubeUrl);

    if (!videoId) {
      return NextResponse.json(
        { error: "Invalid YouTube URL." },
        { status: 400 }
      );
    }

    // Get YouTube transcript
    const transcript = await fetchTranscript(videoId);

    if (!transcript || transcript.length === 0) {
      return NextResponse.json(
        {
          error:
            "No transcript is available for this video. Please try another video.",
        },
        { status: 404 }
      );
    }

    const transcriptText = transcript
      .map((item) => item.text)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    if (!transcriptText) {
      return NextResponse.json(
        { error: "Could not extract usable transcript." },
        { status: 422 }
      );
    }

    // Keep extremely long transcripts manageable
    const maxCharacters = 100000;
    const trimmedTranscript = transcriptText.slice(0, maxCharacters);

    const prompt = `
You are an expert AI video summarizer.

Analyze the following YouTube transcript and create a high-quality, easy-to-read summary.

Return ONLY the summary. Do not mention that you are an AI.

Use this exact structure:

OVERVIEW
Write a concise 3-5 sentence overview.

KEY POINTS
- Important point
- Important point
- Important point
- Important point
- Important point

IMPORTANT DETAILS
Mention useful facts, explanations, examples, numbers, or concepts from the video.

ACTION ITEMS
- Practical takeaway or action
- Practical takeaway or action
- Practical takeaway or action

FINAL TAKEAWAY
Give the main lesson of the video in 2-3 sentences.

Rules:
- Do not invent information.
- Stay faithful to the transcript.
- Remove repetition and filler.
- Make the summary useful for students and professionals.
- Use clear language.
- Preserve important technical terms.
- If the transcript is incomplete, summarize only what is actually available.

TRANSCRIPT:
${trimmedTranscript}
`;

    // Gemini
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const summary = response.text?.trim();

    if (!summary) {
      throw new Error("Gemini returned an empty response.");
    }

    return NextResponse.json({
      summary,
      videoId,
      youtubeUrl,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    });
  } catch (error) {
    console.error("YouTube summarization error:", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while generating the summary. Please try another video.",
      },
      { status: 500 }
    );
  }
}