var mongoose = require('mongoose');
var express = require('express');
//var faker  = require('faker');
var path   = require('path');
var Student = require('./models/student');
var user = require('./models/user');
var XLSX = require('xlsx');
require('./database/conn')

// //connect to db
// mongoose.connect('mongodb://localhost:27017/exportExcel',{useNewUrlParser:true})
// .then(()=>console.log('connected to db'))
// .catch((err)=>console.log('error in connection',err));

//init app
var app = express();

//set the template engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'view'));

//set the static folder path
app.use(express.static(path.resolve(__dirname,'public')));

//default page
app.get('/',(req,res)=>{
    Student.find((err,data)=>{
             if(err){
                console.log(err)
             }else{
                 if(data!=''){
                     res.render('excelhome',{data:data});
                 }else{
                     res.render('excelhome',{data:''});
                 }
             }
    })
});
app.post('/exportdata',(req,res)=>{
  //const filename = Math.random() + '.xlsx';
    var wb = XLSX.utils.book_new(); //new workbook
    Student.find((err,data)=>{
        if(err){
            console.log(err)
        }else{
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            workSheet.getCell('').font = {color: {argb: "004e47cc"}};
            var down = __dirname+'/public/student.xlsx'
           XLSX.utils.book_append_sheet(wb,ws,"sheet1");
           XLSX.writeFile(wb,down);
           res.download(down);
        }
    });
});

var port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at '+port));