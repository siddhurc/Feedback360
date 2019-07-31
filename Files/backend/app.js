const express=require('express');
const mysql=require('mysql');
const bodyparser=require("body-parser");

const app = express();

var mails=[];
//mails.push('siddhurc@gmail.com','bharathchinthakula51@gmail.com');


const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'feedback360'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

app.use(bodyparser.json()); //for parsing json data

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS");
    next();
});



//to add the post to database
app.post("/api/feedbacks",(req,res,next)=>{
    let stmt = "update feedbacks set question1 = ?,question2= ?,question3= ?,feedbackStatus='completed' where feedbackId = ?";
    const feedback = req.body;
    let todo = [feedback.question1,feedback.question2,feedback.question3,feedback.feedbackId];
    db.query(stmt,todo,(err,result,fields)=>{
        if(err){
            console.log(err);
        } 
    });
    res.status(201).json({
  
        message:'successful'

    });//typical status code for everything is okay and resource was delivered

});


app.post("/api/feedbacknew",(req,res,next)=>{
    const feedbackData=req.body;
    //console.log(elements.feedbackOf);
    //console.log("this is inside the server");
    for(var i of feedbackData.feedbackFrom)
    {
        //console.log(i.name);
        let stmt="INSERT INTO feedbacks(requestedBy,feedbackOf,feedbackStatus,feedbackFrom) VALUES(?,?,?,?)";
        db.query(stmt,[feedbackData.feedbackRequestedBy,feedbackData.feedbackOf,"Initiated",i.name],(err,results,fields)=>{
            if(err){
                console.log(err);
            }
            else{
            }
        });   
    }
})








//to fetch the posts from the database
app.post('/api/feedbacks',(req, res, next)=>{
    console.log(req.body);
    console.log("getting posts");

    //  db.query("select * from feedbacks where requestedBy='Phani'",(err,result,fields)=>{
    //      if(err) 
    //      {
    //          throw err;
    //      }
    //      else
    //      {
    //        //temp=(JSON.stringify(result));
    //        res.json({
    //         message:'posts fetched successfully',feedbacks:result
    //     });
           
    //      }

    //  });
});


//sending mail from to the recipients.
app.post("/api/sendmail",(req,res,next)=>{

    var recipients=req.body;
    //sendMail("siddhurc@gmail.com");
    
    // var temp=JSON.stringify(mails);
    // console.log(temp);
    for(var recipient of recipients)
    {
        db.query("select employee_Mail_Id,employee_Name from employees where employee_Name= ?",recipient.name,(err,result,fields)=>{
            if(err) 
            {
                throw err;
            }
            else
            {
//                sendMail(result[0].employee_Mail_Id,recipient.name);
                sendMail(result[0].employee_Mail_Id,result[0].employee_Name);

            }
        });  
    }
})

//The below method is for login and authentication.
app.post("/api/login",(req,res,next)=>{
    var credentials=req.body;
    db.query("select password from employeecredentials where employee_Id = ?",[credentials.user],(err,result,fields)=>{
        var returnStatus="";
        if(err) 
        {
            throw err;
        }
        else
        {
            if(result.length>0)
            {
                var passwrd=result[0].password;
                if(passwrd === credentials.pwd)
                {
                    returnStatus="status1";//Logged in successfully
                
                }

                else{
                    returnStatus="status2";//Incorrect password
                }

            }
            else
            {
                returnStatus="status3";//User does not exist!! Please Check the username!!
            }   
        }
        res.json({message:returnStatus})
    }); 


})



//sending the user details like user name and designation
app.post("/getUserDetails",(req,res,next)=>{

    var userId=req.body;
    db.query("select employee_Name,employee_Designation from employees where employee_Id = ?",[userId.userId],(err,result,fields)=>{
        if(err) 
        {
            throw err;
        }
        else
        {
            res.json({userName:result[0].employee_Name,userDesignation:result[0].employee_Designation});


        }
    }); 
    

});


app.post("/api/getNamesForSuggestions",(req,res,next)=>{

    var users=[];
    db.query("select employee_Name from employees",(err,result,fields)=>{
        if(err) 
        {
            throw err;
        }
        else
        {
            for(var name of result)
                users.push(name.employee_Name);
            res.json(users);
        }
    }); 
});


app.post("/api/getFeedbackForList",(req,res,next)=>{

    db.query("select feedbackId,feedbackOf,requestedBy from feedbacks where feedbackFrom = ? and feedbackStatus='Initiated'",[req.body.feedbackFrom],(err,result,fields)=>{
        if(err) 
        {
            throw err;
        }
        else
        {
            res.json(result);
            // for(var name of result)
            //     feedbackNames.push;
                //users.push{name1:name.feedbackOf,name2:name.requestedBy};
            //res.json(users);
            //console.log(users);
           
        }
    }); 
});

