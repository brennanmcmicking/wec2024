import { Button } from "./button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { Label } from "./label"
import { Input } from "./input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import { RecurranceRule } from "../types"
import { observer } from "mobx-react-lite"

export const AddEventDialog = observer(() => (
  <Dialog>
    <DialogTrigger>
      <Button>Add Event</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Event</DialogTitle>
        <DialogDescription>Add an event to your calendar</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input id="title" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="start" className="text-right">
            Start
          </Label>
          <Input type="datetime-local" id="start" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="end" className="text-right">
            End
          </Label>
          <Input type="datetime-local" id="end" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="" className="text-right">
            Recurrence rule
          </Label>
          <Select>
            <SelectTrigger className="col-span-3 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[
                [undefined, "Not recurring"],
                [RecurranceRule.DAILY, "Daily"],
                [RecurranceRule.WEEKLY, "Weekly"],
                [RecurranceRule.MONTHLY, "Monthly"],
              ].map(([value, title]) => (
                <SelectItem value={JSON.stringify(value)}>{title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
))
