const bcrypt=require('bcrypt');
const express=require('express')
const sql=require('./db');
const jwt=require('jsonwebtoken');
const router=express.Router();
const userTable='user';
router.post('/register',async(req,res)=>{
    const body=req.body;
    const salt=bcrypt.genSaltSync();
    const password=bcrypt.hashSync(body.password,salt);
    const registerQuery=`
    INSERT INTO${userTable}(name,email,password,phone)
    VALUES ("${body.name}",${body.email}",${password},${body.phone})
    `;
    const checkEmailPhone=`
    SELECT *FROM ${userTable} WHERE email="${body.email}" OR phone=${body.phone}`;
    sql.query(checkEmailPhone,(req,results)=>{
        if(results.length>0){
            res.send({err:"user already registered"});
            return;
        }
        else{
            sql.query(registerQuery,(err,res)=>{
                if(err){
                    res.send(err);
                    return;
                }
                res.send(res);
                return;
            })
        }
    })
})
router.post('/login',(res,req)=>{
    const findEmailQuery=`SELECT id,email,password FROM ${userTable} WHERE email="${req.body.email}"`;
    sql.query(findEmailQuery,(err,results)=>{
        if(results.length>0){
            const checkpass=bcrypt.compareSync(req.body.password.results[0].password);
            if(checkpass){
                const token=jwt.sign({
                    id:results[0].id,
                    email:results[0].email
                },process.env.JWT_KEY);
                res.send(token);
                return;
            }
            else{
                res.send({err:"wrong password"})
            }
        }
    })
})
router.patch("/updateWishlist/:productId",(req,res)=>{
    if(req.isAuth){
       const getWishlist = `SELECT wishlist from ${userTable}
       WHERE id =${req.userId}`;

       sql.query(getWishlist,(err,wishlistArr)=>{
           if(err){
               res.send(err)
           }
           else{
               const wishlist = wishlistArr[0].wishlist;
               const wishArr = JSON.parse(wishlist);
               const temp = wishArr.filter(a=>a !=req.params.productId);
               if(temp.length != wishArr.length){
                  updateQuery = `UPDATE ${userTabel} SET
                  wishlist=${JSON.stringify(temp)} WHERE id =${req.userId}`;
               }
                  else{
                      wishArr.push(req.params.productId);
                      updateQuery = `UPDATE ${userTabel} SET
                      wishlist=${JSON.stringify(temp)} WHERE id =${req.userId}`;
                   }
                   sql.query(updateQuery,(err,results)=>{
                       if(err){
                           res.send(err);
                           return;
                       }
                       else{
                           res.send(results)
                           return;
                       }
                   })
                }
       })
    }
    else{
        res.send({err:"email not founnd"});
        return;
    }
})
router.post('/changePass',(req,res)=>{
    if(req.isAuth){
        const salt=bcrypt.genSaltSync();
        const password=bcrypt.hashSync(body.password,salt);
        const updatepass=`UPDATE ${userTable} SET password=${password}" WHERE id=${req.userId}`;
        sql.query(updatepass,(err,results)=>{
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
        const getUser=`SELECT email FROM ${userTable} WHERE email=${req.body.email}"`;
        sql.query(getUser,(err,results)=>{
            if(err){
                res.send(err);
                return;
            }
            if(results.length==0){
                res.send({err:"EMail not registered"});
                return;
            }
            else{
                const token=jwt.sign({
                    email:req.body.email,
                    userId:results[0].id},
                    process.env.JWT_KEY,{expiresIn:'2days'});
                    res.send(token);
                    return;
               }
            })
    }
})

router.post('/verifyAndChangePass',(req,res)=>{
    const query=req.query;
    if(!query){
        res.send({err:"wrong link"});
        return;
    }
    const token=query.token;
    if(!token){
        res.send(err);
        return;
    }
const verifyToken=jwt.verify(token,process.env.JWT_KEY);
if(verifyToken){
    const email=verifyToken.email;
    const salt=bcrypt.genSaltSync(req.body.password,salt);
    const password=bcrypt.hashSync(req.body.password,salt);
    const updatePass=`UPdate ${userTable} SET password="${password}" WHERE email="{email}"`;
    sql.query(updatePass,(err,results)=>{
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
    res.send({err:"Invalid Token"});
    return;
}
})
module.exports=router;