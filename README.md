# CareGardenAPI

## Motivation

Since my professor for software engineering was recently talking about common software architectures, I decided to dive into the world of Node.js.
This little RESTful service is the result of the last week and I'd like to share this code with you guys!

## Aim of this Work

Within my "software engineering 2" course I have to work together with an amazing team to build a little application as a student project and we decided to follow the (3-tier) architecture.
Although, this kind of architecture is quite easy to understand and also to implement. It became clear that at some point it gets difficult. Especially when it comes to authentication processes, the 3-tier architecture is not the best way to go.
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




