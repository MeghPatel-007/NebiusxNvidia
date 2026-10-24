import "dotenv/config";
import { db } from "./index";
import { repositories, agentRuns, agentEvents } from "./schema";
import { initialSampleRepositories } from "./queries/repositories";
import { initialSampleRuns, initialSampleEvents } from "./queries/agent-runs";

export async function seedDatabase() {
  console.log("Seeding database...");

  // 1. Seed Repositories
  for (const repo of initialSampleRepositories) {
    await db
      .insert(repositories)
      .values({
        id: repo.id,
        name: repo.name,
        fullName: repo.fullName,
        owner: repo.owner,
        description: repo.description,
        defaultBranch: repo.defaultBranch,
        isPrivate: repo.isPrivate,
        language: repo.language,
        stars: repo.stars,
        forks: repo.forks,
        status: repo.status,
        createdAt: new Date(repo.createdAt),
        updatedAt: new Date(repo.updatedAt),
      })
      .onConflictDoNothing();
  }
  console.log(`✓ Inserted ${initialSampleRepositories.length} repositories`);

  // 2. Seed Agent Runs
  for (const run of initialSampleRuns) {
    await db
      .insert(agentRuns)
      .values({
        id: run.id,
        repoId: run.repoId,
        title: run.title,
        issueDescription: run.issueDescription,
        branch: run.branch,
        status: run.status,
        verificationStatus: run.verificationStatus,
        durationMs: run.durationMs,
        patchDiff: run.patchDiff,
        testCommand: run.testCommand,
        testStdout: run.testStdout,
        testStderr: run.testStderr,
        testExitCode: run.testExitCode,
        findings: run.findings,
        commitSha: run.commitSha,
        modelUsed: run.modelUsed,
        createdAt: new Date(run.createdAt),
        completedAt: run.completedAt ? new Date(run.completedAt) : null,
      })
      .onConflictDoNothing();
  }
  console.log(`✓ Inserted ${initialSampleRuns.length} agent runs`);

  // 3. Seed Agent Events
  for (const event of initialSampleEvents) {
    await db
      .insert(agentEvents)
      .values({
        id: event.id,
        runId: event.runId,
        type: event.type,
        message: event.message,
        actor: event.actor,
        actorAvatar: event.actorAvatar,
        details: event.details || {},
        createdAt: new Date(event.createdAt),
      })
      .onConflictDoNothing();
  }
  console.log(`✓ Inserted ${initialSampleEvents.length} agent events`);

  console.log("Database seeded successfully!");
}

if (require.main === module || process.argv[1]?.endsWith("seed.ts")) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Seeding failed:", err);
      process.exit(1);
    });
}
