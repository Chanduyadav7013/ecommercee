const express=require("express");
const req = require("express/lib/request");
const mysql=require("./db");
const router=express.Router();

const userTable='users';
const addressTable='address';

router.post('/add',(req,res)=>
{
    if(req.isAuth)
    {
        try{
            const addAdressQuery=`INSERT INTO ${addressTable} (line1,line2,landmark,city,state,pin,name,userId) VALUES ("${req.body.line1}","${req.body.line2}","${req.body.landmark}","${req.body.city}","${req.body.state}","${req.body.pin}","${req.body.name},"${req.userId}")`;
            
            sql.query(addAddressQuery,(err,results)=>
            {
                res.send(results);
                return;
            })
        }
            catch(err)
            {
               res.send({err:"please Login"});
               return;
            }
           }
    })

    router.get('/get',(req,res)=>
    {
        if(req.isAuth){
            try {
                const getAddressQuery=`SELECT *FROM ${addressTable} WHERE userId =${userId}`;

                sql.query(getAddressQuery,(err,results)=>
                {
                    if(err){
                        res.send(err);
                        return;
                    }
                    else{
                        res.send(results);
                        return;
                    }
                })
            } catch (error) {
                res.send(error)
            }
        }
    })

  router.get('/getNearByUsers',(requ,resp)=>
  {
      if(requ.isAuth){

        if(requ.admin)
        {
         const query=`SELECT users.*,address.* AS addressData  FROM ${userTable} AS users OUTER JOIN ${addressTable} as address ON users.id =address.userId`;

         sql.query(query,(err,results)=>
         {
             res.send(err);
         })
        }
        else{
          resp.send({err:"Unauthorised Access"});
          return;
        }
      }
      else{
          resp.send({err:"Please Login"});
          return;
      }
  })
router.delete('/delete/:addressId',(req,res)=>{
    if(req.isAuth){
        try{
          const deleteQuery=`Delete From ${addressTable} where id=${req.params.addressId}`
          sql.query(deleteQuery,(err,results)=>{
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
        catch(err){
           res.send(err);
        }
    }
}) 
router.put('/update/:addressId',(req,res)=>{
    if(req.isAuth){
        try{
           const body=req.body;
           const keys=Obj.keys(body);
           let str=' ';
           keys.forEach((e)=> {
               str+=`${e}=${body[e]},`
           });
           str=str.slice(0,-1);
           const updateQuery=`UPDATE ${addressTable} SET ${str} WHERE id=${req.params.addressId}`
           sql.query(updateQuery,(err,results)=>{
               if(err){
                   res.send(err);
                   return;
               }
               else{
                   res.send(results);
               }
           })
        }
        catch(err){
            res.send(err);
            return;
        }
    }
   else{

   }
})
  
    module.exports=router;