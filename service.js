const url = require('url');
const emails = require('./emails.json');

exports.getUser = function(req, res) {
    const reqUrl = url.parse(req.url, true);
    var response = emails[reqUrl.query.name.toLowerCase()]

    if(response !== undefined) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end('Usuário não existente');
    }
}

exports.getAllUserEmails = function(req, res) {
    const reqUrl = url.parse(req.url, true);
    var response = '';

    if(reqUrl.query.name){
        response = emails[reqUrl.query.name.toLowerCase()]

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end('Invalid Request');
    }
};

exports.getAllSendedEmails = function(req, res) {
    const reqUrl = url.parse(req.url, true);
    var response = '';

    if(reqUrl.query.name){
        response = emails[reqUrl.query.name.toLowerCase()]["sent"]

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end('Invalid Request');
    }
};

exports.getAllRecievedEmails = function(req, res) {
    const reqUrl = url.parse(req.url, true);
    var response = '';

    if(reqUrl.query.name){
        response = emails[reqUrl.query.name.toLowerCase()]["inbox"]

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end('Invalid Request');
    }
};

exports.getUserEmail = function(req, res) {
    const reqUrl = url.parse(req.url, true);
    var response = '';

    if(reqUrl.query.name && reqUrl.query.id && reqUrl.query.class){
        response = emails[reqUrl.query.name.toLowerCase()][reqUrl.query.class]
        response = response.filter((email) => {
            return email.id == reqUrl.query.id
        })

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end('Invalid Request');
    }
};

exports.sendEmail = function(req, res) {
    body = '';

    req.on('data', function(chunk){
        body += chunk;
    });

    req.on('end', function(){
        postBody = JSON.parse(body);

        length = emails[postBody.sender.toLowerCase()]["sent"].length
        emails[postBody.sender.toLowerCase()]["sent"][length] = {
            "id": length + 1,
            "sender": postBody.sender,
            "addressee": postBody.addressee,
            "subject": postBody.subject,
            "body": postBody.body,
            "type": postBody.type
        };

        length = emails[postBody.addressee.toLowerCase()]["inbox"].length
        emails[postBody.addressee.toLowerCase()]["inbox"][length] = {
            "id": length + 1,
            "sender": postBody.sender,
            "addressee": postBody.addressee,
            "subject": postBody.subject,
            "body": postBody.body,
            "type": postBody.type
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(emails));
    });
};

exports.invalidRequest = function(req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end('Invalid Request');
};