const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {
    var service = require('./service.js');
    const reqUrl = url.parse(req.url, true);

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET, DELETE",
        "Access-Control-Allow-Headers": "*", 
    };
    if (req.method === "OPTIONS") {
        res.writeHead(204, headers);
        res.end();
    } else if(reqUrl.pathname == '/user' && req.method === 'GET'){
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getUser(req, res, headers);
    } else if(reqUrl.pathname == '/users' && req.method === 'GET'){
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getUsers(res, headers);
    } else if(reqUrl.pathname == '/currentuser' && req.method === 'GET'){
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getCurrentUser(res, headers);
    } else if(reqUrl.pathname == '/emails-sended' && req.method === 'GET'){
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getAllSendedEmails(req, res, headers); 
    } else if(reqUrl.pathname == '/emails-recieved' && req.method === 'GET'){
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getAllRecievedEmails(req, res, headers); 
    } else if(reqUrl.pathname == '/email' && req.method === 'GET'){
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.getUserEmail(req, res, headers); 
    } else if(reqUrl.pathname == '/currentuser' && req.method === 'POST'){
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.setCurrentUser(req, res, headers);
    } else if(reqUrl.pathname == '/send' && req.method === 'POST') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.sendEmail(req, res, headers);
    } else if(reqUrl.pathname == '/delete' && req.method === 'DELETE') {
        console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
        service.deleteEmail(req, res, headers);
    } else {
        console.log('Request Type: ' + req.method + ' Invalid Endpoint: ' + reqUrl.pathname);
        service.invalidRequest(res, headers);
    }
});