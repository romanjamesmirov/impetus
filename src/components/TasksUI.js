import React, { Component } from 'react'

import Menu from '../static/Menu.svg'
import Plus from '../static/Plus.svg'

export default class TasksUI extends Component {
	componentDidMount() {
	}
	
	render() {
		if (this.tasksPage !== undefined) this.tasksPage.focus()
		return (
			<div
				onMouseDown={this.props.handlePageMouseOrKeyDown}
				onKeyDown={this.props.handlePageMouseOrKeyDown} tabIndex='0'
				ref={el => this.tasksPage = el}
				className={`Tasks-page ${this.props.minimalistMode ? 'minimalist' : ''} ${this.props.usingMouse ? '' : 'using-tab'}`}>
				<nav>
					<button onMouseDown={this.props.handleMenuClick} onKeyDown={this.props.handleMenuClick} className='menu'>
						<img src={Menu} alt='Menu icon' /></button>
				</nav>

				<section className='Active-group'>
					<ul>
						{this.props.activeGroup.length === 0
							? <li className='Empty-tasks-message'>You have no active tasks.</li>
							: this.props.activeGroup.map((task, index) => (
								<li key={index} className='Task-item'>
									<button onMouseDown={this.props.toggleTask} data-name={task.name} onKeyDown={this.props.toggleTask}>{task.name}</button>
								</li>
							))}
					</ul>
				</section>

				<hr />
				<section className='Inactive-group'>
					<ul>
						{this.props.activeGroup.length === 0 && this.props.inactiveGroup.length === 0
							? <li className='Empty-tasks-message'>Add a new task <span role='img' aria-label='Right arrow'>➡️</span></li>
							: this.props.inactiveGroup.length === 0
								? <li className='Empty-tasks-message'>All tasks are active.</li>
								: this.props.inactiveGroup.map((task, index) => {
									let totalTime = 0
									for (let i = 0; i < task.activePeriods.length; i++) {
										totalTime += (Date.parse(task.activePeriods[i].end) - Date.parse(task.activePeriods[i].start)) / 1000
									}
									return (<li key={index} className='Task-item'>
										<button onMouseDown={this.props.toggleTask} data-name={task.name} onKeyDown={this.props.toggleTask}>{task.name} – {totalTime} sec</button>
									</li>)
								})}

						<li className='Create-task'>
							<button onMouseDown={this.props.createTask} onKeyDown={this.props.createTask}>
								<img src={Plus} alt='Plus icon' />
							</button>
						</li>
					</ul>
				</section>
			</div>
		)
	}
}