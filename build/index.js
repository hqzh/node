'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Article = require('./db').Article; //加载数据库模块
var read = require('node-readability');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/articles', function (req, res, next) {
  Article.all(function (err, articles) {
    if (err) return next(err);
    // res.send(articles);
    res.format({
      html: function html() {
        res.render('articles.ejs', { articles: articles });
      },
      json: function json() {
        res.send(articles);
      }
    });
  });
});

app.get('/articles/:id', function (req, res, next) {
  var id = req.params.id;
  Article.find(id, function (err, article) {
    if (err) return next(err);
    res.send(article);
  });
});

app.delete('/articles/:id', function (req, res, next) {
  var id = req.params.id;
  Article.delete(id, function (err) {
    if (err) return next(err);
    res.send({ message: 'Deleted' });
  });
});

app.post('/articles', function (req, res, next) {
  var url = req.body.url;
  read(url, function (err, result) {
    if (err || !result) res.status(500).send('Error downloading article');
    Article.create({ title: result.title, content: result.content }, function (err, article) {
      if (err) return next(err);
      res.send('ok');
    });
  });
});

app.listen(app.get('port'), function () {
  console.log('App started on port', app.get('port'));
});

module.exports = app;