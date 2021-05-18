// Modules
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const { map, parseJSON } = require("jquery");






const port = 3001;









const app = express();
app.use(express.json());


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


// logger setup
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// static files
app.use(express.static("public"));
app.use('/images', express.static('images')); 

// routes.



// local veribles 
const pokemon_popularity = new Map();
var obj = new Object();
//helper function to add all image to json flile
function addImageToJson(data){
    
    for(let i=0; i<151;i++){
        let PokeNumber =i+1;    
        if(PokeNumber<10){
           data[i]["img"]= "images/00"+ PokeNumber.toString() + ".png";
        }
        else if(PokeNumber>=10 && PokeNumber<=99){
            data[i]["img"]= "images/0"+ PokeNumber.toString() + ".png";
        }
        
        else 
        {
            data[i]["img"]= "images/"+ PokeNumber.toString() + ".png";
        }
    }
    return data;

    
}

function PopArryAdd(n){

    var count = 0;
    
    if(pokemon_popularity.size==0){
        pokemon_popularity.set(n,count+1);
        return;
    }
       
    for(let i of pokemon_popularity.keys()){
            if(i==n){
                var popN = pokemon_popularity.get(i);   
                pokemon_popularity.set(n,popN+1);
                return;
            }
            
               
        }
        pokemon_popularity.set(n,count+1);
        return;
    
    
    
    

}

//helpr fun to find specfic profile by id and retun it to load that profile.
function findProfile(data,id){
    data = addImageToJson(data);
    for (var key of Object.keys(data)) {
        if(key == id){
        /*console.log(data[key-1]);*/
        return data[key-1];
    }
    }
}

function MaxProfiles(data){
      
    data = addImageToJson(data);

    
    const mapSort1 = new Map([...pokemon_popularity.entries()].sort((a, b) => b[1] - a[1]));
    return mapSort1;
    
    


     

    
}
    

function ReturnPopProfle(data){
    mapSort1= MaxProfiles(data);
   
    var one;
    var two;
    var three;
    const iterator1 = mapSort1.keys();
        one=iterator1.next().value;
        two=iterator1.next().value;
        three=iterator1.next().value;
   
    for(var key of Object.keys(data)){
        if(key == one ){
           obj[0] = data[key-1];
        }
        if(key == two ){
            obj[1] = data[key-1];
         }
         if(key == three ){
            obj[2] = data[key-1];
         }

        
        
         
        
    }   




    return obj; 

    
}
    
   
    
    



    
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
// catch 404 and forward to error handler




app.get("/",function(req,res){      
    fs.readFile('pokemons.json', 'utf8', function (err, data) {

        if (err) throw err;
        
     
    if(typeof(ReturnPopProfle(JSON.parse(data))) === 'undefined'){
        res.render('home',{pop :  ReturnPopProfle(JSON.parse(data))});
    }
    else
      res.render('home',{pop :  ReturnPopProfle(JSON.parse(data))});
    
   
    
    
   });
  });





app.get('/pokemons', (req, res) => {
    fs.readFile('pokemons.json', 'utf8', function (err, data) {

        if (err) throw err;
        
        res.render('index',{result :  addImageToJson(JSON.parse(data))});
        

   

      });
    });
 

       

//run over the json with help fun and return only the pokemon id profile
app.get("/pokemons/:id", (req, res,next) => {
    fs.readFile('pokemons.json', 'utf8', function (err, data) {

        if (err) throw err;

    PopArryAdd(req.params.id);
           
    res.render('profile',{profile : findProfile(JSON.parse(data),req.params.id)});

    
    }); 
});
//by click profile id.






app.use((req, res) => res.sendStatus(404));

app.listen(port,function(){
    console.log("server started on port 3001 ")
});

module.exports = app;
