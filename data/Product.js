class Product {
  getOne(product_id) {
    return new Promise((resolve, reject) => {
      const db = Database.open();
      db.get(
        `SELECT *, u.image AS userImage, p.image AS productImage FROM products p INNER JOIN users u ON p.user_id = u.user_id WHERE product_id = ?`,
        [product_id],
        (err, row) => {
          Database.close(db);
          if (err) return reject(err.message);
          return row
            ? resolve(row)
            : reject(`No product was found with the id of ${product_id}`);
        }
      );
    });
  }
}
