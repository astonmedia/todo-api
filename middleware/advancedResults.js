const advancedResults = (model, populate) => async (req, res, next) => {
  let query;
  // Copy request query
  const reqQuery = { ...req.query };
  // Create an array of fields to exclude from the filter
  const removeFields = ["select", "sort", "limit", "page"];
  // Loop over removeFields and delete them reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);
  // Convert query to string
  let queryStr = JSON.stringify(reqQuery);
  // Find query param and add '$' in front of it
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  // Create the find method with query params
  console.log(JSON.parse(queryStr));
  query = model.find(JSON.parse(queryStr));

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();
  query = query.skip(startIndex).limit(limit);
  console.log(query);
  // if populate is passed into function
  if (populate) {
    query = query.populate(populate);
  }
  // Query Model with above filter
  const results = await query;
  // Pagination results
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };
  next();
};

module.exports = advancedResults;
