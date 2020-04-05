import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Chart from 'chart.js'

import Menu from '../static/Menu.svg'
import '../App.css'
import '../Data.css'

export default class Data extends Component {
	componentDidMount() {
		const inactiveGroup = JSON.parse(localStorage.inactiveGroup)
		// loop through tasks to find which one has earliest start date and time 
		let graphInitDate = new Date()
		for (let i = 0; i < inactiveGroup.length; i++) {
			const noActivity = inactiveGroup[i].activePeriods.length === 0
			if (noActivity) continue 
			let earliestTaskStart = new Date(inactiveGroup[i].activePeriods[0].start)
			if (earliestTaskStart < graphInitDate) graphInitDate = earliestTaskStart
		}
		// set labels
		let dates = []
		let numDates = (new Date()) - graphInitDate
		numDates = Math.ceil(numDates / 86400000) + 1
		for (let i = 0; i < numDates; i++) {
			let date = Date.parse(graphInitDate) + (i * 86400000)
			date = new Date(date)
			dates.push(date.toLocaleDateString())
		}
		// set totals
		let datasets = []
		for (let i = 0; i < inactiveGroup.length; i++) {
			let dataset = { 
				label: inactiveGroup[i].name,
				backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
				data: []
			}
			let activePeriods = [...inactiveGroup[i].activePeriods]
			// For each date in the dates array, check if it matches the start of the first period in the activePeriods array. If it does, take the first period out and add it to data[i] (since data is the same length as dates)
			for (let j = 0; j < dates.length; j++) {
				if (activePeriods.length === 0) {
					dataset.data.push(0)
					continue
				}
				let periodStart = activePeriods[0].start
				periodStart = (new Date(periodStart)).toLocaleDateString()
				if (periodStart !== dates[j]) dataset.data.push(0)
				while (periodStart === dates[j]) {
					let periodEnd = Date.parse(activePeriods[0].end)
					periodStart = Date.parse(activePeriods[0].start)
					let period = (periodEnd - periodStart) / 60000
					dataset.data[j] = dataset.data[j] === undefined ? period : dataset.data[j] + period
					activePeriods.shift()
					if (activePeriods.length > 0) {
						periodStart = activePeriods[0].start
						periodStart = (new Date(periodStart)).toLocaleDateString()
					}
				}
			}
			datasets.push(dataset)
		}
		console.log(datasets)
		
		let chart = new Chart(this.cumulativeChart, {
			type: 'horizontalBar',
			data: {
				labels: dates,
				datasets: datasets
			},
			options: {
				scales: {
					xAxes: [{
						stacked: true
					}],
					yAxes: [{
						stacked: true
					}]
				}
			}
		})
	}
	render() {
		return (
			<div className='Data-page'>
				<nav>
					<Link to='/'>
						<button className='menu'><img src={Menu} alt='Menu icon' /></button>
					</Link>
				</nav>
				<div className='Chart-container'>
					<canvas id='cumulative' ref={el => this.cumulativeChart = el} />
				</div>
			</div>
		)
	}
}