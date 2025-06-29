import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Header from "./components/header";
import { ClocTable } from "./components/cloc-table";

export default function App() {
  const [githubUrl, setGithubUrl] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeRepo = async () => {
    setLoading(true);
    setResult(null);
    setError("");

    try {
      // parse github url
      const parts = githubUrl.split("/");
      const user = parts[3];
      const repo = parts[4];

      const res = await fetch(`http://localhost:3000/analyze/${user}/${repo}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unknown error");
      }
      setResult(data.clocData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <div>
      <Header />
      <Card className="max-w-xl mx-auto mt-10 p-6 space-y-4">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user">GitHub Link</Label>
            <Input
              id="githubUrl"
              placeholder="https://github.com/costidotdev/gitloc"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={analyzeRepo} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Repository"}
          </Button>
        </CardContent>
      </Card>
      {result && (
        <Card className="max-w-xl mx-auto mt-10 p-6 space-y-4">
          <CardContent className="space-y-4">
            <Label>Results (cloc output):</Label>
            <ClocTable data={JSON.parse(result)} />
          </CardContent>
        </Card>
      )}

      {error && <div className="text-red-500 font-medium">Error: {error}</div>}
    </div>
  );
}
