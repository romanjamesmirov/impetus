import React, { Component } from 'react'

import Plus from '../static/Plus.svg'

export default class Tasks extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeTasks: [],
			inactiveTasks: [],
			checkedStorage: false
		}
		this.createTask = this.createTask.bind(this)
		this.toggleTask = this.toggleTask.bind(this)
	}

	componentDidMount() {
		if (window.localStorage.getItem('activeTasks') !== null) {
			const storedActiveTasks = JSON.parse(window.localStorage.getItem('activeTasks'))
			const storedInactiveTasks = JSON.parse(window.localStorage.getItem('inactiveTasks'))
			this.setState({ activeTasks: storedActiveTasks, inactiveTasks: storedInactiveTasks })
		}
		this.setState({ checkedStorage: true })
	}

	createTask() {
		const newTaskName = prompt('Task')
		this.setState(state => ({
			inactiveTasks: [
				...state.inactiveTasks,
				{ name: newTaskName, activePeriods: [] }
			]
		}))
	}

	toggleTask(e) {
		let newActiveTasks = [...this.state.activeTasks]
		let newInactiveTasks = [...this.state.inactiveTasks]
		const toggledTaskName = e.target.textContent
		const indexInActiveTasks = newActiveTasks.findIndex(task => task.name === toggledTaskName)
		const isCurrentlyActive = indexInActiveTasks !== -1 
		if (isCurrentlyActive) {
			newInactiveTasks.unshift(newActiveTasks.splice(indexInActiveTasks, 1)[0])
		} else {
			const indexInInactiveTasks = newInactiveTasks.findIndex(task => task.name === toggledTaskName)
			newActiveTasks.unshift(newInactiveTasks.splice(indexInInactiveTasks, 1)[0])
		}
		this.setState(state => ({
			activeTasks: [...newActiveTasks],
			inactiveTasks: [...newInactiveTasks]
		}))
	}

	render() {
		if (this.state.checkedStorage === true) {
			window.localStorage.setItem('activeTasks', JSON.stringify(this.state.activeTasks))
			window.localStorage.setItem('inactiveTasks', JSON.stringify(this.state.inactiveTasks))
		}
		return (
			<div className='Tasks-Page'>
				<section className='Active-Tasks'>
					<ul>
						{this.state.activeTasks.length === 0
							? <li className='Empty-Tasks-Message'>You have no active tasks.</li>
							: this.state.activeTasks.map((task, index) => (
								<li key={index} className='Task-Item'>
									<button onClick={this.toggleTask}>{task.name}</button>
								</li>
							))}
					</ul>
				</section>
				<hr />
				<section className='Inactive-Tasks'>
					<ul>
						{this.state.activeTasks.length === 0 && this.state.inactiveTasks.length === 0
							? <li className='Empty-Tasks-Message'>Add a new task <span role='img' aria-label='Right arrow'>➡️</span></li>
							: this.state.inactiveTasks.length === 0
								? <li className='Empty-Tasks-Message'>All tasks are active.</li>
								: this.state.inactiveTasks.map((task, index) => (
									<li key={index} className='Task-Item'>
										<button onClick={this.toggleTask}>{task.name}</button>
									</li>
								))}
						<li className='Create-Task'>
							<button onClick={this.createTask}>
								<img src={Plus} alt='Plus icon' />
							</button>
						</li>
					</ul>
				</section>
			</div>
		)
	}
}