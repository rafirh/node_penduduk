'use strict'

const db = require('../database')

module.exports = {
    index: (req, res) => {
        let sql = "select * from data"
        db.query(sql, (err,result)=>{
            if (err) throw (err)
            res.json({
                message: "Success",
                data: result
            })
        })
    },
    add: (req, res) => {
        let data = {
            name: req.body.name,
            address: req.body.address
        }
        let sql = "insert into data SET ?";
        if(data.address && data.name){
            db.query(sql, data, (err) => {
                if (err){
                    throw err
                }else{
                    res.json({
                        message: "Added succes",
                        data
                    })
                }
            })
        }
    },
    delete: (req, res) => {
        let id = req.body.id;
        let data;
        if(id){
            let sql = "SELECT * from data where id = ?"
            db.query(sql, [id], (err,result) => {
                if(err){
                    throw err;
                }else{
                    data = result;
                }
            })
        }
        if(id){
            let sql = "DELETE from data where id = ?";
            db.query(sql, id, (err) => {
                if (err){
                    throw err
                }else{
                    res.json({
                        message: `ID ${id} deleted.`,
                        data: data[0]
                    })
                }
            })
        }
    },
    put: (req, res) => {
        let id = req.body.id;
        let new_dt = {
            name: req.body.name,
            address: req.body.address
        }
        let old_dt;

        if(id){
            let sql = "SELECT name,address FROM data WHERE id = ?";
            db.query(sql, [id], (err,result) => {
                if(err){
                    throw err;
                }else{
                    old_dt = result;
                }
            })
        }        
        setTimeout(update, 1);
        function update (){
            if(old_dt){
                let sql = "UPDATE data SET ? WHERE id = ?";
                db.query(sql, [new_dt, id], (err,result) => {
                    if(err){
                        throw err;
                    }else{
                        res.json({
                            message: `Succes update where id = ${id}`,
                            old_data: old_dt[0],
                            new_data: new_dt
                        })
                    }
                })
            }
        }
    }
}

