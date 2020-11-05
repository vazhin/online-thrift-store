#### Online Thrift Store Website

this is supposed to be a website that people can add their second-hand products. And other people can contact them and buy the products. It's supposed to have a filtering functionility to view products based on city and category, etc.

Website Design:
[Figma file](https://www.figma.com/file/O0aK1iUPN4GSZW4q0DIo3O/online-thrift-store?node-id=0%3A1)

API Design [WIP]

Routes:

- [x] GET "/" -> product list ordered by most recent
- [x] POST "/login"
- [x] POST "/logout"
- [x] POST "/signup"
- [x] POST "/products" -> create a new product
- [x] GET "/product/:productId" -> product detail page
  - if owner is logged in, how will they edit the listing?
- [ ] GET "/user/:userId" -> profile page, see a list of all their products

To do:

- [x] Login and Signup
- [x] replace callbacks with promises or async/await
- [x] uploading product image
- [ ] implement the UI
- [ ] make it responsive
- [ ] product list pagination
- [ ] filtering
- [ ] store the sessions in a session storage, [Compatible Session Stores](http://expressjs.com/en/resources/middleware/session.html#compatible-session-stores)

Tech Debt:

- use an ORM instead of raw SQL
- convert JavaScript to TypeScript
