#### Online Thrift Store Website

this is supposed to be a website that people can add their second-hand products. And other people can contact them and buy the products. It's supposed to have a filtering functionility to view products based on city and category, etc.

Website Design:
[Figma file](https://www.figma.com/file/O0aK1iUPN4GSZW4q0DIo3O/online-thrift-store?node-id=0%3A1)

API Design [WIP]

- Routes
  - GET "/" -> product list ordered by most recent
  - GET "/product/:productId" -> product detail page
    - if owner is logged in, how will they edit the listing?
  - POST "/product/" -> create a new product
  - GET "/user/:userId" -> profile page, see a list of all their products
  - POST "/login"
  - POST "/logout"
  - POST "/signup"

To do:

- [x] Login and Signup
- [x] replace callbacks with promises or async/await
- [ ] store the sessions in a session storage, [Compatible Session Stores](http://expressjs.com/en/resources/middleware/session.html#compatible-session-stores)
- [ ] profile picture for user

Tech Debt:

- use an ORM instead of raw SQL
- convert JavaScript to TypeScript
