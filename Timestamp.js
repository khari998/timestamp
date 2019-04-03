const express = require('express');
const parse = require('body-parser');
const app = module.exports = express();

// parse data to JSON format with body parser
app.use(parse.json());

// Handle GET Request
app.get('/api/timestamp/:dVal', (req, res) => {
  let utcDate;
  let unixDate;

  const dVal = req.params.dVal; // pulls parameter from link

  // format the date
  const dStyle = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  if(isNaN(dVal)) { // handles natural dates
    utcDate = new Date(dVal).toLocaleDateString('en-us', dStyle);
    unixDate = new Date(dVal).getTime() * 0.001;
  } else { // handles unix numbers
    utcDate = new Date(dVal * 1000).toLocaleDateString('en-us', dStyle);
    unixDate = dVal;
  }
  // respond with the JSON object
  res.json({
    unix: unixDate, 
    utc: utcDate
  });
});

app.listen(3000, () => console.log(`Listening on 3000`) );
