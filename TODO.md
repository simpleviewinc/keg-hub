### CLI TODOs

**Taps**
  * Integrate docker-sync / docker composer with tap start / build commands

**Tasks**
  * Convert options to args, using ask, if required and option does not exist

**Docker**
  * Create a base Dockerfile
    * Pull all required base install items here ( git / expojs / keg-cli / etc... )
  * Update the main Dockerfile to use `From base`
    * This will allow use the Base docker image
    * This way when building a Tap docker image, we don't have to install all the base items


