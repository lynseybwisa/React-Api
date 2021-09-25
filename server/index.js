const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");


var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "cruddatabase"
});
db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

/*const db = mysql.createPool({
    host: "localhost",
    username:"root",
    password: "password",
    database: "cruddatabase",
});*/


/*app.get("/", (req, res) => {
    const sqlInsert =
        "INSERT INTO cruddatabase.movie_reviews (movieName, movieReview) VALUES ('Bad Neighbours', 'Good Movie');";
    db.query(sqlInsert, (err, result) => {
        res.send("hello Lynsey");
    });
});*/

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const sqlSelect =
        "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        //console.log(result);
        res.send(result);
    });
})
    
app.post("/api/insert", (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert =
        "INSERT INTO movie_reviews(movieName, movieReview) VALUES (?,?)";
    console.log(sqlInsert);
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        
    console.log(result);
    });
});

    app.listen(3001, () => {
        console.log("running on port 3001");
    });