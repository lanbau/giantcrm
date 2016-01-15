var express = require('express')
var router = express.Router()
var Cloudant = require('cloudant')

/* GET users listing. */
router.get('/', function (req, res, next) {
  var auth = {
    account: process.env.CLOUD_ACCT,
    key: process.env.CLOUD_USER,
    password: process.env.CLOUD_PASS
  }
  Cloudant(auth, function (err, cloudant) {
    if (err) {
      return console.log('Failed to initialize Cloudant: ' + err.message)
    }
    var db = cloudant.db.use('crmusers')
    db.get('_all_docs', { include_docs: true }, function (err, data) {
      if (err) {
        console.log(err)
      }
      var endpointsArray = data.rows.map(function (line) {
        return line.doc.endpointID
      })
      console.log(endpointsArray)
      endpointsArray.forEach(function (ep) {
        var GCM = require('gcm').GCM

        var apiKey = process.env.GCM_API_KEY
        var gcm = new GCM(apiKey)

        var message = {
          registration_id: ep // required
        }

        gcm.send(message, function (err, messageId) {
          if (err) {
            console.log('Something has gone wrong!')
          } else {
            console.log('Sent with message ID: ', messageId)
          }
        })
      })
    })
  })
  res.render('push')
})

module.exports = router
