import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export function UrlInput({
  isNewApply,
  handleNewApply,
  url = "",
}: {
  isNewApply: boolean;
  handleNewApply: (value: boolean, url: string) => void;
  url?: string;
}) {
  const [urlInput, setUrlInput] = useState("");

  const handleSave = () => {
    // Handle saving the URL

    handleNewApply(true, urlInput);
  };

  useEffect(() => {
    if (url) {
      setUrlInput(url);
    }
  }, [url]);

  return (
    <div className="w-full bg-white/70 backdrop-blur-lg border border-slate-200/60  p-4 shadow-sm">
      <div className="flex gap-4">
        <Input
          type="url"
          placeholder="Enter job application URL..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          className="flex-1"
          disabled={isNewApply || url.length > 0}
        />
        <Button onClick={handleSave} disabled={isNewApply || url.length > 0}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
}

