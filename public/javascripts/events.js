// to keep variables within function scope.
(function () { // eslint-disable-line

  document.getElementById('submitButt')
  .addEventListener('click', function (test) {
    var summary, location
    // var eject
    summary = document.getElementById('summary').value
    location = document.getElementById('location').value
    console.log(summary)
    console.log(location)
    var event = {
      'summary': summary,
      'location': location,
      'end': {
        'date': '2016-02-20'
      },
      'start': {
        'date': '2016-02-19'
      }
    }
    var request = gapi.client.calendar.events.insert({ // eslint-disable-line
      'calendarId': 'primary',
      'resource': event
    })

    request.execute(function (event) {
      console.log(event)
      document.getElementById('addevents').style.display = 'none'
      document.getElementById('addevents').innerHTML = '<div class="col-lg-12"><div class="panel panel-default"><div class="panel-body"><mark><h1>Event Added Successfully</h1></mark></div><div class="panel-footer"><button onclick="window.location.reload(false)" type="button" class="btn btn-success">Refresh</button></div></div></div>'
      document.getElementById('addevents').style.display = 'inline-block'
    })
  })

})() // eslint-disable-line
