import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Sparkle } from "lucide-react"
import { useState } from "react"
const AddNewCourseDialog = ({ children }) => {
  const [formData, setFormData] = useState(
    {
      name: '',
      description: '',
      includeVideo: false,
      noOfChapters: 1,
      category: '',
      level: ''
    }
  );
  const onHandleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    console.log(formData)
  }

  const onGenerate = () => {
    console.log(formData);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course Using AI</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-3 mt-3">
              <div>
                <label> Course Name</label>
                <Input placeholder="Course Name" onChange={(event) => onHandleInputChange('name', event?.target.value)} />
              </div>
              <div>
                <label> Course Description (Optional)</label>
                <Textarea placeholder="Course Description" onChange={(event) => onHandleInputChange('description', event?.target.value)} />
              </div>
              <div>
                <label> No of Chapters</label>
                <Input placeholder="No of Chapters" type="number" onChange={(event) => onHandleInputChange('noOfChapters', event?.target.value)} />
              </div>
              <div className="flex gap-3 items-center">
                <label>Include Video</label>
                <Switch onCheckedChange={() => onHandleInputChange('includeVideo', !formData?.includeVideo)}></Switch>
              </div>
              <div>
                <label>Difficulty level</label>
                <div className="mt-1">
                  <Select onValueChange={(value) => onHandleInputChange('level', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Difficulty Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="advance">Advance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label> Category</label>
                <Input placeholder="Category (Separted by Comma)" onChange={(event) => onHandleInputChange('category', event?.target.value)} />
              </div>
              <div className="mt-5">
                <Button className={'w-full'} onClick={onGenerate}><Sparkle /> Generate Course</Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewCourseDialog
