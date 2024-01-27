import { store } from "../store"
import { RecurranceRule, TaskEntry } from "../types"
import { Separator } from "./separator"
import { observer } from "mobx-react-lite"

interface TaskCardProps {
  task: TaskEntry
}
const TaskCard = (props: TaskCardProps) => (
  <div className="m-1 rounded bg-task p-2 text-white outline outline-2 outline-task">
    <p className="text-md font-semibold">{props.task.title}</p>
    <p className="text-sm">{props.task.deadline.format("MMMM D")}</p>
  </div>
)

interface TaskListProps {
  tasks: TaskEntry[]
  header?: string
}
const TaskList = (props: TaskListProps) => {
  if (props.tasks.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-4 overflow-y-scroll">
      {props.tasks.map((task) => (
        <div key={task.id}>
          {props.header && (
            <>
              <h2>{props.header}</h2>
              <Separator decorative className="mb-6 mt-2" />
            </>
          )}
          <TaskCard key={task.id} task={task} />
        </div>
      ))}
    </div>
  )
}

export const TaskView = observer(() => {
  let dailyTasks: TaskEntry[] = store.tasks.filter(
    (task) => task.reoccuranceRule === RecurranceRule.DAILY,
  )
  let weeklyTasks: TaskEntry[] = store.tasks.filter(
    (task) => task.reoccuranceRule === RecurranceRule.WEEKLY,
  )
  let monthlyTasks: TaskEntry[] = store.tasks.filter(
    (task) => task.reoccuranceRule === RecurranceRule.MONTHLY,
  )

  let nonRepeatingTasks: TaskEntry[] = store.tasks.filter(
    (task) => task.reoccuranceRule === undefined,
  )

  let hasDailyTasks = dailyTasks.length > 0
  let hasWeeklyTasks = weeklyTasks.length > 0
  let hasMonthlyTasks = monthlyTasks.length > 0

  let noRepeatingTasks = !hasDailyTasks && !hasWeeklyTasks && !hasMonthlyTasks

  return (
    <div className="m-auto flex h-full items-center justify-center bg-slate-100">
      <div className="mx-16 h-full w-[60ch] overflow-y-scroll rounded bg-white p-4">
        <h1>Recurring Tasks</h1>
        <div className="">
          {noRepeatingTasks ? (
            <div className="flex flex-col items-center justify-center p-10">
              <p className="text-center font-semibold text-neutral-900">
                No recurring tasks
              </p>
            </div>
          ) : (
            <div className="">
              <TaskList tasks={dailyTasks} header="Daily" />
              <TaskList tasks={weeklyTasks} header="Weekly" />
              <TaskList tasks={monthlyTasks} header="Monthly" />
            </div>
          )}
        </div>
        <Separator className="my-12" />
        {/* recurring, one-off, single, unique */}
        <h1>Unique Tasks</h1>
        <div className="">
          <TaskList tasks={nonRepeatingTasks} />
        </div>
      </div>
    </div>
  )
})
