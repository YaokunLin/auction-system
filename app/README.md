1. open powershell, and run command `docker stop $(docker ps -aq) ; docker rm $(docker ps -aq) ; docker volume rm $(docker volume ls -q) ; docker rmi $(docker images -q) -f` to delete the old image before run application
2. go to `Phase_3\db` directory, run `docker build -t my_postgres .` to build image
3. also in `Phase_3\db` directory run `docker run --name my_postgres_instance -p 5432:5432 my_postgres` 
4. install the node version 21.7.1 on the local.
5. after successfully run docker, go to the directory : `\cs6400-2024-01-Team036\Phase_3\app` run, first run `npm install` to install the necessary package and then run `npm run dev`, then goes to browser `localhost:3000`