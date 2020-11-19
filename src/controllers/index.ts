import { Request, Response, NextFunction } from 'express';

export const renderHomepage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { products, numOfPages, numOfProducts, count } = res.locals;
  res.render('index', {
    products,
    numOfPages,
    numOfProducts,
    user: req.user,
    count,
  });
};
