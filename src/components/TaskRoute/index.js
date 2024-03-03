import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import TabItem from '../TabItem'
import TaskItem from '../TaskItem'

import './index.css'

class TaskRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskList: [],
      activeTag: props.tagsList[0].optionId,
      textInput: '',
      activeTabId: '',
    }
  }

  onChangeActiveTab = id => {
    const {activeTabId} = this.state
    if (activeTabId === id) {
      this.setState({activeTabId: ''})
    } else {
      this.setState({activeTabId: id})
    }
  }

  onChangeInput = event => {
    this.setState({textInput: event.target.value})
  }

  onChangeOption = event => {
    this.setState({activeTag: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {activeTag, textInput} = this.state
    const {tagsList} = this.props
    const tagItem = tagsList.find(each => each.optionId === activeTag)
    const tagText = tagItem.displayText
    const categoryId = tagItem.optionId

    const taskObject = {tagText, textInput, categoryId}

    this.setState(prevState => ({
      taskList: [...prevState.taskList, taskObject],
      textInput: '',
      activeTag: tagsList[0].optionId,
    }))
  }

  renderCreateTask = () => {
    const {activeTag, textInput} = this.state
    const {tagsList} = this.props

    return (
      <form className="sub-container-1" onSubmit={this.onSubmitForm}>
        <h1 className="create-task-title">Create a task!</h1>
        <div className="input-container">
          <label htmlFor="task">Task</label>
          <input
            id="task"
            type="text"
            className="input"
            placeholder="Enter the task here"
            onChange={this.onChangeInput}
            value={textInput}
          />
        </div>
        <div className="input-container">
          <label htmlFor="tag">Tags</label>
          <select
            id="tag"
            className="input"
            value={activeTag}
            onChange={this.onChangeOption}
          >
            {tagsList.map(each => (
              <option key={each.optionId} value={each.optionId}>
                {each.displayText}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="task-btn">
          Add Task
        </button>
      </form>
    )
  }

  renderTagsAndTasks = () => {
    const {activeTabId, taskList} = this.state
    const {tagsList} = this.props
    const filteredList = taskList.filter(each =>
      each.categoryId.includes(activeTabId),
    )
    return (
      <div className="sub-container-2">
        <h1 className="tag-title">Tags</h1>
        <ul className="tags-list">
          {tagsList.map(each => (
            <TabItem
              key={each.optionId}
              tabDetails={each}
              isActive={activeTabId === each.optionId}
              onChangeActiveTab={this.onChangeActiveTab}
            />
          ))}
        </ul>
        <h1 className="tag-title">Tasks</h1>
        {filteredList.length > 0 ? (
          <ul className="tasks-list">
            {filteredList.map(each => (
              <TaskItem key={uuidv4()} taskDetails={each} />
            ))}
          </ul>
        ) : (
          <p className="no-tasks">No Tasks Added Yet</p>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="task-route-container">
        {this.renderCreateTask()}
        {this.renderTagsAndTasks()}
      </div>
    )
  }
}

export default TaskRoute
