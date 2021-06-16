const url = require('url');
const emails = require('./data/emails.json');
const fs = require('fs');

exports.getUser = function(req, res, headers) {
    const reqUrl = url.parse(req.url, true);

    if(reqUrl.query.email && reqUrl.query.password){
        var response = emails.users.filter((user) => {
            return user.email == reqUrl.query.email.toLowerCase() && user.password == reqUrl.query.password;
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

exports.getUsers = function(res, headers) {
    const response = emails["users"]

    if(response.length !== 0){
        res.writeHead(200, headers);
        res.end(JSON.stringify(response));
    } else {
        res.writeHead(404, headers);
        res.end(JSON.stringify(response));
    }
};

exports.getCurrentUser = function(res, headers) {
    var response = emails.current_user;

    if(response && response !== {}){
        res.writeHead(200, headers);
        res.end(JSON.stringify(response));
    } else {
        res.writeHead(404, headers);
        res.end(JSON.stringify(response));
    }
};

exports.getAllSendedEmails = function(req, res, headers) {
    const reqUrl = url.parse(req.url, true);

    if(reqUrl.query.email){
        var response = emails[reqUrl.query.email.toLowerCase()]

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

    if(reqUrl.query.email){
        var response = emails[reqUrl.query.email.toLowerCase()]

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

    if(reqUrl.query.email && reqUrl.query.id && reqUrl.query.class){
        var response = emails[reqUrl.query.email.toLowerCase()]

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

exports.setCurrentUser = function(req, res, headers) {
    body = '';

    req.on('data', function(chunk){
        body += chunk;
    });

    req.on('end', function(){
        postBody = JSON.parse(body);

        emails["current_user"] = {
            "id": postBody.id,
            "name": postBody.name,
            "username": postBody.username,
            "email": postBody.email,
            "password": postBody.password,
        };
        
        fs.writeFile('./src/back-end/data/emails.json', JSON.stringify(emails), (err) => {
            if(err) throw err;
        });
        
        res.writeHead(200, headers);
        res.end(JSON.stringify(emails));
    });
}

exports.sendEmail = function(req, res, headers) {
    body = '';

    req.on('data', function(chunk){
        body += chunk;
    });

    req.on('end', function(){
        postBody = JSON.parse(body);
        date = new Date().toLocaleString('en', { timeZone: 'America/Fortaleza' });

        length = emails[postBody.sender.toLowerCase()]["sent"].length
        emails[postBody.sender.toLowerCase()]["sent"][length] = {
            "id": length,
            "sender_name": postBody.sender_name,
            "sender": postBody.sender,
            "addressee": postBody.addressee,
            "date": date,
            "subject": postBody.subject,
            "body": postBody.body,
            "type": postBody.type
        };

        length = emails[postBody.addressee.toLowerCase()]["inbox"].length
        emails[postBody.addressee.toLowerCase()]["inbox"][length] = {
            "id": length,
            "sender_name": postBody.sender_name,
            "sender": postBody.sender,
            "addressee": postBody.addressee,
            "date": date,
            "subject": postBody.subject,
            "body": postBody.body,
            "type": postBody.type
        };
        
        fs.writeFile('./src/back-end/data/emails.json', JSON.stringify(emails), (err) => {
            if(err) throw err;
        });
        
        res.writeHead(200, headers);
        res.end(JSON.stringify(emails));
    });
};

exports.deleteEmail = function(req, res, headers) {
    const reqUrl = url.parse(req.url, true);
    if(reqUrl.query.email && reqUrl.query.id && reqUrl.query.class){
        if(emails[reqUrl.query.email.toLowerCase()] === undefined) {
            res.writeHead(404, headers);
            res.end(JSON.stringify({}));
        } else if(emails[reqUrl.query.email.toLowerCase()][reqUrl.query.class] === undefined){
            res.writeHead(404, headers);
            res.end(JSON.stringify({}));
        } else {
            var cont = -1;

            emails[reqUrl.query.email.toLowerCase()][reqUrl.query.class].forEach((email) => {
                if(email.id == reqUrl.query.id) {
                    cont = email.id;
                    current_email = email;
                    return
                }  
            })

            if(cont === -1) {
                res.writeHead(404, headers);
                res.end(JSON.stringify({}));
            } else {
                
                var change = []
                for(index = 0; index < emails[reqUrl.query.email.toLowerCase()][reqUrl.query.class].length; index ++) {
                    if(emails[reqUrl.query.email.toLowerCase()][reqUrl.query.class][index].id !== cont) {
                        change.push(emails[reqUrl.query.email.toLowerCase()][reqUrl.query.class][index]);
                    }
                }
                
                emails[reqUrl.query.email.toLowerCase()][reqUrl.query.class] = change;
                fs.writeFileSync('./src/back-end/data/emails.json', JSON.stringify(emails));
                /*
                fs.writeFile('./src/back-end/data/emails.json', JSON.stringify(emails), (err) => {
                    if(err) throw err;
                });
                */
                res.writeHead(200, headers);
                res.end(JSON.stringify({}));
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