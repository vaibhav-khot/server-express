var express = require('express');
var fs = require('fs');
var app = express();

app.get('/', function(req, res){
  res.send('Server is runnimg');
});



app.get('/country',function (req,res) {
  console.log("country/");
countries_json= {
    country: [],
    zip:[]
  };

  fs.readFile('./country.json', "utf-8", (err, data) => {
    if (err) throw err;

    data = JSON.parse(data);

    console.log(data);

    for (var i = 0; i < data.country.length; i++) {
      countries_json.country.push(data.country[i].name);
        countries_json.zip.push(data.country[i].zip);
    }
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
// res.setHeader('Access-Control-Allow-Credentials', true);
    res.json(countries_json);
  });
});



app.get('/country/:state',function (req ,res) {
  console.log("country/:state");
state_json={
  state:[]
};
var a=req.params.state;
console.log(a);
fs.readFile('./country.json', "utf-8", (err, data) => {
   if (err) throw err;
   data = JSON.parse(data);
for (var i = 0; i < data.country.length; i++) {
  if(data.country[i].name==a){
    for (var l = 0; l < data.country[i].states.length;l++) {
      state_json.state.push(data.country[i].states[l].name);
    }
  }
}
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');//10.0.100.221
res.json(state_json);
 });
});


app.get('/:state', function(req, res) {
    console.log("country/state/city");
    city_json = {
        city: []
    };
    var a = req.params.state;
    console.log(a);
    fs.readFile('./country.json', "utf-8", (err, data) => {
        if (err) throw err;
        data = JSON.parse(data);
// console.log(typeof(data.country[0].states));
// var citydata = JSON.stringify(data.country[0].states).length;
// console.log(citydata);
        for (var i = 0; i < data.country.length; i++) {
          console.log(data.country[i].states);

            for (var l = 0; l < data.country[i].states.length; l++) {
                if (data.country[i].states[l].name === a) {
                    for (var m = 0; m < data.country[i].states[l].cities.length; m++) {
                        city_json.city.push(data.country[i].states[l].cities[m].name);
                    }
                }
            }
        }
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
        res.json(city_json);
    });
});

app.listen(3000);