app.post("/api/searchFeedbacks",(req,res,next)=>{

    console.log(req.body);
    if(req.body.feedbackFrom === null || req.body.feedbackFrom === '')
    {
        stmt="select feedbackId,requestedBy,feedbackFrom,feedbackOf,question1,question2,question3 from feedbacks where requestedBy = '"+req.body.requestedBy+"' and feedbackOf = '"+req.body.feedbackOf+"' and feedbackStatus='Completed'";
    }
    else
    {
        stmt="select feedbackId,requestedBy,feedbackFrom,feedbackOf,question1,question2,question3 from feedbacks where requestedBy = '"+req.body.requestedBy+"' and feedbackOf = '"+req.body.feedbackOf+"' and feedbackFrom = '"+req.body.feedbackFrom+"' and feedbackStatus='Completed'";
    }

    //console.log(req.body);

    db.query(stmt,(err,result,fields)=>{
        if(err) 
        {
            throw err;
        }
        else
        {
            console.log(result);
            res.json(result);
        }
    }); 
});



app.post("/api/forgotpassword",(req,res,next)=>{

    var employee_Id;
    var employee_Name;
    var randomCode=Math.random().toString(36).substring(5);
    console.log(req.body.email);
    db.query("select employee_Id,employee_Name from employees where employee_Mail_Id=?",[req.body.email],(err,result,fields)=>{
        if(err) 
        {
            throw err;
        }
        else
        {
            employee_Id=result[0].employee_Id;
            employee_Name=result[0].employee_Name;
            db.query("update employeecredentials set forgot_Password_Code = ? where employee_Id = ?",[randomCode,employee_Id],(err,result,fields)=>{
                if(err)
                {
                    throw err;
                }
                else
                {
                    sendForgotCodeMail(req.body.email,employee_Name,randomCode);
                }
            })
           
        }
    }); 
});


app.post("/api/codeValidation",(req,res,next)=>{

    var employee_Id;
    var databaseValidationCode;
    var statusMessage='';
    console.log(req.body);
    db.query("select employee_Id from employees where employee_Mail_Id=?",[req.body.email],(err,result,fields)=>{
        if(err) 
        {
            throw err;
        }
        else
        {
            console.log(result);
            employee_Id=result[0].employee_Id;
            db.query("select forgot_Password_Code from employeeCredentials where employee_Id = ?",[employee_Id],(err,result,fields)=>{
                if(err)
                {
                    throw err;
                }
                else
                {
                    databaseValidationCode=result[0].forgot_Password_Code;
                    if(databaseValidationCode === req.body.code)
                    {
                        db.query("update employeeCredentials set password = ? where employee_Id = ?",[req.body.password,employee_Id],(err,result,fields)=>{
                            if(err)
                                throw err;
                            else
                            {
                                statusMessage="updated";
                                passwordChangedMail(req.body.email);
                            }

                            
                        });
                    }
                    else
                    {
                        statusMessage="different";
                    }
                }
            })
           
        }
    }); 

    res.json(statusMessage);

    

    
});




function sendMail(recipientMail,recipientName)
{
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
         host: 'smtp.gmail.com',
        auth: {
         user: 'feedback360team@gmail.com',
         pass: 'bharath@407'
         }
}));
var mailOptions = {
  from: 'feedback360team@gmail.com',
  to: recipientMail,
  subject: 'New feedback request from RYTHMOS',
  text: "Hi "+recipientName+", You have a new feedback request.Please go to feedback360 portal to provide the feedback.  https://www.feedback360.com"
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent successfully: ' + info.response);
    sendText();   //uncomment this  line before execution!
  }
});  
}

function sendForgotCodeMail(recipientMail,recipientName,code)
{
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
         host: 'smtp.gmail.com',
        auth: {
         user: 'feedback360team@gmail.com',
         pass: 'bharath@407'
         }
}));
var mailOptions = {
  from: 'feedback360team@gmail.com',
  to: recipientMail,
  subject: 'Password change request from RYTHMOS',
  text: "Hi "+recipientName+", The confirmation code to change your password is "+code,
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent successfully: ' + info.response);
  }
});  
}


function passwordChangedMail(recipientMail)
{
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
         host: 'smtp.gmail.com',
        auth: {
         user: 'feedback360team@gmail.com',
         pass: 'bharath@407'
         }
}));
var mailOptions = {
  from: 'feedback360team@gmail.com',
  to: recipientMail,
  subject: 'Password change request from RYTHMOS',
  text: "Hello, Your password has been changed successfully",
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent successfully: ' + info.response);
  }
});  
}



function sendText()
{
    const Nexmo = require('nexmo');
    const nexmo = new Nexmo({
    apiKey: 'f8dfe87f',
    apiSecret: 'xH0auSAwTXioIymW',
    });

 

    const from = 'Nexmo';
    to = '919515795973';
    const text = 'You have a new feedback request.                      Feedback360team from RYTHMOS';

 

    nexmo.message.sendSms(from, to, text);
    console.log("Text message has been sent successfully!!!")
}



module.exports = app;