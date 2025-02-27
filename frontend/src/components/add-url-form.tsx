import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export function UrlInput({
  isNewApply,
  handleNewApply,
}: {
  isNewApply: boolean;
  handleNewApply: (value: boolean, url: string) => void;
}) {
  const [url, setUrl] = useState("");

  const handleSave = () => {
    // Handle saving the URL

    console.log("Saving URL:", url);
    handleNewApply(true, url);
  };



  return (
    <div className="w-full bg-white/70 backdrop-blur-lg border border-slate-200/60  p-4 shadow-sm">
      <div className="flex gap-4">
        <Input
          type="url"
          placeholder="Enter job application URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
          disabled={isNewApply}
        />
        <Button onClick={handleSave} disabled={isNewApply}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
}

