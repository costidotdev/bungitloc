import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export type LanguageStats = {
  nFiles: number;
  blank: number;
  comment: number;
  code: number;
};

export type ClocData = Record<string, LanguageStats> & { header: any };

export function ClocTable({ data }: { data: ClocData }) {
  // Filter out the "header" key
  const languages = Object.entries(data).filter(
    ([key]) => key !== "header",
  ) as [string, LanguageStats][];

  return (
    <div className="rounded-xl border shadow-sm p-4">
      <h2 className="text-xl font-semibold mb-4">Lines of Code by Language</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Language</TableHead>
            <TableHead className="text-right">Files</TableHead>
            <TableHead className="text-right">Blank</TableHead>
            <TableHead className="text-right">Comment</TableHead>
            <TableHead className="text-right">Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {languages.map(([lang, stats]) => (
            <TableRow key={lang}>
              <TableCell>{lang}</TableCell>
              <TableCell className="text-right">{stats.nFiles}</TableCell>
              <TableCell className="text-right">{stats.blank}</TableCell>
              <TableCell className="text-right">{stats.comment}</TableCell>
              <TableCell className="text-right">{stats.code}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
