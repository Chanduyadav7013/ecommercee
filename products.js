const express=require('express');
const { is } = require('express/lib/request');
const sql=require('./db');
const productsTable='products';
const router=express.Router();
router.post('/add',(req,res)=>{
    if(req.isAuth){
        const addQuery=`INSERT INTO${productsTable}(name,desc,price,stock,image,brand,reviewId,tags,variants)
        VALUES("${body.name}","${body.desc}",${body,price},${body.stock},${files.productImg.data},"${body.brand}","${body.reviewId}","${body.tags}","${body.variants}")`;
        sql.query(addQuery,(err,results)=>{
            if(err){
                res.send(err);
                return;
            }
            else{
                res.send(results);
                return;
            }
        })
        router.get('allProducts',(req,res)=>{
            const query=`SELECT * FROM ${productsTable}`;
            sql.query(query,(err,results)=>{
                if(err){
                    res.send(err);
                    return;
                }
                else{
                    res.send(results);
                    return;
                }
            })
        })
        router.get('/:productId',(req,res)=>{
            const query=`SELECT * FROM ${productsTable} WHERE id=${req.params.productId}`;
            sql.query(query,(err,results)=>{
                if(err){
                    res.send(err);
                    return;
                }
                else{
                    res.send(results);
                    return;
                }
            })
        })
       router.patch('/update/:productId',(req,res)=>{
           if(req.isAuth){
               if(req.admin){
                   const body=req.body;
                   const productImg=req.files.productImg;
                if(productImg){
                    body.image=productImg.data;
                }
                const keys=Object.keys(body);
                const updateStr="";
                keys.forEach((e)=>str +=`${e}=${body[e]},`)
                updateStr=updateStr.slice(0,-1);
                const query=`UPDATE ${productsTable} SET ${str}
                WHERE id=${req.params.productId}`;
                sql.query(query,(err,results)=>{
                    if(err){
                        res.send(err);
                        return;
                    }
                    else{
                        res.send(results);
                    }
                })
               }
           }
       })
       router.delete('delete/:productId',(req,res)=>{
           if(req.isAuth){
               if(is.Admin){
                const deleteQuery=`Delete From ${addressTable} where id=${req.params.addressId}`;
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
               else{
                   res.send(err); 
                   return;
               }
           }
           else{
               res.send({err:'please login'});
               return;
           }
       })
    }
})
module.exports = router;