#### Online Thrift Store Website

this is supposed to be a website that people can add their second-hand products. And other people can contact them and buy the products. It's supposed to have a filtering functionility to view products based on city and category, etc.

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
- Login and Signup
- Consistent error messages

Tech Debt:
- replace callbacks with promises or async/await
- use an ORM instead of raw SQL