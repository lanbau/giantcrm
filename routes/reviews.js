var express = require('express')
var router = express.Router()
var watson = require('watson-developer-cloud')

var personality_insights = watson.personality_insights({
  username: process.env.IBM_USERNAME,
  password: process.env.IBM_PASSWORD,
  version: 'v2'
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('reviews')
})

router.post('/', function (req, res, next) {
  console.log(req.body)
  personality_insights.profile({
    text: req.body
  },
  function (err, response) {
    if (err) {
      console.log('errors:', err)
    } else {
      var output = JSON.stringify(response, null, 2)
      console.log(output)
      res.send(output)
      res.end()
    }
  }
  )
})



module.exports = router
