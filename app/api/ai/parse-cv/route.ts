import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { cvParser } from "@/lib/ai/cv-parser";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { cvText } = body;

    if (!cvText || cvText.trim().length < 50) {
      return NextResponse.json(
        { error: "CV text is too short or empty" },
        { status: 400 }
      );
    }

    // Parse CV
    const parsedData = await cvParser.parseCV(cvText);

    // Generate enhanced content
    const [bio, headline, enhancedProjects] = await Promise.all([
      cvParser.generateBioFromCV(parsedData),
      cvParser.generateHeadlineFromCV(parsedData),
      cvParser.enhanceProjects(parsedData.projects),
    ]);

    // Return complete portfolio data
    return NextResponse.json({
      parsed: parsedData,
      generated: {
        bio,
        headline,
        enhancedProjects,
      },
    });
  } catch (error: any) {
    console.error("Parse CV error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to parse CV" },
      { status: 500 }
    );
  }
}
