// this middleware takes in input schema and schema scope (body,
// params) and returns a validation function which validates the
// schema upon invocation
const validateInput = (inputSchema, schemaScope) => {
  // defining a method to validate incoming request body data
  const requestBodyValidator = async (req, res, next) => {
    try {
      // validating incoming request body
      if (!Object.keys(req.body).length) {
        // this code runs in case incoming request body is empty

        // logging error message to the console
        console.log(`Incoming request body can't be empty.`);

        // returning the response with an error message
        return res.status(400).json({
          hasError: true,
          message: `ERROR: Data Validation Failed.`,
          error: {
            error: `Incoming request body can't be empty.`,
          },
        });
      }

      // validating the incoming schema
      const validationResult = await inputSchema.validateAsync(req.body, {
        abortEarly: false,
      });

      // forwarding the request to the next handler
      next();
    } catch (error) {
      // this code runs in case the incoming data's validation fails against
      // defined schema

      // consrtucting string describing data validation errors
      const errorDescription = `${error.details
        .map(
          (entry, i) =>
            `${entry.message.replace(/"/g, `'`)}${
              !entry.message.endsWith(`.`) ? `.` : ``
            }`
        )
        .join(` `)}`;

      // logging error messages to the console
      console.log(`Data Validation Failed.`);

      // returning the response with an error message
      return res.status(400).json({
        hasError: true,
        message: `ERROR: Data Validation Failed.`,
        error: {
          error: errorDescription,
        },
      });
    }
  };

  // defining a method to validate incoming request query data
  const requestQueryValidator = async (req, res, next) => {
    try {
      // validating incoming request body
      if (!Object.keys(req.query).length) {
        // this code runs in case incoming request body is empty

        // logging error message to the console
        console.log(`Incoming request query can't be empty.`);

        // returning the response with an error message
        return res.status(400).json({
          hasError: true,
          message: `ERROR: Data Validation Failed.`,
          error: {
            error: `Incoming request query can't be empty.`,
          },
        });
      }

      // validating the incoming schema
      const validationResult = await inputSchema.validateAsync(req.query, {
        abortEarly: false,
      });

      // forwarding the request to the next handler
      next();
    } catch (error) {
      // this code runs in case the incoming data's validation fails against
      // defined schema

      // consrtucting string describing data validation errors
      const errorDescription = `${error.details
        .map(
          (entry, i) =>
            `${entry.message.replace(/"/g, `'`)}${
              !entry.message.endsWith(`.`) ? `.` : ``
            }`
        )
        .join(` `)}`;

      // logging error messages to the console
      console.log(`Data Validation Failed.`);
      console.log(errorDescription);

      // returning the response with an error message
      return res.status(400).json({
        hasError: true,
        message: `ERROR: Data Validation Failed.`,
        error: {
          error: errorDescription,
        },
      });
    }
  };

  // defining a method to validate path params of url for incoming request
  const requestPathParamsValidator = async (req, res, next) => {
    try {
      // validating incoming request's path params
      if (!Object.keys(req.params).length) {
        // this code runs in case incoming request's path params is empty

        // logging error message to the console
        console.log(`Incoming request path params can't be empty.`);

        // returning the response with an error message
        return res.status(400).json({
          hasError: true,
          message: `ERROR: Data Validation Failed.`,
          error: {
            error: `Incoming request path params can't be empty.`,
          },
        });
      }

      // validating the incoming schema
      const validationResult = await inputSchema.validateAsync(req.params, {
        abortEarly: false,
      });

      // forwarding the request to the next handler
      next();
    } catch (error) {
      // this code runs in case the incoming data's validation fails against
      // defined schema

      // consrtucting string describing data validation errors
      const errorDescription = `${error.details
        .map(
          (entry, i) =>
            `${entry.message.replace(/"/g, `'`)}${
              !entry.message.endsWith(`.`) ? `.` : ``
            }`
        )
        .join(` `)}`;

      // logging error messages to the console
      console.log(`Data Validation Failed.`);
      console.log(errorDescription);

      // returning the response with an error message
      return res.status(400).json({
        hasError: true,
        message: `ERROR: Data Validation Failed.`,
        error: {
          error: errorDescription,
        },
      });
    }
  };

  // defining a method to let the request pass without any validation
  const requestDummyValidator = async (req, res, next) => {
    // forwarding the request to the next handler
    next();
  };

  // returning the function upon invocation by the router
  return schemaScope.toUpperCase() === "BODY"
    ? requestBodyValidator
    : schemaScope.toUpperCase() === "PARAMS"
    ? requestPathParamsValidator
    : schemaScope.toUpperCase() === "QUERY"
    ? requestQueryValidator
    : requestDummyValidator;
};

// exporting as a module
module.exports = {
  validateInput,
};
