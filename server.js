const path = require('path')
const express = require('express')

const app = express()

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve(__dirname, 'build')))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`))