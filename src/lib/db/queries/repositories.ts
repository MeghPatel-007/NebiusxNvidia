import { db } from "../index";
import { repositories } from "../schema";
import { desc, eq } from "drizzle-orm";
import { Repository } from "@/types/repository";

export const initialSampleRepositories: Repository[] = [
  {
    id: "repo-1",
    name: "prime-marketplace-3.0",
    fullName: "Vektora / prime-marketplace-3.0",
    owner: "Vektora",
    description: "Prime marketplaces is a Web 3.0 decentralized commerce protocol.",
    defaultBranch: "main",
    isPrivate: true,
    language: "TypeScript",
    stars: 342,
    forks: 48,
    status: "active",
    createdAt: new Date("2026-01-10"),
    updatedAt: new Date("2026-10-24"),
    activeRunsCount: 3,
  },
  {
    id: "repo-2",
    name: "wesign-organization",
    fullName: "Vektora / wesign-organization",
    owner: "Vektora",
    description: "Multi-sig signature verification and cryptographic access controller.",
    defaultBranch: "main",
    isPrivate: true,
    language: "Rust",
    stars: 189,
    forks: 22,
    status: "active",
    createdAt: new Date("2026-02-14"),
    updatedAt: new Date("2026-10-23"),
    activeRunsCount: 1,
  },
  {
    id: "repo-3",
    name: "auth-middleware-service",
    fullName: "Odama / Company-Site",
    owner: "Odama",
    description: "Enterprise single-sign-on and edge token verification service.",
    defaultBranch: "main",
    isPrivate: false,
    language: "Go",
    stars: 520,
    forks: 91,
    status: "active",
    createdAt: new Date("2026-03-01"),
    updatedAt: new Date("2026-10-22"),
    activeRunsCount: 0,
  },
  {
    id: "repo-4",
    name: "mobile-wallet-app",
    fullName: "Maryuandi / Mobile-App",
    owner: "Maryuandi",
    description: "Cross-platform mobile payment and wallet client.",
    defaultBranch: "develop",
    isPrivate: true,
    language: "React Native",
    stars: 87,
    forks: 14,
    status: "active",
    createdAt: new Date("2026-04-12"),
    updatedAt: new Date("2026-10-20"),
    activeRunsCount: 2,
  },
];

export async function getRepositories(): Promise<Repository[]> {
  if (process.env.NEXT_PHASE === "phase-production-build" || !process.env.DATABASE_URL) {
    return initialSampleRepositories;
  }
  try {
    const rows = await db.select().from(repositories).orderBy(desc(repositories.updatedAt));
    if (rows && rows.length > 0) {
      return rows.map((r) => ({
        ...r,
        status: (r.status as Repository["status"]) || "active",
      }));
    }
  } catch (err) {
    console.warn("DB fetch repositories fallback:", err);
  }
  return initialSampleRepositories;
}

export async function getRepositoryById(id: string): Promise<Repository | null> {
  if (process.env.NEXT_PHASE === "phase-production-build" || !process.env.DATABASE_URL) {
    return initialSampleRepositories.find((r) => r.id === id) || null;
  }
  try {
    const [row] = await db.select().from(repositories).where(eq(repositories.id, id));
    if (row) {
      return {
        ...row,
        status: (row.status as Repository["status"]) || "active",
      };
    }
  } catch (err) {
    console.warn("DB fetch repository by id fallback:", err);
  }
  return initialSampleRepositories.find((r) => r.id === id) || null;
}
