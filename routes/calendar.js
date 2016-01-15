var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(process.env.IBM_USERNAME)
  res.render('calendar')
})

module.exports = router
