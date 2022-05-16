const express = require("express");
const connection = require("./db");

const cartsTable = "carts";

const  router = express.Router()

router.post("/addcart",(req,res)=>{
     if(req.isAuth){
         const query =`insert into ${cartsTable}(productId,
            quantity,total,userId) VALUES("${req.body.cart}",)
            "${req.body.total}","${req.body.userId}",`;

            connection.query(query,(err,result)=>{
                if(err){
                    res.send(err)
                    return;
                }
                else{
                    res.send(result)
                    return
                }
            })

     }else{
         res.send({err:"please login"});
         return;
     }
})

router.patch("/addcart",(req,res)=>{
    if(req.isAuth){
        const query =`SELECT * FROM ${cartsTable} WHERE 
        userId = ${req.userId}`;

           connection.query(getCart,(err,result)=>{
               if(err){
                   res.send(err)
                   return;
               }
               else{
                   
               }
           })

    }else{
        res.send({err:"please login"});
        return;
    }
})

router.get("/cart",(req,res)=>{
    if(req.isAuth){
        const getCart = `SELECT * FROM ${cartsTable} WHERE
        userId = ${req.userId}`;
        connection.query(getCart,(req,res)=>{
            if(err){
                res.send(err);
                return;
            }
            else{
                res.send(results);
                return;
            }
        })
    }else{
        res.send({err:"please login"});
        return;
    }
})

module.exports = router;


