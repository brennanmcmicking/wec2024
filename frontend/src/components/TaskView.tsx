interface TaskCardProps {}
const TaskCard = (props: TaskCardProps) => {
  return <div className="p-4 outline outline-1 outline-task"></div>
}

interface TaskViewProps {}
export const TaskView = (props: TaskViewProps) => {
  let hasDailyTasks = false
  let hasWeeklyTasks = false
  let hasMonthlyTasks = false

  return (
    <div>
      <div>
        <h1>Recurring Tasks</h1>
      </div>
      <div>
        {/* recurring, one-off, single, unique */}
        <h1>Unique Tasks</h1>
      </div>
    </div>
  )
}
