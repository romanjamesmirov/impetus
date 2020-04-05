import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import TasksUI from './TasksUI'

export default class Tasks extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeGroup: [],
			inactiveGroup: [],
			checkedStorage: false,
			minimalistMode: false,
			usingMouse: true,
			toData: false
		}
		this.handlePageMouseOrKeyDown = this.handlePageMouseOrKeyDown.bind(this)
		this.handleMenuClick = this.handleMenuClick.bind(this)
		this.createTask = this.createTask.bind(this)
		this.toggleTask = this.toggleTask.bind(this)
	}

	componentDidMount() {
		if (window.localStorage.getItem('activeGroup') !== null) {
			const storedActiveGroup = JSON.parse(window.localStorage.getItem('activeGroup'))
			const storedInactiveGroup = JSON.parse(window.localStorage.getItem('inactiveGroup'))
			this.setState({ activeGroup: storedActiveGroup, inactiveGroup: storedInactiveGroup })
		}
		this.setState({ checkedStorage: true })
	}

	handlePageMouseOrKeyDown(e) {
		if (e.type === 'mousedown') {
			this.setState(state => ({ usingMouse: true, minimalistMode: !state.minimalistMode }))
		} else if (e.key === ' ') {
			this.setState(state => ({ minimalistMode: !state.minimalistMode }))
		} else if (e.keyCode === 9 || e.keyCode === 13 /* TAB or ENTER */) {
			this.setState({ usingMouse: false })
		}
	}

	handleMenuClick(e) {
		if (!(e.type === 'keydown' && e.key === ' ')) e.stopPropagation()
		if (e.type !== 'mousedown' && e.keyCode !== 13) return
		if (e.type === 'mousedown') this.setState({ usingMouse: true })
		this.setState({ toData: true })
	}

	createTask(e) {
		if (!(e.type === 'keydown' && e.key === ' ')) e.stopPropagation()
		if (e.type !== 'mousedown' && e.keyCode !== 13) return
		if (e.type === 'mousedown') this.setState({ usingMouse: true })
		const newTaskName = prompt('Task')
		this.setState(state => ({
			inactiveGroup: [
				...state.inactiveGroup,
				{ name: newTaskName, activePeriods: [] }
			]
		}))
	}

	toggleTask(e) {
		if (!(e.type === 'keydown' && e.key === ' ')) e.stopPropagation()
		if (e.type !== 'mousedown' && e.keyCode !== 13) return
		if (e.type === 'mousedown') this.setState({ usingMouse: true })
		const now = (new Date()).toString()
		let newActiveGroup = [...this.state.activeGroup]
		let newInactiveGroup = [...this.state.inactiveGroup]
		const toggledTaskName = e.target.getAttribute('data-name')
		const activeGroupIndex = newActiveGroup.findIndex(task => task.name === toggledTaskName)
		const inactiveGroupIndex = newInactiveGroup.findIndex(task => task.name === toggledTaskName)
		if (activeGroupIndex !== -1) {
			const toggledTask = newActiveGroup.splice(activeGroupIndex, 1)[0]
			toggledTask.activePeriods[toggledTask.activePeriods.length - 1].end = now
			newInactiveGroup.unshift(toggledTask)
		} else {
			const toggledTask = newInactiveGroup.splice(inactiveGroupIndex, 1)[0]
			toggledTask.activePeriods.push({ start: now, end: null })
			newActiveGroup.unshift(toggledTask)
		}
		this.setState(state => ({
			activeGroup: [...newActiveGroup],
			inactiveGroup: [...newInactiveGroup]
		}))
	}

	render() {
		if (this.state.checkedStorage === true) {
			window.localStorage.setItem('activeGroup', JSON.stringify(this.state.activeGroup))
			window.localStorage.setItem('inactiveGroup', JSON.stringify(this.state.inactiveGroup))
		}
		if (this.state.toData) return <Redirect to='/data' />
		return (
			<TasksUI {...this.state} handlePageMouseOrKeyDown={this.handlePageMouseOrKeyDown} handleMenuClick={this.handleMenuClick} createTask={this.createTask} toggleTask={this.toggleTask} />
		)
	}
}