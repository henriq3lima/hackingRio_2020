const { response } = require("express");
const express = require("express");
const router = express.Router();
const request = require("request");
const secretsKeys = require('./secrets/keys.js')

const app = express();


app.listen(process.env.PORT || 8000, function () {
    console.log("A API está funcionando!");
  });
  const hostname = "https://apigateway.serpro.gov.br/consulta-cpf-df/v1";
  var cpf = "15695947677"
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
      let output = JSON.parse(body)
      console.log(output)
      let nasc = new Date(
        output.nascimento.substr(4),
        output.nascimento.substr(2,2)-1,
        output.nascimento.substr(0,2)
        )
      let anos = (new Date() - nasc)/31536000000

      let sit = output.situacao.descricao
        
      return ({
        anos,
        sit
      })  
    }
    
  }
  
  app.get("/", (req, res) => {
    request(options,callApi)
    res.status(200).send(anos)
    
    
    
  });
