# CareGardenAPI

## Motivation

Since my professor for software engineering was recently talking about common software architectures, I decided to dive into the world of Node.js.
This little RESTful service is the result of the last week and I'd like to share this code with you guys!

## Aim of this Work

Within my "software engineering 2" course I have to work together with an amazing team to build a little application as a student project and we decided to follow the (3-tier) architecture.
Although, this kind of architecture is quite easy to understand and also to implement, it became clear that at some point it gets difficult. Especially when it comes to authentication processes, the 3-tier architecture is not the best way to go.
Therefore I decided to go forth to tier-4!

##Usage

1. clone this projekt

> git clone https://github.com/Erlix322/CareGardenAPI.git

2. install Node.js
> [installation guide](https://nodejs.org/en/download/package-manager/)

3. adjust the configurations
> data/database.js to your own configuration
> In server.js you have to adjust the routes to your own needs and as a consequence you also have to adapt the queries

## Workflow

1. open up the browser and try to open a route which is NOT allowed without a token e.g http://localhost:8080/api/therapists  

> you will get an error for not having a valid token

2. goto http://localhost:8080/api/login  

> here you enter the data of one of your users in your database  

3. if  everthing is alright, you should be able to see a generated token

4. try again to access http://localhost:8080/api/therapists?token=[your token]  

> now everything should be fine


## Test with command line tool *curl*

**curl --data "username=yourusername&password=yourpassword" http://localhost:8080/api/login**  
Response:   
<code> 
<!DOCTYPE html><html><head><title></title><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" rel="stylesheet" media="screen"><link rel="stylesheet" href="../alf/NodeTest/Authentication/style/style.css"></head><body><p>Herzlich willkommen T0001</p><p>Dein Token lautet: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVDAwMDEiLCJwYXNzd29yZCI6IlRoZXJhcGV1dCIsImlhdCI6MTQ2MzIxMjI1MCwiZXhwIjoxNDYzMjEzNjkwfQ.NyKF4V__k67PTtl3fydN4Bg6VEjKDhii9-WDGBvUy44</p><a href="/logout">Logout</a></body><script src="http://code.jquery.com/jquery.js"></script><script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script></html>
</code>

**curl -X GET 'http://localhost:8080/api/patients' -d "token=yourtoken"**

Response in case of this repository  
<code>
[{"P_ID":"P0001","name":"Brandt","vorname":"Eric","Adresse":"Ericstraße 4","Telefon":"0815/12345","Diagnose":"AOK Plus","Krankenkasse":"Hist","Password":"test"},{"P_ID":"P0002","name":"Brandt","vorname":"Felix","Adresse":"Ericstraße 4","Telefon":"0815/12345","Diagnose":"AOK Plus","Krankenkasse":"Hist"}]

</code>





