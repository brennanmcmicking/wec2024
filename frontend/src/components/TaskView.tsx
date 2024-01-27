import { store } from "../store"
import { RecurranceRule, TaskEntry } from "../types"
import { Separator } from "./separator"
import { observer } from "mobx-react-lite"

interface TaskCardProps {
  task: TaskEntry
}
const TaskCard = (props: TaskCardProps) => (
  <div className="p-4 outline outline-1 outline-task">
    <p className="text-lg font-semibold text-neutral-900">{props.task.title}</p>
    <p className="text-sm text-neutral-800">{props.task.deadline.format()}</p>
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
    <div className="overflow-y-scroll">
      {props.tasks.map((task) => (
        <>
          {props.header && (
            <>
              <h2>{props.header}</h2>
              <Separator />
            </>
          )}
          <TaskCard key={task.id} task={task} />
        </>
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
    <div>
      <div>
        <h1>Recurring Tasks</h1>
        {noRepeatingTasks ? (
          <div className="flex flex-col items-center justify-center p-10">
            <p className="text-center text-2xl font-semibold text-neutral-900">
              No recurring tasks
            </p>
          </div>
        ) : (
          <>
            <TaskList tasks={dailyTasks} header="Daily" />
            <TaskList tasks={weeklyTasks} header="Weekly" />
            <TaskList tasks={monthlyTasks} header="Monthly" />
          </>
        )}
      </div>
      <Separator />
      <div>
        {/* recurring, one-off, single, unique */}
        <h1>Unique Tasks</h1>
        <TaskList tasks={nonRepeatingTasks} />
      </div>
    </div>
  )
})
