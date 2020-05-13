### CLI TODOs

**Taps**
  * Integrate docker-sync / docker composer with tap start / build commands

**Tasks**
  * Convert options to args, using ask, if required and option does not exist

**Docker**
  * Create a core Dockerfile
    * Pull all required core install items here ( git / expojs / keg-cli / etc... )
  * Update the main Dockerfile to use `From core`
    * This will allow use the Core docker image
    * This way when building a Tap docker image, we don't have to install all the core items


* TODO: add some type of ENV loading for docker compose up command
* Would look something like this => env $(cat local.env) docker-compose up
* ENV_FILE=.env.production.local docker-compose -f docker-compose.prod.yml up --build
* docker-compose --env-file foo.env up => This should work
