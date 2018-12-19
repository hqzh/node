const hogan = require('hogan.js');
const templateSource = '{{message}}';
const context = {message:'hello,hogan'};
const template = hogan.compile(templateSource);
console.log(template.render(context))