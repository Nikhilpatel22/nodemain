const express = require("express");
const app = express();
const http = require('http');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const Student = require("./models/student");
const fuser = require("./models/fuser")
const bcrypt = require('bcrypt');
const multer = require('multer');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const Book = require("./models/book");
var cors = require('cors')
const yaml = require('yaml')
require('./database/conn')
app.use(express.json());

const swaggerOptions={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Student Management API',
            version:'1.0.0',
            description:'Student Api for student management',
            servers:["http://localhost:3000"]
        }
    },
    apis:["swagger.js"]
}
const swaggerDocs=swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

app.use(express.json());

 /**
 * @swagger
 * /student:
 *  get:
 *   summary: get all student
 *   description: get all students
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */
app.get('/student',(req,res)=>{
    Student.find()
    .exec()
    .then((result)=>{
        res.status(200).json({
            StudentData:result
        });
    })
})
//use multer
var storage = multer.diskStorage({
    destination: './public/file/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({
    storage: storage
})


/**
 * @swagger
 * definitions:
 *  Book:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: name of the book
 *     example: 'nikhil'
 */

/**
  * @swagger
  * /api/books/addbook:
  *  post:
  *   summary: create books
  *   description: create nook for the organisation
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#definitions/Book'
  *   responses:
  *    200:
  *     description: book created succesfully
  *    500:
  *     description: failure in creating book
  */
 
 app.post('/api/books/addbook',(req,res,next)=>{
    console.log(req.body);  
            const book = new Book({
                name : req.body.name,               
            })
            book.save()
            .then((result)=>{
                res.status(200).json({
                    bookData:result
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    error:err
                });
            })
        })


// app.post('/api/books/addbook',(req,res)=>{
//     let bk = Book.find({}).sort({id:-1}).limit(1)
//     console.log(bk);
//     bk.forEach(obj=>{
//         if(obj){
//             let book = {
//                 id : obj.id +1,
//                 title : req.body.name
//             }
//             Book.insertOne(book,(err,result)=>{
//                 if(err) res.status(500).send(err)
//                 res.send('added successfully')
//             })
//         }
//     })
// })
/**
  * @swagger
  * /getid/:id:
  *  get:
  *   summary: get id with student
  *   description: get student
  *   responses:
  *    200:
  *     description: student created succesfully
  *    500:
  *     description: failure in creating employee
  */     
 app.get('/getid/:id',(req,res,next)=>{
    Student.find()
    .exec()
    .then((result)=>{
        res.status(200).json({
            StudentData:result
        });
    })
})

/**
 * @swagger
 * /update/{id}:
 *  put:
 *   summary: update Book
 *   description: update Bookd
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the book
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#/definitions/Book'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Book'
 *   responses:
 *    200:
 *     description: success
 */


//  app.put('/update/:id',(req,res)=>{
//      console.log(id)
// 	res.status(200).send('update successfully');
// })

app.put('/update/:id',(req,res,next)=>{
    id = req.params.id
    console.log(id);
	Book.updateOne({id},
	{
		$set:{
	name:req.body.name,
		}
	})
	.then((result)=>{
		res.status(200).json({
			update_book:result
		})
	})
	.catch((err)=>{
		console.log(err);
		res.status(500).json({
			error:err
		})
	})
})
/**
  * @swagger
  * /delete/616fc2f4b2dcdf45c99e3133:
  *  delete:
  *   summary: delete student
  *   description: delete student
  *   responses:
  *    200:
  *     description: student delete succesfully
  *    500:
  *     description: failure in delete student
  */  

app.delete('/delete/616fc2f4b2dcdf45c99e3133',(req,res)=>{
	fuser.deleteOne({_id:req.params.id})
	.then(result=>{
	res.status(200).json({
		message:'record delete',
		result:result
	})	
	})
	.catch(err=>{
		res.status(500).json({
			error:err
		})
	})
})
server.listen(port,(console.log(`server running in port number ${port}`)));
module.exports = app;
