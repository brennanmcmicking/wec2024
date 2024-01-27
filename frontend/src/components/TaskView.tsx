import { TaskEntry } from "../types"
import { Separator } from "./separator"

interface TaskCardProps {}
const TaskCard = (props: TaskCardProps) => {
  return <div className="p-4 outline outline-1 outline-task"></div>
}

interface TaskListProps {
  tasks: TaskEntry[]
  header?: string
}
const TaskList = (props: TaskListProps) => (
  <div className="overflow-y-scroll">
    {props.tasks.map((task) => (
      <>
        {props.header && (
          <>
            <h2>{props.header}</h2>
            <Separator />
          </>
        )}
        <TaskCard key={task.id} />
      </>
    ))}
  </div>
)

interface TaskViewProps {}
export const TaskView = (props: TaskViewProps) => {
  let hasDailyTasks = false
  let hasWeeklyTasks = false
  let hasMonthlyTasks = false

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
            {hasDailyTasks && <TaskList tasks={[]} header="Daily" />}
            {hasWeeklyTasks && <TaskList tasks={[]} header="Weekly" />}
            {hasMonthlyTasks && <TaskList tasks={[]} header="Monthly" />}
          </>
        )}
      </div>
      <Separator />
      <div>
        {/* recurring, one-off, single, unique */}
        <h1>Unique Tasks</h1>
        <TaskList tasks={[]} />
      </div>
    </div>
  )
}
