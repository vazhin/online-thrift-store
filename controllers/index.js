exports.renderHomepage = (req, res, next) => {
  const { products, numOfPages, numOfProducts, count } = res.locals;
  res.render('index', {
    products,
    numOfPages,
    numOfProducts,
    user: req.user,
    count,
  });
};
