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

  * Resolve this Error on 
    * `Error checking TLS connection: Host is not running`
      * To fix `docker-machine restart docker-keg`
      * Should try to figure out when in this state, and auto-run it 
      * `docker-machine info docker-keg`
        * Might work, because it will not return the info, so we know we need to restart