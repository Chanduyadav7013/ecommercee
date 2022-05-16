const express=require('express');
const stripe=require('stripe')(process.env.STRIPE_KEY);
const sql=require('./db');
const router=express.Router();
router.post('/saveCustomer',async(req,res)=>{
    try{
        if(req.isAuth){
            const selectUser=`SELECT * FROM user WHERE id =${req.userId}`;
            sql.query(selectUser ,async (err,results)=>{
                if(err){
                    res.send(err);
                    return;
                }
            
             const customer=await stripe.customers.create({
                 name:results[0].name,
                 email:results[0].email,
                 phone:results[0].phone
        
             });
             const saveCustomer=`INSERT INTO customers(userId,cId,balance,payment_source,currency)VALUES (${req.userId},"${customer.id}",${customer.balance},"${customer.default_source}","${customer.currency}")`;
             sql.query(saveCustomer,(err,result)=>{
                 if(err){
                     res.send(err);
                     return;
                 }
                 else{
                     res.send(customer);
                     return;
                 }
             })
            })
        }
        else{
            res.send({err:"Please Login"});
            return;
        }
    }
    catch(err){
        res.send(err);
        return;
    }
})
router.post('/paymentmethod',async(req,res)=>{
try{
   if (req.isAuth){
    const stripe = require('stripe')(process.env.STRIPE_KEY);
    const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: req.body.number,
          exp_month: req.body.exp_month,
          exp_year: req.body.year,
          cvc: req.body.cvv
        },
      });
    const insertQuery=`INSERT INTO customers(userId,pmId,fingerprints,last4,exp_year,exp_month)VALUES (${req.userId},"${paymentMethod.Id}",${paymentMethod.card.fingerprint},${paymentMethod.last4}"${paymentMethod.exp_year}","${paymentMethod.card.exp_month}")`;
             sql.query(insertQuery,(err,result)=>{
                 if(err){
                     res.send(err);
                     return;
                 }
                 else{
                     res.send(customer);
                     return;
                 }
             })
   }
}
catch(err){
    res.send(err);
    return;
}
})
module.exports = router;