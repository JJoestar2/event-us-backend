const { response } = require("express");
let auth = require("./app/services/auth.service");

it("should return an empty token", function() { 
    let user = auth.signin({email: "silver@gmail.com", password: ""});
    user.then((response) => {
        if(response.accessToken) {
            throw new Error(`expected user but got ${response.accessToken}`);
        }
    });
});

it("should return an user with access token", function() { 
    let user = auth.signin({email: "silver@gmail.com", password: "12345678"});
    user.then((response) => {
        if(!response.accessToken) {
            throw new Error(`expected user but got ${response.message}`);
        }
    });
});