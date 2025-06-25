import { serve, $ } from "bun";
import { rm } from "node:fs/promises";

const port = 3000;

serve({
  port: port,
  routes: {
    "/analyze/:user/:repo": async (req) => {
      const { user, repo } = req.params;
      try {
        console.log(`Trying to analyze ${user}/${repo}`);
        await $`wget https://github.com/${user}/${repo}/archive/master.zip`;
        const clocData = await $`cloc --json master.zip `.text();
        await rm("./master.zip", { recursive: true, force: true });

        return new Response(
          JSON.stringify({
            clocData,
            repository: `${user}/${repo}`,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:5173",
              "Access-Control-Allow-Methods": "POST",
              "Access-Control-Allow-Headers": "Content-Type",
            },
          },
        );
      } catch (error: unknown) {
        try {
          await rm("./master.zip", { force: true });
        } catch {
          console.error("Failed to remove master.zip");
        }

        return new Response(
          JSON.stringify({
            error: `Failed to analyze ${user}/${repo}: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
    },
  },
});

console.log(`Listening on http://localhost:${port} ...`);
console.log("Make sure you have 'cloc' and 'wget' installed:");
console.log("- Ubuntu/Debian: sudo apt install cloc wget");
