import { GithubIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="max-w-xl mx-auto py-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          BunGitLoc
        </span>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button size="icon" variant="outline" asChild>
            <a
              href="https://github.com/costidotdev/bungitloc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
