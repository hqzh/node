const ejs = require('ejs');

const template = '<%- message %>';

const context = {
  message:"<script>alert('trusted js')</script>"
}

console.log(ejs.render(template,context))

const temp = '<%= message %>';

const xss = {
  message:"<script>alert('xss attack')</script>"
}

console.log(ejs.render(temp,xss))