
var express = require("express");
var apiServer = express();
var cors = require('cors')
apiServer.use(cors())
var fs = require("fs");  //manipoliamo il file system
const { response } = require("express");
const mysql = require('mysql2');
const { connect } = require("http2");
const { request } = require("http");

apiServer.listen(3000, "localhost", () => {
    console.log("Server in ascolto http://localhost:3000/");
    if (conn.connect) {
        console.log("connesso")
    } else {
        console.log("errore");
    }


});

var conn = mysql.createConnection({
    host: "agostinelli.luca.tave.osdb.it",
    user: "c164_UtenteProva",
    password: "Az-76441",
    database: "c164_provaDatabase"


});


apiServer.get("/log-in", (request, response) => {
    console.log("utente: " + request.query.user + " Password: " + request.query.password);

    conn.query(
        'SELECT count(*) AS persona2 FROM c164_provaDatabase.persona2 WHERE mail ="' +
        request.query.user +
        '" AND password="' +
        request.query.password +
        '";',
        function (result) {
            console.log(result);
            if (result[0].persona2 >= 1) {
                response.status(200).json({ message: "login effettuato" });
            } else {
                response.status(400).json({ message: "login failed" });
            }
        }

    )


});


apiServer.get("/sendData", (request, response) => {
    user();
    conn.query(
        'SELECT * FROM c164_provaDatabase.voti WHERE mail ="' +
        user() +
        '";',
    
    
        )
});


apiServer.get("/Sign-in", (request, response) => {
    console.log("utente: " + request.query.user + " Password: " + request.query.password);
    var user = request.query.user;
    function user() {
        return user;
    }

    //devo fare un controllo se l'utene è già esistente e mandare 
    conn.query(
        'INSERT INTO persona2(mail,password) VALUES (?,?)"' //per evitare SQL injection utiliziamo i ? 
        [request.query.user, request.query.password],
        function (result) {
            console.log(result);
            if (result) {
                response.status(200).json({ message: "login effettuato" });
            } else {
                response.status(400).json({ message: "login failed" });
            }
        }
    )
});



