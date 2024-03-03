import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {textInput, tagText} = taskDetails

  return (
    <li className="task-item">
      <p className="task-name">{textInput}</p>
      <p className="tag-type">{tagText}</p>
    </li>
  )
}

export default TaskItem
