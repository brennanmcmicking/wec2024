interface TaskCardProps {}
const TaskCard = (props: TaskCardProps) => {
  return <div className="p-4 outline outline-1 outline-task"></div>
}

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
            <p className="text-2xl font-semibold text-center">
              No recurring tasks
            </p>
          </div>
        ) : null }
      </div>
      <div>
        {/* recurring, one-off, single, unique */}
        <h1>Unique Tasks</h1>
      </div>
    </div>
  )
}
