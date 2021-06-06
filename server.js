const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {
    var service = require('./service.js');
    const reqUrl = url.parse(req.url, true);

    if(reqUrl.pathname == '/user' && req.method === 'GET'){
        console.log('Request Type: ' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);
        
        service.getUser(req, res);
    } else if(reqUrl.pathname == '/emails' && req.method === 'GET'){
        console.log('Request Type: ' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);
        
        service.getAllUserEmails(req, res);
    } else if(reqUrl.pathname == '/emails-sended' && req.method === 'GET'){
        console.log('Request Type: ' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);
        
        service.getAllSendedEmails(req, res); 
    } else if(reqUrl.pathname == '/emails-recieved' && req.method === 'GET'){
        console.log('Request Type: ' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);
        
        service.getAllRecievedEmails(req, res); 
    } else if(reqUrl.pathname == '/email' && req.method === 'GET'){
        console.log('Request Type: ' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);
        
        service.getUserEmail(req, res); 
    } else if(reqUrl.pathname == '/send' && req.method === 'POST') {
        console.log('Request Type: ' +
        req.method + ' Endpoint: ' +
        reqUrl.pathname);

        service.sendEmail(req, res);
    } else if(reqUrl.pathname == '/response' && req.method === 'POST') {
        console.log('Request Type: ' +
        req.method + ' Endpoint: ' +
        reqUrl.pathname);

        service.sendResponse(req, res);
    } else if(reqUrl.pathname == '/foward' && req.method === 'POST') {
        console.log('Request Type: ' +
        req.method + ' Endpoint: ' +
        reqUrl.pathname);

        service.sendFoward(req, res);
    } else {
        console.log('Request Type: ' +
        req.method + ' Invalid Endpoint: ' +
        reqUrl.pathname);

        service.invalidRequest(req, res);
    }
})