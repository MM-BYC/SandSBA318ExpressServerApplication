/* 
-notFoundHandler middleware will catch any requests that don't match any route 
return a 404 response 
-errorHandler middleware will catch any errors thrown in your routes.
*/

const errorHandler = (err, req, res, next) => {
  console.error(err);
  statusCode = err.status || 500;
  res
    .status(statusCode)
    .send({ message: "Internal Server Error", statusCode: statusCode });
};

const notFoundHandler = (req, res, next) => {
  res.status(404).send({ message: "Page not found!", statusCode: 404 });
};

module.exports = { errorHandler, notFoundHandler };
