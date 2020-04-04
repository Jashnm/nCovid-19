const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.urlencoded({extended: true}));

// app.get("/", (req, res) => {
//     const url = "https://corona-api.com/timeline";

//     https.get(url, (response) => {
//         let chunky =[];

//         response.on("data", (data) => {
//             chunky.push(data);
//         }).on("end", () => {
//             let globalData = Buffer.concat(chunky);
//             let globalSummary = JSON.parse(globalData);


//             res.render('index', {'summary': globalSummary});
//         })
//     })
// })

app.get("/", (req, res)=> {


    // const url ="https://api.covid19api.com/summary";
    const url ="https://corona-api.com/countries";
    const url1 = "https://corona-api.com/timeline"
    
    https.get(url, (response)=> {
        console.log(response.statusCode);
        
        let chunks = [];

        response.on("data", (data)=> {
            chunks.push(data);
        }).on('end', () =>{
        let allData   = Buffer.concat(chunks);
        let covidCases = JSON.parse(allData);
        
            https.get(url1, (response) => {

                let chunky =[];

                response.on("data", (data) => {
                    chunky.push(data);
                }).on('end', ()=> {
                    let summary = Buffer.concat(chunky);
                    let globalSummary = JSON.parse(summary);






                    res.render('index', {covidCases: covidCases, globalSummary: globalSummary});
                });
            });

            // const countryName = covidCases.Countries[1].Country;

            // res.send("It's running!" + countryName);

            
        });

      
    });


});



app.listen(4000, () => {
    console.log("Port started!");
});

