import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { disconnectInstallation } from "@/lib/github/installations";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();

    const result = await disconnectInstallation(id, user.id);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Installation disconnected from local workspace",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to disconnect installation";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
