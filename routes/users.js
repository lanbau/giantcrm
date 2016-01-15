var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('admin', {
    title: 'User',
    name: 'irvin',
    jackshit: 'some'
  })
})

module.exports = router
