Hello,

I am code assistant bot. Given steps needs to be followed, before asking any question to me.

A) SetUp in Linux or Vagrant Environment

  1) Steps to install redis
    1) Vagrant up
    2) Vagrant ssh
    3) sudo apt-get update
    4) sudo apt-get install build-essential
    5) sudo apt-get install tcl8.5 -y
    6) cd /vagrant
    7) wget http://download.redis.io/releases/redis-stable.tar.gz
    8) tar -xvzf redis-stable.tar.gz
    9) cd redis-stable
    10) make
    11) sudo make install
    12) cd utils
    13) sudo ./install_server.sh
    14) sudo service redis_6379 start
    15) sudo netstat -tulpn
    16) sudo vim.tiny /etc/redis/6379.conf
         A. add "bind 0.0.0.0" (without Quotes) in last line and save file
         Note: To edit that file use insert key as in ubuntu and then add the line in the quoted text(bind 0.0.0.0) then use (ESCAPE):wq
    17) sudo service redis_6379 restart



  2) Neo4j Installation
    1) wget -O - https://debian.neo4j.org/neotechnology.gpg.key | sudo apt-key add -
    2) echo 'deb https://debian.neo4j.org/repo stable/' | sudo tee /etc/apt/sources.list.d/neo4j.list
    3) sudo apt-get update
    4) sudo apt-get install neo4j -y
    5) sudo service neo4j start

    Note:- To access neo4j remotley and restore data follow given commands.
    1) sudo vim.tiny /etc/neo4j/neo4j.conf
    2) uncomment this line from neo4j.conf "dbms.connectors.default_listen_address=0.0.0.0"
    3) save the file(ESCAPE:wq)
    4) sudo service neo4j restart
    5) To copy neo4j data to Ubnutu run given command to stop  neo4j 'sudo service neo4j stop'
    6) data location in Ubuntu will be..../var/lib/neo4j/data/databases/graph.db
    7) copy ur default.graphdb/* (only content inside) to /var/lib/neo4j/data/databases/graph.db
       Note:-The above step is done so as to copy the default data.garaphdb folder)
    8) cd default.graphdb (cd to ur old data)
    9) cp -rf * ./var/lib/neo4j/data/databases/graph.db
    10) sudo service neo4j start
    11) change vagrant file if using vagrant
    12) Open the vagrant file in your work space and paste the below content 3 lines after (config.vm.network "forwarded_port", guest: 8080,  
        host: 8080) this line
        config.vm.network "forwarded_port", guest: 7474, host: 7474
        config.vm.network "forwarded_port", guest: 7687, host: 7687
        config.vm.network "forwarded_port", guest: 27107, host: 27017
        save the vagrant file and then reload the file using 'vagrant reload' command.


B) SetUp in Windows Environment


  1) Steps to install redis
    1) Download and install redis from official website.
    2) install redis
    3) start redis when you are running your application or make it as a service so that it will start automatically whenever system restarts

  2) Steps to install neo4j
    1) Download and install neo4j from offical website
    2) Copy graphdbBackup folder inside neo4j database location and rename copied folder as default.graphdb
    3) Start Neo4j

C) Replace 'localhost' with your machine IP if your code is running on vagrant and trying to access windows neo4j. if you are working on  
   windows no need to do anything in code files.
   1) webserver\insertQuestions.js
   2) webserver\neo4j\connection.js
   3) webserver\views\graph.html
   Note:- password is neo4js to acess neo4j database

D) Steps to start seneca service
  1) Go to inside SenecaMicroService
  2) npm install
  3) node user-microservice

E) Steps to start Code Assistant bot
  1) npm install or npm install --no-bin-links
  2) npm run serv

Information
---------------------------------------------------
  A) Ports used in application
    1) mongo  27017
    2) redis 6379
    3) neo4j 7474 and 7687
    4) App Port 8080
Thanks
Code Assistan Bot
