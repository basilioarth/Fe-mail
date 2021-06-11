const url = require('url');
const emails = require('../back-end/data/emails.json');
const fs = require('fs');

exports.getUser = function(req, res, headers) {
    const reqUrl = url.parse(req.url, true);

    if(reqUrl.query.name){
        var response = emails.users.filter((user) => {
            return user.name == reqUrl.query.name.toLowerCase()
        })
        
        if(response.length === 0) {
            res.writeHead(404, headers);
        } else {
            res.writeHead(200, headers);
        }
        res.end(JSON.stringify(response));
    } else {
        res.writeHead(400, headers);
        res.end('Invalid-Request');
    }
};

exports.getAllUserEmails = function(req, res, headers) {
    const reqUrl = url.parse(req.url, true);

    if(reqUrl.query.name){
        var response = emails[reqUrl.query.name.toLowerCase()]

        if(response === undefined) {
            res.writeHead(404, headers);
            res.end(JSON.stringify({}));
        } else {
            res.writeHead(200, headers);
            res.end(JSON.stringify(response));
        }
    } else {
        res.writeHead(400, headers);
        res.end('Invalid-Request');
    }
};

exports.getAllSendedEmails = function(req, res, headers) {
    const reqUrl = url.parse(req.url, true);

    if(reqUrl.query.name){
        var response = emails[reqUrl.query.name.toLowerCase()]

        if(response === undefined) {
            res.writeHead(404, headers);
            res.end(JSON.stringify({}));
        } else if(response["sent"].length === 0) {
            res.writeHead(404, headers);
            res.end(JSON.stringify([]));
        } else {
            res.writeHead(200, headers);
            res.end(JSON.stringify(response["sent"]));
        }
    } else {
        res.writeHead(400, headers);
        res.end('Invalid-Request');
    }
};

exports.getAllRecievedEmails = function(req, res, headers) {
    const reqUrl = url.parse(req.url, true);

    if(reqUrl.query.name){
        var response = emails[reqUrl.query.name.toLowerCase()]

        if(response === undefined) {
            res.writeHead(404, headers);
            res.end(JSON.stringify({}));
        } else if(response["inbox"].length === 0) {
            res.writeHead(404, headers);
            res.end(JSON.stringify([]));
        } else {
            res.writeHead(200, headers);
            res.end(JSON.stringify(response["inbox"]));
        }
    } else {
        res.writeHead(400, headers);
        res.end('Invalid-Request');
    }
};

exports.getUserEmail = function(req, res, headers) {
    const reqUrl = url.parse(req.url, true);

    if(reqUrl.query.name && reqUrl.query.id && reqUrl.query.class){
        var response = emails[reqUrl.query.name.toLowerCase()]

        if(response === undefined) {
            res.writeHead(404, headers);
            res.end(JSON.stringify({}));
        } else if(response[reqUrl.query.class] === undefined){
            res.writeHead(404, headers);
            res.end(JSON.stringify({}));
        } else {
            response = response[reqUrl.query.class].filter((email) => {
                return email.id == reqUrl.query.id
            })
            
            if(response.length === 0) {
                res.writeHead(404, headers);
            res.end(JSON.stringify({}));
            } else {
                res.writeHead(200, headers);
                res.end(JSON.stringify(response));
            }
        }
    } else {
        res.writeHead(400, headers);
        res.end('Invalid-Request');
    }
};

exports.sendEmail = function(req, res, headers) {
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

        fs.writeFile('./emails.json', JSON.stringify(emails), (err) => {
            if(err) throw err;
        });

        res.writeHead(200, headers);
        res.end(JSON.stringify(emails));
    });
};

exports.deleteAllEmails = function(req, res, headers) {
    const reqUrl = url.parse(req.url, true);

    if(reqUrl.query.name && reqUrl.query.class){
        if(emails[reqUrl.query.name.toLowerCase()] === undefined) {
            res.writeHead(404, headers);
            res.end(JSON.stringify({}));
        } else if(emails[reqUrl.query.name.toLowerCase()][reqUrl.query.class] === undefined){
            res.writeHead(404, headers);
            res.end(JSON.stringify({}));
        } else {
            emails[reqUrl.query.name.toLowerCase()][reqUrl.query.class] = []
            fs.writeFile('./emails.json', JSON.stringify(emails), (err) => {
                if(err) throw err;
            });
            res.writeHead(200, headers);
            res.end(`All-${reqUrl.query.class}-emails-were-deleted`);
        }
    } else {
        res.writeHead(400, headers);
        res.end('Invalid-Request');
    }
};

exports.deleteEmail = function(req, res, headers) {
    const reqUrl = url.parse(req.url, true);
    if(reqUrl.query.name && reqUrl.query.id && reqUrl.query.class){
        if(emails[reqUrl.query.name.toLowerCase()] === undefined) {
            res.writeHead(404, headers);
            res.end(JSON.stringify({}));
        } else if(emails[reqUrl.query.name.toLowerCase()][reqUrl.query.class] === undefined){
            res.writeHead(404, headers);
            res.end(JSON.stringify({}));
        } else {
            var cont = -1;
            emails[reqUrl.query.name.toLowerCase()][reqUrl.query.class].forEach((email) => {
                if(email.id == reqUrl.query.id) {
                    cont = email.id;
                    return
                }  
            })

            if(cont === -1) {
                res.writeHead(404, headers);
                res.end(JSON.stringify({}));
            } else {
                emails[reqUrl.query.name.toLowerCase()][reqUrl.query.class][cont-1] = {}
                fs.writeFile('./emails.json', JSON.stringify(emails), (err) => {
                    if(err) throw err;
                });
                res.writeHead(200, headers);
                res.end(`User-${reqUrl.query.name}'s-id-${reqUrl.query.id}-${reqUrl.query.class}-email-was-deleted`);
            }
        }
    } else {
        res.writeHead(400, headers);
        res.end('Invalid-Request');
    }
};

exports.invalidRequest = function(res, headers) {
    res.writeHead(400, headers);
    res.end('Invalid-Request');
};