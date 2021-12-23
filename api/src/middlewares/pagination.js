module.exports = (req, res, next) =>{
    //query ou então "params"
    const {limit = 5, skip = 0} = req.query;

    const pageLimit = parseInt(limit);
    const pageSkipe = pageLimit * parseInt(skip);

    req.pagination = {
        limit: pageLimit,
        skip: pageSkipe
    };
    next();
}