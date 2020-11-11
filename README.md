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
- [x] GET "/user/:userId" -> profile page, see a list of all their products
- [ ] DELETE "/product/:productId" -> delete product
- [ ] PUT "/user/:userId" -> update user info (maybe just profile pic)

To do:

- [x] Login and Signup
- [x] replace callbacks with promises or async/await
- [x] uploading product image
- [x] implement the UI
- [x] make it responsive
- [x] product list pagination
- [x] use an ORM instead of raw SQL
- [x] logging errors in server logs
- [x] Unique constraint on user table should apply to both username and email
- [x] update counts for product list and categories
- [ ] filtering
- [ ] profile picture changing
- [ ] product editing / deletion
- [ ] validation & error handling
- [ ] store the sessions in a session storage, [Compatible Session Stores](http://expressjs.com/en/resources/middleware/session.html#compatible-session-stores)
- [ ] localization

Tech Debt:

- propagating errors to the client (catching and displaying them)
- convert JavaScript to TypeScript
