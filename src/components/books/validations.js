const { validationResult, body } = require('express-validator')

exports.results = (req) => {
    return validationResult(req);
  }

  exports.newBook = () => {
    return [
      body('room')
        .exists(checkNull = true)
    ]
  }

  /*
exports.newBook = () => {
    return [
      body('room')
        .custom((value) => {
          return bookModel.find({_id: value}, (err,res)=>{
            console.log(res)
            if (res.length > 0) {
              return Promise.reject('Email address already taken')
          }
          })
        }) 
    ]
  }*/