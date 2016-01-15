var express = require('express')
var router = express.Router()
var watson = require('watson-developer-cloud')

var concept_insights = watson.concept_insights({
  username: process.env.IBM_CONCEPT_INSIGHTS_USER,
  password: process.env.IBM_CONCEPT_INSIGHTS_PASS,
  version: 'v2'
})

router.post('/', function (req, res, next) {
  console.log(req.body)
  var params = {
    graph: '/graphs/wikipedia/en-20120601',
    text: req.body.name
  }

// Retrieve the concepts for input text
  concept_insights.graphs.annotateText(params, function (err, response) {
    if (err) {
      console.log(err)
    } else {
      res.send(JSON.stringify(response, null, 2))
      res.end()
    }
  })
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('concepts')
})

module.exports = router
