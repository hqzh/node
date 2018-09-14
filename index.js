const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
	getTitles(res);
}).listen(8000, '127.0.0.1')

const getTitles = (res) => {
	fs.readFile('./titles.json', (err, data) => {
		if (err) return hadError(err, res);
		getTemplate(JSON.parse(data.toString()), res)
	})
}

const getTemplate = (titles, res) => {
	fs.readFile('./template.html', (err, data) => {
		if (err) return hadError(err, res);
		formatHtml(titles, data.toString(), res)
	})
}


const formatHtml = (titles, tmpl, res) => {
	const html = tmpl.replace('%', titles.join('<li></li>'));
	res.end(html);
}

const hadError = (err, res) => {
	console.log(err);
	res.end('server err')
}