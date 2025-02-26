
import { useState } from "react"
import { MoreHorizontal, Upload } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Example CV data
const cvs = [
  {
    id: "1",
    name: "Software Engineer CV",
    description: "Focused on frontend development roles",
    date: "2024-02-20",
    usedIn: 12,
    file: "/example.pdf",
  },
  {
    id: "2",
    name: "Full Stack Developer CV",
    description: "Highlighting both frontend and backend skills",
    date: "2024-02-15",
    usedIn: 8,
    file: "/example.pdf",
  },
  {
    id: "3",
    name: "Tech Lead CV",
    description: "Emphasizing leadership experience",
    date: "2024-02-10",
    usedIn: 4,
    file: "/example.pdf",
  },
]

const CurriculumManager = () => {
  const [selectedCV, setSelectedCV] = useState(cvs[0])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">My Curriculums</h3>
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload CV
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New CV</DialogTitle>
              <DialogDescription>Upload a new CV and add relevant details.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="cv-name">CV Name</Label>
                <Input id="cv-name" placeholder="e.g., Software Engineer CV" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cv-description">Description</Label>
                <Textarea id="cv-description" placeholder="Add notes about this version..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cv-file">File</Label>
                <Input id="cv-file" type="file" accept=".pdf" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setUploadOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Upload</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cvs.map((cv) => (
          <Card key={cv.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{cv.name}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedCV(cv)
                      setPreviewOpen(true)
                    }}
                  >
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Edit Details</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">{cv.description}</div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Used in {cv.usedIn} applications</div>
              <Badge variant="secondary">{new Date(cv.date).toLocaleDateString()}</Badge>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl h-[800px]">
          <DialogHeader>
            <DialogTitle>{selectedCV?.name}</DialogTitle>
            <DialogDescription>{selectedCV?.description}</DialogDescription>
          </DialogHeader>
          <div className="flex-1 w-full h-full min-h-[600px] rounded-md border">
            <iframe src={selectedCV?.file} className="w-full h-full rounded-md" title="CV Preview" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CurriculumManager;

