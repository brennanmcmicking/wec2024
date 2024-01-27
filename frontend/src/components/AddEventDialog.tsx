import { Button } from "./button"
import {
  Dialog,
  DialogClose,
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
import { useRef, useState } from "react"
import moment, { Moment } from "moment"
import { store } from "../store"
import { action } from "mobx"

function nowish(): Moment {
  return moment().set("ms", 0).set("s", 0).set("minute", 0)
}

export const AddEventDialog = observer(() => {
  const titleRef = useRef<HTMLInputElement | null>(null)
  const startRef = useRef<HTMLInputElement | null>(null)
  const endRef = useRef<HTMLInputElement | null>(null)
  const [rule, setRule] = useState<undefined | RecurranceRule>(undefined)

  return (
    <Dialog
      onOpenChange={(open) => {
        console.log({ open, startRef, endRef })
        if (!open) return
        if (startRef.current) startRef.current.value = nowish().toISOString()
        if (endRef.current)
          endRef.current.value = nowish().add("hour", 1).toISOString()
      }}
    >
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
            <Input ref={titleRef} id="title" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="start" className="text-right">
              Start
            </Label>
            <Input
              ref={startRef}
              type="datetime-local"
              id="start"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="end" className="text-right">
              End
            </Label>
            <Input
              ref={endRef}
              type="datetime-local"
              id="end"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="" className="text-right">
              Recurrence rule
            </Label>
            <Select onValueChange={(value) => setRule(JSON.parse(value))}>
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
          <DialogClose>
            <Button
              type="submit"
              onClick={action((e) => {
                if (titleRef.current === null) {
                  e.preventDefault()
                  return
                }
                if (startRef.current === null) {
                  e.preventDefault()
                  return
                }
                if (endRef.current === null) {
                  e.preventDefault()
                  return
                }
                store.events.push({
                  id: Math.floor(Math.random() * 10000000),
                  title: titleRef.current.value,
                  start: moment(startRef.current.value),
                  end: moment(endRef.current.value),
                  reoccuranceRule: rule,
                })
              })}
            >
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})
