const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", (req, res)=> {



    const url ="https://corona-api.com/countries";
    const urlAll = "https://corona.lmao.ninja/all";
    
    https.get(url, (response)=> {
        console.log(response.statusCode);
        
        let chunks = [];

        response.on("data", (data)=> {
            chunks.push(data);
        }).on('end', () =>{
        let allData   = Buffer.concat(chunks);
        let covidCases = JSON.parse(allData);
        
            https.get(urlAll, (response) => {

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

app.get("/india", (req, res) => {
    
        let url = "https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise";
        let urlContact = "https://api.rootnet.in/covid19-in/contacts";

        https.get(url, (response)=> {
            
            let chunks = [];

            response.on("data", (data)=> {
                chunks.push(data);
            }).on('end', () =>{
            let citiesData   = Buffer.concat(chunks);
            let indiaData = JSON.parse(citiesData);


                https.get(urlContact, (response)=> {
                
                    let chunky = [];
        
                    response.on("data", (data)=> {
                        chunky.push(data);
                    }).on('end', () =>{
                    let helpline  = Buffer.concat(chunky);
                    let helplineData = JSON.parse(helpline);


                            
                        res.render('india', {indiaData: indiaData, helplineData: helplineData});
            });

        });

    });


        
        });

    });
    app.get('/wiki', (req, res) => {
        res.render('wiki');
    });

    app.get('/about', (req, res) => {
        res.render('about');
    })


app.listen(process.env.PORT || 4000, () => {
    console.log("Port started!");
});

