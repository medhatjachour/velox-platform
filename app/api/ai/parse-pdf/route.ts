import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/get-current-user";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: "File must be a PDF" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    try {
      // Import pdfjs and configure worker BEFORE importing pdf-parse
      const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
      const path = await import('path');
      
      // Set absolute path to worker file for Node.js environment
      const workerPath = path.join(process.cwd(), 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs');
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerPath;
      
      // Now import pdf-parse
      const pdfParse = await import('pdf-parse');
      const { PDFParse } = pdfParse;
      
      // Create parser with PDF buffer
      const parser = new PDFParse({ 
        data: buffer,
        verbosity: 0  // Suppress console warnings
      });
      
      const result = await parser.getText();
      
      if (!result.text || result.text.trim().length === 0) {
        return NextResponse.json(
          { error: "No text content found in PDF. The PDF might be image-based or encrypted." },
          { status: 400 }
        );
      }
      
      return NextResponse.json({
        text: result.text.trim(),
        pages: result.total,
        info: {},
      });
    } catch (parseError) {
      console.error('PDF parsing error:', parseError);
      const errorMessage = parseError instanceof Error ? parseError.message : 'Unknown error';
      
      return NextResponse.json(
        { 
          error: `Failed to parse PDF: ${errorMessage}. The file might be corrupted, encrypted, or image-based.`,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Parse PDF error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to parse PDF";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
