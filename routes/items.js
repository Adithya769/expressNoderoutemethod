const mysql = require('mysql2')
var express = require('express');
// const {scheme} = require('mongoose');

var router = express.Router();
router.use(express.json());


var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee',
    multipleStatements: true
    });
    mysqlConnection.connect((err)=> {
        if(!err)
        console.log('Connection Successfully');
        else
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
        });


//Router to GET specific item detail from the MySQL database
// router.get('/', function(req, res, next) {
//     res.render('items', { message: 'Express' });
//   });
router.get('/' , (req, res) => {
    mysqlConnection.query('SELECT * from days', (err, rows, fields) => {
    if (!err)
    res.send(rows);
    // console.log(rows);
    else
    console.log(err);
    })
    } );
// Router to GET specific item detail from the MySQL database
router.get('/:day' , (req, res) => {
    mysqlConnection.query('SELECT * from days WHERE day = ?',[req.params.day], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );

// router.get('/add' , (req, res) => {
//             mysqlConnection.query('insert into days(day_name,month) values("sunday",2021);',[req.params.day_name], (err, rows, fields) => {
//             if (!err)
//             res.send(rows);
//             else
//             console.log(err);
//             })
//             } );
    
    router.get('/del/:day' , (req, res) => {
        mysqlConnection.query('DELETE FROM days WHERE day= ?;',[req.params.day], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
        })
        } );
        // router.get('/del/:day_name' , (req, res) => {
        //     mysqlConnection.query('DELETE FROM days WHERE day_name= ?;',[req.params.day_name], (err, rows, fields) => {
        //     if (!err)
        //     res.send(rows);
        //     else
        //     console.log(err);
        //     })
        //     } );

        
        router.get('/add' , (req, res) => {
            
            mysqlConnection.query('insert into days(day_name,month) values(?,?);', (err, rows, fields) => {
            if (!err)
            res.send(rows);
            else
            console.log(err);
            })
            } );

module.exports=router;

