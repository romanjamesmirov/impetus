import React, { Component } from 'react'

import Plus from '../static/Plus.svg'

export default class Tasks extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeTasks: [],
			inactiveTasks: []
		}
		this.createTask = this.createTask.bind(this)
		this.toggleTask = this.toggleTask.bind(this)
	}

	componentDidMount() {
		if (localStorage.getItem('activeTasks') !== null) {
			const storedActiveTasks = JSON.parse(window.localStorage.getItem('activeTasks'))
			const storedInactiveTasks = JSON.parse(window.localStorage.getItem('inactiveTasks'))
			this.setState({ activeTasks: storedActiveTasks, inactiveTasks: storedInactiveTasks })
		}
	}

	componentWillUnmount() {
		window.localStorage.setItem('activeTasks', JSON.stringify(this.state.activeTasks))
		window.localStorage.setItem('inactiveTasks', JSON.stringify(this.state.inactiveTasks))
	}

	createTask() {
		const newTaskName = prompt('Task')
		this.setState(state => ({ inactiveTasks: [...state.inactiveTasks, newTaskName] }))
	}

	toggleTask(e) {
		let newActiveTasks = [...this.state.activeTasks]
		let newInactiveTasks = [...this.state.inactiveTasks]
		const toggledTask = e.target.textContent
		if (newActiveTasks.indexOf(toggledTask) !== -1) {
			newActiveTasks.splice(newActiveTasks.indexOf(toggledTask), 1)
			newInactiveTasks.unshift(toggledTask)
		} else if (newInactiveTasks.indexOf(toggledTask) !== -1) {
			newInactiveTasks.splice(newInactiveTasks.indexOf(toggledTask), 1)
			newActiveTasks.unshift(toggledTask)
		}
		this.setState(state => ({
			activeTasks: [...newActiveTasks],
			inactiveTasks: [...newInactiveTasks]
		}))
	}

	render() {
		return (
			<div className='Tasks-Page'>
				<section className='Active-Tasks'>
					<ul>
						{this.state.activeTasks.length === 0
							? <li className='Empty-Tasks-Message'>You have no active tasks.</li>
							: this.state.activeTasks.map((task, index) => (
								<li key={index} className='Task-Item'>
									<button onClick={this.toggleTask}>{task}</button>
								</li>
							))}
					</ul>
				</section>
				<hr />
				<section className='Inactive-Tasks'>
					<ul>
						{this.state.activeTasks.length === 0 && this.state.inactiveTasks.length === 0
							? <li className='Empty-Tasks-Message'>Add a new task ➡️</li>
							: this.state.inactiveTasks.length === 0
								? <li className='Empty-Tasks-Message'>All tasks are active.</li>
								: this.state.inactiveTasks.map((task, index) => (
									<li key={index} className='Task-Item'>
										<button onClick={this.toggleTask}>{task}</button>
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