const express=require('express');
const bodyParser=require('body-parser');
const https=require('https');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    var url="https://v2.jokeapi.dev/joke/Any";
    https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on("data",(data)=>{
            var jokeData=JSON.parse(data);
            console.log(jokeData);
            if(jokeData.type=='single'){
                var joke=jokeData.joke;
                res.send("<h1>"+joke+"</h1>");
            }
            else{
                var setup=jokeData.setup;
                var delivery=jokeData.delivery;
                res.write("<h1> Question: "+setup+"</h1>");
                res.write("<h1> Answer: "+delivery+"</h1>");
            }
        });
        // response.pause();
    });
    // res.end();
    // res.sendFile(__dirname+"/one-liner.html");
});

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is Listening at port 3000.");
});