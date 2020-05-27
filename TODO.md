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


**Options**
  * Required option not throwing when no options exists