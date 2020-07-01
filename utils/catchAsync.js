const catchAsync = (func) => {
    // return (req, res, next) => func(req, res, next).catch(err => next(err))
    //  for catch() if you simply call another func like below, it will automatically pass the only parameter to the func
    return (req, res, next) => func(req, res, next).catch(next);
};
