const express = require('express');
const app = express();
const router = express.Router();
const shortid = require('shortid');
var bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
const urlMap = {};
app.use(bodyParser.json());

app.get('/data', (req,res) => {
    const urlList = [];
    Object.keys(urlMap).forEach(key => {
        urlList.push({'id':  key, 'longUrl': urlMap[key]});
    });
    res.send(urlList);
})

app.post('/urlShort',(req,res) => {
    const url = req.body.long_url;
    const id = shortid.generate();
    urlMap[id] = url;
    res.status(201).send({"short" : id});
    
});

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`)
  });