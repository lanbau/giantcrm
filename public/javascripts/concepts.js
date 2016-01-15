fetch('/concepts', {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Applications for U.S. loans to refinance and buy homes booked their biggest weekly rise in three months as mortgage rates fell from their highest in over five months, data released from the Mortgage Bankers Association showed on Wednesday. The mortgage industry group said its gauge on overall mortgage application activities rose 21.3 percent to 398.5 in the week ended Jan. 8 on a seasonally adjusted basis from a week earlier. This was the largest increase since a 25.5 percent gain in early October, according to MBA data. The average interest rate on 30-year fixed-rate mortgages on conforming loans declined to 4.12 percent from the prior weeks 4.20 percent, which was the highest since mid-July. The seasonally adjusted gauge on applications for refinancing increased 23.8 percent to 1,380.4 from the previous week, while the seasonally adjusted index on loan requests for home purchases grew 17.8 percent to 231.1 from one week earlier. Bolstered by strong fourth quarter growth in jobs and continuing low rates, the results are similar to levels we saw in early December, suggesting that the purchase market’s strong finish to 2015 may be continuing, Lynn Fisher, MBA’s Vice President of Research and Economics, said in a statement.',
    login: 'hubot'
  })
}).then(function (response) {
  return response.json()
}).then(function (json) {
  console.log(json)

  json.annotations.forEach(function (obj) {
    var ul = document.createElement('ul')
    ul.className = 'list-group'
    var li = document.createElement('li')
    li.className = 'list-group-item'
    var wikiLink = document.createElement('a')
    var span = document.createElement('span')
    span.className = 'badge'

    var wikiURL = obj.concept.id.replace('/graphs/wikipedia/en-20120601/concepts/', 'https://en.wikipedia.org/wiki/')
    var wikiLabel = obj.concept.label
    var watsonScore = obj.score
    console.log(wikiURL)
    console.log(wikiLabel)
    console.log(watsonScore)

    span.innerHTML = watsonScore
    wikiLink.href = wikiURL
    console.log(wikiLink)
    wikiLink.innerHTML = wikiLabel
    li.appendChild(span)
    li.appendChild(wikiLink)
    ul.appendChild(li)
    document.getElementById('chart_div').appendChild(ul)
  })
})
