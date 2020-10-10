const express = require("express");
const router = express.Router();
const request = require("request");
const secretsKeys = require('./secrets/keys.js')

const app = express();


app.listen(process.env.PORT || 8000, function () {
    console.log("A API está funcionando!");
  });
  const hostname = "https://apigateway.serpro.gov.br/consulta-cpf-df/v1";
  const path = "/cpf/";
  
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
      console.log(body);
    }

  }


  app.get("/", (req, res) => {
    request(options,callApi)
    res.status(200).send("API-Banco NoSQL SQL");
  });

