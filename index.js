const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// hardcode catch rate 50%
app.get('/catchrate', (req, res) => {
  res.json({
    'catch_rate': 0.5
  })
})

// release pokemon using random number only 1-100, number higher than 100 have higher fail rate
app.get('/release', (req, res) => {
  var random_number = getRandomNumber(1, 100)
  res.json({
    'random_number': random_number,
    'isPrime': isPrime(random_number)
  })
})

// rename pokemon
app.get('/rename', (req, res) => {
  var name = req.body.name
  var rename_counter = req.body.counter + 1
  res.json({
    'new_name': name + '-' + fibonacciIterative(rename_counter),
    'counter': rename_counter
  })
})


function fibonacciIterative(n) {
  let a = 0, b = 1, temp;
  if (n === 0) return a;
  if (n === 1) return b;
  for (let i = 2; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

function isPrime(number) {
  if (number <= 1) {
    return false;
  }

  if (number <= 3) {
    return true;
  }

  if (number % 2 === 0 || number % 3 === 0) {
    return false;
  }

  let i = 5;
  while (i * i <= number) {
    if (number % i === 0 || number % (i + 2) === 0) {
      return false;
    }
    i += 6;
  }

  return true;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}