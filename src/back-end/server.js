const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {
    var service = require('./service.js');
    const reqUrl = url.parse(req.url, true);

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET, DELETE",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Max-Age": 2592000, // 30 days
        /** add other headers as per requirement */
    };
    if (req.method === "OPTIONS") {
        console.log("Peguei o Preflight")
        res.writeHead(204, headers);
        res.end();
      } else if(reqUrl.pathname == '/user' && req.method === 'GET'){
        console.log("Entramos na rota do user")
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getUser(req, res, headers);
        /*
        res.writeHead(200, headers);
        res.end("Hello World");
        */
    } else if(reqUrl.pathname == '/emails' && req.method === 'GET'){
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getAllUserEmails(req, res);
    } else if(reqUrl.pathname == '/emails-sended' && req.method === 'GET'){
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getAllSendedEmails(req, res); 
    } else if(reqUrl.pathname == '/emails-recieved' && req.method === 'GET'){
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getAllRecievedEmails(req, res); 
    } else if(reqUrl.pathname == '/email' && req.method === 'GET'){
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getUserEmail(req, res); 
    } else if(reqUrl.pathname == '/send' && req.method === 'POST') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.sendEmail(req, res);
    } else if(reqUrl.pathname == '/response' && req.method === 'POST') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.sendResponse(req, res);
    } else if(reqUrl.pathname == '/foward' && req.method === 'POST') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.sendFoward(req, res);
    } else if(reqUrl.pathname == '/delete-all' && req.method === 'DELETE') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.deleteAllEmails(req, res);
    } else if(reqUrl.pathname == '/delete' && req.method === 'DELETE') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.deleteEmail(req, res);
    } else {
        console.log('Request Type: ' + req.method + ' Invalid Endpoint: ' + reqUrl.pathname);
        service.invalidRequest(req, res);
    }
});