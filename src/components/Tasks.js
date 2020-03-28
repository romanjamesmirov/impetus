import React, { Component } from 'react'

export default class Tasks extends Component {
	render() {
		return (
			<div className='Tasks-Page'>
				<section className='Active-Tasks'>
					<ul>
						<li>Coding</li>
						<li>Jazz</li>
					</ul>
				</section>
				<hr />
				<section className='Inactive-Tasks'>
					<ul>
						<li>Cooking</li>
						<li>Walking</li>
						<li>Sleep</li>
						<li>Dad</li>
						<li>Yoga</li>
						<li>Push/pull weight</li>
						<li>Pulling roots</li>
						<li>Games</li>
						<li>Porn</li>
						<li>Youtube</li>
						<li>Chatrooms</li>
						<li>Job search</li>
						<li>Friends and fam</li>
					</ul>
				</section>
			</div>
		)
	}
}