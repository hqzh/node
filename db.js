const sqlite3 = require('sqlite3').verbose();
const dbName = 'later.sqlite';
const db = new sqlite3.Database(dbName);  //连接到一个数据库文件

db.serialize(() => {
    const sql = `
        CREATE TABLE IF NOT EXISTS articles
        (id integer primary key, title, content TEXT)
    `;
    db.run(sql);    //如果还没有，创建一个‘articles'表
});

class Article {
    static all(cb) {
        db.all('SELECT * FROM articles', cb)
    }
    static find(id, cb) {
        db.get('SELECT * FROM articles WHERE id = ? ', id, cb)
    }
    static create(data, cb) {
        const sql = 'INSERT INTO articles(title,content) VALUES (?,?)';  // 问号表示参数
        db.run(sql, data.title, data.content, cb);
    }
    static delete(id, cb) {
        if (!id) return cb(new Error('Please provide an id'));
        db.run('DELETE FROM articles WHERE id = ? ', id, cb)
    }
}

module.exports = db;
module.exports.Article = Article;