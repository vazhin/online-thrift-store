const sqlite = require('sqlite3');

//TODO: CREATE A RELATIONSHIP BETWEEN USERS AND PRODUCTS TABLE. EACH USER HAS MANY PRODUCTS.

/* 

Q\ do I need to change the price data type to money?
Note\ the condition property can either be new
Thought\ should I add "MEASUREMENTS" property or I don't need to I guess.

*/

class Product {
  constructor(
    product_id,
    name,
    owner,
    price,
    owner_phoneNumber,
    description,
    condition,
    date_added
  ) {
    this.product_id = product_id;
    this.name = name;
    this.owner = owner;
    this.price = price;
    this.owner_phoneNumber = owner_phoneNumber;
    this.description = description;
    this.condition = condition;
    this.date_added = date_added;
  }

  create(product, callback) {
    let success = true;
    let error_message = '';

    // connect to the debug

    const db = new sqlite.Database('./data/database.db', (err) => {
      if (err) {
        console.error(err.message);
      }

      console.log('Connected to the database.');
    });

    //create table if not exists

    let createTableSql = `CREATE TABLE IF NOT EXISTS products (
      product_id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      owner TEXT NOT NULL,
      price INTEGER NOT NULL,
      owner_phoneNumber INTEGER NOT NULL,
      description TEXT NOT NULL,
      condition TEXT NOT NULL,
      date_added TEXT NOT NULL
    )`;

    db.serialize(() => {
      // TODO: delete this. I don't want to drop the table.
      db.run(`DROP TABLE products`, function (err) {
        if (err) {
          console.error(err);
        }
        console.log('dropped table products.');
      });

      db.run(createTableSql, function (err) {
        if (err) {
          console.error(err);
        }
        console.log('table products created.');
      });
    });

    db.run(
      `INSERT INTO products(product_id,
        name,
        owner,
        price,
        owner_phoneNumber,
        description,
        condition,
        date_added) VALUES(1, "t-shirt", "vazhin", 50, 07503424424, "it's a t-shirt.", "it's new.", "2 Jan, 2020" )`,
      [],
      function (err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      }
    );

    db.each(
      `SELECT product_id,
    name,
    owner,
    price,
    owner_phoneNumber,
    description,
    condition,
    date_added FROM products`,
      [],
      (err, row) => {
        if (err) {
          console.error(err.message);
        }
        console.log(row);
      }
    );

    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Closed the database connection.');
    });

    //TODO: validate product property values.

    if (typeof callback === 'function') {
      callback(result);
    }
  }
}

module.exports = new Product();

/* 

NOTE: this is an example of a method.

posts.create = (post, user, callback) => {
  var success = true;
  var error_message = "";

  if (post.title.trim().length < 10) {
    error_message = "A post title is required (minimum 10 characters).";
  } else if (post.message.trim().length < 20) {
    error_message = "A post message is required (minimum 20 characters).";
  }

  if (!success) {
    var result = {
      success: false,
      error_message: error_message
    };
    return callback(result);
  }

  var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  var date = new Date();
  var sql ='INSERT INTO posts (title, body, date, user_id, timestamp) VALUES (?, ?, ?, ?, ?)'
  var now = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
  var timestamp = Math.round(new Date().getTime() / 1000);
  var params =[post.title, post.message, now, user.id, timestamp]
  db.run(sql, params, function (err, result) {
    var success = !err;
    var result = {
      success: success,
      error_message: "An unknown error occurred.",
      post_id: this.lastID,
    };
    return callback(result);
  });
};

*/
