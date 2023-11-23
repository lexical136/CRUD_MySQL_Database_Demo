// Load the NodeJS modules required

var http = require("http"); // creating an API using http
var url = require("url"); // using url to extract the route (e.g. /, /api/user)
var querystring = require("querystring"); // this will contain the body of the POST request
var fs = require("fs"); // file handling to read the index.html served for / route
var port = 8000; // port the server with listen on

var server = http.createServer(); // create the server


///////////////////////////////
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "nodeuser",
  password: "nodeuser",
  database: "users"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("");
  console.log("Connected To SQL Database!"+"\n");
});

///////////////////////////////

// this is the in-memory database that holds the JSON records
// supplied by the POST request via route /api/user
var testbase= [];

// listen for requests from clients
server.on("request", function (request, response) {
  var currentRoute = url.format(request.url); // get the route (/ or /api/user)
  var currentMethod = request.method; // get the HTTP request type (POST - Create; GET - Retrieve)
  var requestBody = ""; // will contain the extracted POST data later

  // determine the route (/ or /api/user)
  switch (currentRoute) {
    //
    // If no API call made then the default route is / so
    // just return the default index.html file to the user.
    // This contains the forms, etc. for making the CRUD
    // requests (only Create and Retrieve implemented)
    //
    case "/":
      fs.readFile(__dirname + "/index.html", function (err, data) {
        // get the file and add to data
        var headers = {
          // set the appropriate headers
          "Content-Type": "text/html",
        };
        response.writeHead(200, headers);
        response.end(data); // return the data (index.html)
      }); // as part of the response

      break;

    //
    // Handle the requests from client made using the route /api/user
    // These come via AJAX embedded in the earlier served index.html
    // There will be a single route (/api/user) but two HTTP request methods
    // POST (for Create) and GET (for Retrieve)
    //
    case "/api/user":
      // Handle a POST request;  the user is sending user data via AJAX!
      // This is the CRUD (C)reate request. These data need to be
      // extracted from the POST request and saved to the database!






      


      if (currentMethod === "POST") {
        // read the body of the POST request
        request.on("data", function (chunk) {
          requestBody += chunk.toString();
        });

        // determine the POST request Content-type (and log to console)
        // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
        const { headers } = request;
        let ctype = headers["content-type"];
        //console.log("RECEIVED Content-Type: " + ctype + "\n");

        // finished reading the body of the request
        request.on("end", function () {
          var userData = "";
          // saving the user from the body to the database
          if (ctype.match(new RegExp('^application/x-www-form-urlencoded'))) {
            userData = querystring.parse(requestBody);
          } else {
            userData = JSON.parse(requestBody);
          }
          //userDatabase.push(userData);
          // log the user data to console
          //console.log(
            //"USER DATA RECEIVED: \n\n" +
              //JSON.stringify(userData, null, 2) +
              //"\n"
          //);
          // respond to the user with confirmation message
          
          ////////////////////////////////////////// C (create)
          if(userData.op=="add")
          {
            var headers = {
              "Content-Type": "text/plain",
            };
            response.writeHead(200, headers);
            response.end(
              "User (" +
                userData.firstname +
                " " +
                userData.surname +
                ") data added to the Database!"
            );

            con.connect(function(err) {
              //if (err) throw err;
              var Q="INSERT INTO `userp`(`Title`, `First Name`, `Surname`, `Mobile`, `Email`) VALUES ("+"'"+userData.title+"',"+"'"+userData.firstname+"',"+"'"+userData.surname+"',"+"'"+userData.mobile+"',"+"'"+userData.email+"'"+")";
              con.query(Q, function (err, result) {
                //if (err) throw err;
                console.log(userData.firstname+" "+userData.surname+" was inserted into the database");
                //console.log(userData.op);
              });
            });
            con.connect(function(err) {
              //if (err) throw err;
              var Q="INSERT INTO `userhome`(`First Name`, `Surname`,`Address1`, `Address2`, `Town`, `county`, `eircode`) VALUES ("+"'"+userData.firstname+"',"+"'"+userData.surname+"',"+"'"+userData.address1+"',"+"'"+userData.address2+"',"+"'"+userData.town+"',"+"'"+userData.county+"',"+"'"+userData.eircode+"'"+")";
              con.query(Q, function (err, result) {
                //if (err) throw err;
                //console.log(userData.firstname+" "+userData.surname+"'s address was inserted into the database");
                //console.log(Q);
                //console.log(userData.op);
              });
            });
            con.connect(function(err) {
              //if (err) throw err;
              var Q="INSERT INTO `usership`(`First Name`, `Surname`,`Address1`, `Address2`, `Town`, `county`, `eircode`) VALUES ("+"'"+userData.firstname+"',"+"'"+userData.surname+"',"+"'"+userData.address1s+"',"+"'"+userData.address2s+"',"+"'"+userData.towns+"',"+"'"+userData.countys+"',"+"'"+userData.eircodes+"'"+")";
              con.query(Q, function (err, result) {
                //if (err) throw err;
                //console.log(userData.firstname+" "+userData.surname+"'s address was inserted into the database"+"\n");
                //console.log(Q);
                //console.log(userData.op);
              });
            });
          }

          ////////////////////////////////////////// U (update)
          else if(userData.op=="up")
          {
            var headers = {
              "Content-Type": "text/plain",
            };
            response.writeHead(200, headers);
            response.end(
              "User (" +
                userData.firstname +
                " " +
                userData.surname +
                ") has been updated!"
            );

            con.connect(function(err) {
              //if (err) throw err;
              Q="UPDATE `userp`"
              +"SET `Title`= "+"'"+userData.title+"'"+", `Mobile`= "+"'"+userData.mobile+"'"+", `Email`= "+"'"+userData.email+"'"+" WHERE `First Name`= "+"'"+userData.firstname+"'"+" AND "+"`Surname`= "+"'"+userData.surname+"'";
              con.query(Q, function (err, result, fields) {
                if (err) throw err;
                console.log(userData.firstname+" "+userData.surname+"'s information has been updated");
                //console.log("");
                //console.log(Q);
                
              });
            });
            con.connect(function(err) {
              //if (err) throw err;
              Q="UPDATE `userhome`"
              +"SET `Address1`= "+"'"+userData.address1+"'"+", `Address2`= "+"'"+userData.address2+"'"+", `town`= "+"'"+userData.town+"'"+", `county`= "+"'"+userData.county+"'"+", `eircode`= "+"'"+userData.eircode+"'"+" WHERE `First Name`= "+"'"+userData.firstname+"'"+" AND "+"`Surname`= "+"'"+userData.surname+"'";
              con.query(Q, function (err, result, fields) {
                if (err) throw err;
                //console.log(userData.firstname+" "+userData.surname+"'s information has been updated");
                //console.log("");
                //console.log(Q);
                
              });
            });
            con.connect(function(err) {
              //if (err) throw err;
              Q="UPDATE `usership`"
              +"SET `Address1`= "+"'"+userData.address1s+"'"+", `Address2`= "+"'"+userData.address2s+"'"+", `town`= "+"'"+userData.towns+"'"+", `county`= "+"'"+userData.countys+"'"+", `eircode`= "+"'"+userData.eircodes+"'"+" WHERE `First Name`= "+"'"+userData.firstname+"'"+" AND "+"`Surname`= "+"'"+userData.surname+"'";
              con.query(Q, function (err, result, fields) {
                if (err) throw err;
                console.log(userData.firstname+" "+userData.surname+"'s address information has been updated");
                console.log("");
                //console.log(Q);
                
              });
            });
          }

          ////////////////////////////////////////// R (Retrieve)
          else if(userData.op2=="find")
          {
            var headers = {
              "Content-Type": "text/plain",
            };

            var contain="";
            con.connect(function(err) {
              console.log("Find "+userData.firstname2+" "+userData.surname2)
              //if (err) throw err;
              var Q="SELECT userp.*"+
              "FROM `userp` "+
              "WHERE userp.`First Name` = "+"'"+userData.firstname2+"'"+" AND userp.`Surname` = "+"'"+userData.surname2+"'";
              //console.log(Q);
              con.query(Q, function (err, result, fields) { 
                contain=JSON.stringify(result);
                if (err) throw err;
                console.log(result);
                //console.log(userData.firstname2+result);
                //response.writeHead(200, headers);
                //response.end(contain);
              });
              var Q="SELECT `address1`, `address2`, `town`, `county`, `eircode` FROM `userhome` WHERE userhome.`First Name` = "+"'"+userData.firstname2+"'"+" AND userhome.`Surname` = "+"'"+userData.surname2+"'";
              con.query(Q, function (err, result, fields) { 
                contain=contain+" "+JSON.stringify(result);
                if (err) throw err;
                console.log(result);
                //console.log(userData.firstname2+result);
                //response.writeHead(200, headers);
                //response.end(contain);
              });
              var Q="SELECT `address1`, `address2`, `town`, `county`, `eircode` FROM `usership` WHERE usership.`First Name` = "+"'"+userData.firstname2+"'"+" AND usership.`Surname` = "+"'"+userData.surname2+"'";
              //console.log(Q)
              con.query(Q, function (err, result, fields) { 
                contain=contain+" "+JSON.stringify(result);
                if (err) throw err;
                console.log(result);
                console.log("");
                //console.log(userData.firstname2+result);
                response.writeHead(200, headers);
                response.end(contain);
              });
            });
            
          }

          ////////////////////////////////////////// D (delete)
          else if(userData.op3="del"){
            con.connect(function(err) {
              //if (err) throw err;
              
              var Q="DELETE FROM `userp` WHERE `First Name` = "+"'"+userData.firstname3+"'"+" AND `Surname` = "+"'"+userData.surname3+"'"+" AND userp.`Mobile` = "+"'"+userData.mobile3+"'"+" AND userp.`Email` = "+"'"+userData.email3+"'";
              con.query(Q, function (err, result, fields) {
                if (err) throw err;
                //console.log(userData.firstname3+" "+userData.surname3+" has been deleted from the database");
              });
            });
            var Q="DELETE FROM `userhome` WHERE `First Name` = "+"'"+userData.firstname3+"'"+" AND `Surname` = "+"'"+userData.surname3+"'";
            con.query(Q, function (err, result, fields) {
              if (err) throw err;
              //console.log(userData.firstname3+" "+userData.surname3+" has been deleted from the database");
            });
            var Q="DELETE FROM `usership` WHERE `First Name` = "+"'"+userData.firstname3+"'"+" AND `Surname` = "+"'"+userData.surname3+"'";
            con.query(Q, function (err, result, fields) {
              if (err) throw err;
              console.log(userData.firstname3+" "+userData.surname3+" has been deleted from the database"+"\n");
            });
          }
          //////////////////////////////////////////////
        });
      }






      // Handle a GET request;  the user is requesting user data via AJAX!
      // This is the CRUD (R)etrieve request. These data need to be
      // extracted from the database and returned to the user as JSON!
      else if (currentMethod === "GET") {
        var headers = {
          "Content-Type": "application/json",
        };
        //console.log(
          //"USER DATABASE REQUESTED: \n\n" +
            //JSON.stringify(userDatabase, null, 2) +
            //"\n"
        //);
        
        //////////////////////////////////////////
        con.connect(function(err) {
          //if (err) throw err;
          var Q="SELECT * FROM `testtable` WHERE 1";
          con.query(Q, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            response.writeHead(200, headers);
            response.end(JSON.stringify(result));
          });
        });
        //////////////////////////////////////////////
        



      }





      //////////////////////////////////////////////// Handle a DELETE request;
      else if (currentMethod === "DELETE") {
        con.connect(function(err) {
          //if (err) throw err;
          var Q="DELETE FROM `testtable` WHERE 1";
          con.query(Q, function (err, result, fields) {
            if (err) throw err;
            console.log("Done");
            
          });
        });
      }
      //////////////////////////////////////////////






      //////////////////////////////////////////////// Handle a UPDATE request;
      else if (currentMethod === "UPDATE") {
        //var headers = {
          //"Content-Type": "application/json",
        //};
        //console.log(
          //"USER DATABASE REQUESTED: \n\n" +
            //JSON.stringify(userDatabase, null, 2) +
            //"\n"
        //);
        /*con.connect(function(err) {
          //if (err) throw err;
          Q="UPDATE `testtable`"
          +"SET `Title`="+userData.title+", `First Name`="+userData.firstname+", `Surname`="+userData.surname+", `Email`="+userData.email+", `Address Line 1`="+userData.address1+", `Address Line 2`="+userData.address2+", `Town`="+userData.town+", `County/City`="+userData.county+", `Eircode`="+userData.eircode+"WHERE `Mobile`="+userData.mobile;
          con.query(Q, function (err, result, fields) {
            if (err) throw err;
            console.log(Q);
            
          });
        });*/
      }
      //////////////////////////////////////////////
      break;
  }
});




// Set up the HTTP server and listen on port 8000
server.listen(port, function () {
  console.log("Server running on port: " + port + "\n");
});




