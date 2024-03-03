import './index.css'

const TabItem = props => {
  const {tabDetails, isActive, onChangeActiveTab} = props
  const {optionId, displayText} = tabDetails
  const tabBtnClassName = isActive ? 'tab-btn active-tab' : 'tab-btn'

  return (
    <li className="tab-item">
      <button
        type="button"
        className={tabBtnClassName}
        onClick={() => onChangeActiveTab(optionId)}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
