const express = require("express");
const connection = require("./db");
const  router = express.Router();
ordersTable='order'
router.post('/createorder',(req,res)=>{
    if(req.isAuth){
        const createOrder=`INSERT INTO ${ordersTable} (cart,Address,PaymentId,UserId,CouponId,Total,discount) VALUES (${req.body.cart},${req.body.Address},${req.body.PaymentId},${req.body.userId},${req.body.CouponId},"${req.body.Total}","${req.body.discount})`;
        sql.query(createOrder,(err,results)=>{
            if(err){
                res.send(err);
                return;
            }
            else{
                res.send(results);
                return;
            }
        })
    }
    else{
        res.send({Err:"please login"});
        return;
    }
})
router.get("/order",(req,res)=>{
    if(req.isAuth){
        const getOrder = `SELECT * FROM${ordersTable} WHERE userId = ${req.userId}`
        connection.query(getOrder,(err,results)=>{
            if(err){
                res.send(err)
                return
            }else{
                res.send(results)
                return
            }
        })
    }else{
        res.send({Err:"please login"})
        return
    }
})
module.exports = router