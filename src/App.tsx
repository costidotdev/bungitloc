import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "./components/header";

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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

          <Button onClick={analyzeRepo} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Repository"}
          </Button>

          <Separator />

          {result && (
            <div>
              <Label>Results (cloc output):</Label>
              <Textarea value={result} readOnly rows={10} />
            </div>
          )}

          {error && (
            <div className="text-red-500 font-medium">Error: {error}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
