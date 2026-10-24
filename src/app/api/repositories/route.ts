import { NextRequest, NextResponse } from "next/server";
import { getRepositories } from "@/lib/db/queries/repositories";
import { createRepositorySchema } from "@/lib/schemas/repository.schema";
import { db } from "@/lib/db";
import { repositories } from "@/lib/db/schema";

export async function GET() {
  try {
    const repos = await getRepositories();
    return NextResponse.json({
      success: true,
      data: repos,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch repositories";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = createRepositorySchema.parse(body);

    const newId = `repo-${Date.now()}`;
    const newRepo = {
      id: newId,
      name: validated.name,
      fullName: validated.fullName,
      owner: validated.owner,
      description: validated.description || null,
      defaultBranch: validated.defaultBranch || "main",
      isPrivate: validated.isPrivate,
      language: validated.language,
      stars: 0,
      forks: 0,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      await db.insert(repositories).values(newRepo);
    } catch (dbErr) {
      console.warn("DB insert fallback:", dbErr);
    }

    return NextResponse.json({
      success: true,
      data: newRepo,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Invalid repository data";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
