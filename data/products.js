/* 

Q\ do I need to change the price data type to money?
Note\ the condition property can either be new
Thought\ should I add "MEASUREMENTS" property or I don't need to I guess.

CREATE TABLE IF NOT EXISTS Products (
  Product_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Name VARCHAR(100) NOT NULL,
  Owner VARCHAR(255) NOT NULL,
  Price INTEGER NOT NULL,
  Owner_PhoneNumber INTEGER NOT NULL,
  Description TEXT NOT NULL,
  Condition VARCHAR(255) NOT NULL,
  Date_Added TEXT NOT NULL
);

*/

class Product {
  constructor(
    Product_ID,
    Name,
    Owner,
    Price,
    Owner_PhoneNumber,
    Description,
    Condition,
    Date_Added
  ) {
    this.Product_ID = Product_ID;
    this.Name = Name;
    this.Owner = Owner;
    this.Price = Price;
    this.Owner_PhoneNumber = Owner_PhoneNumber;
    this.Description = Description;
    this.Condition = Condition;
    this.Date_Added = Date_Added;
  }
}
