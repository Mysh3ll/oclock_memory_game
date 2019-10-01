O-Clock-Memory-GAme
=======

## Git
First you have to clone this repo:
* `git clone "git@github.com:Mysh3ll/oclock_memory_game.git"`

Once you're done, simply `cd` to your project, then you select the branch `docker`:
* `git checkout docker`

## How to run

Dependencies:

  * Docker engine v1.13 or higher. Your OS provided package might be a little old, if you encounter problems, do upgrade. See [https://docs.docker.com/engine/installation](https://docs.docker.com/engine/installation)
  * Docker compose v1.12 or higher. See [docs.docker.com/compose/install](https://docs.docker.com/compose/install/)

Run `docker-compose up -d`. This will initialise and start all the containers, then leave them running in the background.
Run `docker-compose exec php-fpm bash` to run Shell into the PHP container.

## Setup
Run these commands to install dependencies and configure parameters:
* `composer install`
* `yarn`
* `yarn build`

## Database
Commands to execute after to prepare the database:
* `php bin/console doctrine:migrations:migrate` (answer `y`)

## Production
Run your application:  
* Browse to the http://localhost:8000 URL.

## Game
Just play !

## Services exposed outside your environment ##

You can access your application via **`localhost`**, if you're running the containers directly, or through **``** when run on a vm. nginx and mailhog both respond to any hostname, in case you want to add your own hostname on your `/etc/hosts` 

Service|Address outside containers
------|---------|-----------
Webserver|[localhost:8000](http://localhost:8000)
MySQL|**host:** `localhost`; **port:** `8002`

## Hosts within your environment ##

You'll need to configure your application to use any services you enabled:

Service|Hostname|Port number
------|---------|-----------
php-fpm|php-fpm|9000
MySQL|mysql|3306 (default)

# Docker compose cheatsheet #

**Note:** you need to cd first to where your docker-compose.yml file lives.

  * Start containers in the background: `docker-compose up -d`
  * Start containers on the foreground: `docker-compose up`. You will see a stream of logs for every container running.
  * Stop containers: `docker-compose stop`
  * Kill containers: `docker-compose kill`
  * View container logs: `docker-compose logs`
  * Execute command inside of container: `docker-compose exec SERVICE_NAME COMMAND` where `COMMAND` is whatever you want to run. Examples:
        * Shell into the PHP container, `docker-compose exec php-fpm bash`
        * Run symfony console, `docker-compose exec php-fpm bin/console`
        * Open a mysql shell, `docker-compose exec mysql mysql -uroot -pCHOSEN_ROOT_PASSWORD`

