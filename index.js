'use strict'

const express = require("express");

const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))

const db = require ('./database');
db.connect(error =>{
    if(error) throw error
    console.log ("mysql connected")
})

//endpoint
app.get("/", (req,res) => {
    res.send({
        message:"Berhasil menjalankan get",
        data: {
            description :
            "berhasil menampilkan data"
        }
    })
})

app.use("/penduduk",require('./routes/penduduk.route'))

const port = 8080;
app.listen(port , () => console.log (`Berhasil ${port}`))