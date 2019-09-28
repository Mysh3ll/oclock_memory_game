O-Clock-Memory-GAme
=======

## Setup
Clone this repository and run these commands to install dependencies and configure parameters:
* _composer install_
* _yarn_ or _npm install_
* _yarn dev_ or _npm dev_

## Database
Commands to execute after edit your .env file:
* _php bin/console doctrine:database:create_
* _php bin/console doctrine:migrations:migrate_

## Development
Run your application:  
1. Execute the _php bin/console server:start_ (or _server:run_) command.  
2. Browse to the http://localhost:8000 URL.  
  
CSS and javascript assets are build with Webpack:
1. Compile for dev: encore dev (_yarn dev_ or _npm dev_)
2. Watch and compile: encore dev --watch (_yarn watch_ or _npm watch_)
3. Compile for pro: encore production --progress (_yarn build_ or _npm build_)

## Game
Just play !
