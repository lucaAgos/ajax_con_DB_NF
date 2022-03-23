
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

var conn = mysql.createConnection({    //i valori sono variabili 
    host: "localHost",
    user: "luca",
    password: "1234",
    database: "ristorante"
});


apiServer.get("/log-in", (request, response) => {
    console.log("utente: " + request.query.user + " Password: " + request.query.password);

    conn.query(
        'SELECT count(*) AS utenti FROM persona WHERE nome ="' +
        request.query.user +
        '" AND cognome="' +
        request.query.password +
        '";',
        function (result,err) {
            console.log(result);
            if (result[0].utenti>=1) {
                response.status(200).json({ message: "login effettuato" });
            } else {
                response.status(400).json({ message: "login failed" });
            }
        }

    )


});

apiServer.get("/Sign-in", (request, response) => {
    console.log("utente: " + request.query.user + " Password: " + request.query.password);
    //devo fare un controllo se l'utene è già esistente e mandare 
    conn.query(
        'INSERT INTO persona(nome,cognome) VALUES (?,?)"' //per evitare SQL injection utiliziamo i ? 
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



