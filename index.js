const http = require('http');
const fs = require('fs');

http.createServer((req,res)=>{
	if (req.url ==='/') {
		fs.readFile('./titles.json',(err,data) => {
			if(err){
				console.log(err);
				res.end('server err')
			}else{
				const titles = JSON.parse(data,toString());
				fs.readFile('./template.html',(err,data)=>{
					if(err){
						console.log(err);
						res.end('server err')
					}else{
						const templ = data.toString();
						const html = templ.replace('%',titles.join('<li></li>'));
						res.writeHead(200,{'Content-Type':'text/html'});
						res.end(html)
					}
				})
			}
		})
	} 
}).listen(8000,'127.0.0.1')
