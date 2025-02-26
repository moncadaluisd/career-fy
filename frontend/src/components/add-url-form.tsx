import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function UrlInput() {
  const [url, setUrl] = useState("")

  const handleSave = () => {
    // Handle saving the URL
    console.log("Saving URL:", url)
    setUrl("")
  }

  return (
    <div className="w-full bg-white/70 backdrop-blur-lg border border-slate-200/60  p-4 shadow-sm">
      <div className="flex gap-4">
        <Input
          type="url"
          placeholder="Enter job application URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  )
}

