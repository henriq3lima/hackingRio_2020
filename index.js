const express = require("express");
const router = express.Router();
const request = require("request");
const secretsKeys = require('./secrets/keys.js')

const app = express();


app.listen(process.env.PORT || 8000, function () {
    console.log("A API está funcionando!");
  });
  const hostname = "https://apigateway.serpro.gov.br/consulta-cpf-df/v1";
  var cpf = "09147215690"
  const path = `/cpf/${cpf}`;
  
var token = token_consultaCPF()
const options = {

    url: `${hostname}${path}`,
    headers: {
      'Accept': 'application/json'
      ,"Authorization": `Bearer ${token}`
      
    }
  };  

  function callApi(error, response, body) {
    if (!error && response.statusCode == 200) {
      let data = new Date()
      let output = JSON.parse(body)
      let idade = output.nascimento
      let nasc = new Date(
        idade.substr(4),
        idade.substr(2,2)-1,
        idade.substr(0,2)
        )
      console.log((data-nasc)/31536000000);
  

    }

  }

  app.get("/", (req, res) => {
    request(options,callApi)
    res.status(200).send("API-Banco NoSQL SQL");
  });

