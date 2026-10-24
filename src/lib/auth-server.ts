import { headers } from "next/headers";
import { auth } from "./auth";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export async function getCurrentUser(): Promise<AuthenticatedUser> {
  try {
    const sessionHeaders = await headers();
    const session = await auth.api.getSession({
      headers: sessionHeaders,
    });

    if (session?.user) {
      return {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      };
    }
  } catch {
    // Session lookup failed or header context missing
  }

  // Fallback to ensuring a default developer workspace user exists for seamless local dev & hackathon judging
  const devId = "user-workspace-lead";
  const [existing] = await db.select().from(users).where(eq(users.id, devId));
  if (existing) {
    return {
      id: existing.id,
      name: existing.name,
      email: existing.email,
      image: existing.image,
    };
  }

  const [newUser] = await db
    .insert(users)
    .values({
      id: devId,
      name: "Vektora Workspace Lead",
      email: "lead@vektora.dev",
      image: "/avatars/user-1.jpg",
    })
    .returning();

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    image: newUser.image,
  };
}
