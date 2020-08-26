# Keg Packages
Creates an exact copy the a docker container at the time of its instantiation

## Purpose
* The goal is to create a docker image the matches the **exact environment** in which the container was created
* This allows team members to share code and applications quickly and easily without out the worry of environment difference between developer machines or setups
  * The only real requirement is that the machine can run a docker container
  * Installing the [Keg-CLI](https://github.com/simpleviewinc/keg-cli) is **NOT** required but helpful
    * It automates most of the steps, but technically everything can be done without it

## How it Works
* Developer starts a docker container on their local machine.
  * Using [Mutagen](https://mutagen.io/) the developer can sync local changes into the container
    * One key importance, is that `docker volumes` are **NOT** used!
* Once finished with their changes, a developer can then push an image with their changes to a docker repository
  * This can be done through the `keg docker package` task of the Keg-CLI
  * Internally the `keg docker package` task does the following
      * Runs `docker commit` to create the image
      * Tags the image with the current feature branch of the repository
      * Then pushes it to a configured docker repository
* The developer then submits a pull request, which includes a `url` of the `docker image`
* Later, when a different developer does the PR review, they can easily test out the changes
  * This can be done through the `keg docker package run <url>` task of the Keg-CLI
    * First they copy the `url` provided by the original developer
    * Then run the task locally on their machine, replacing `url` with the one provided to them
  * Internally the `keg docker package run <url>` task does the following
    * Pulls the docker image from the docker repository
    * Runs the image in a container
    * Review and test the code change made by the original developer

### Docker Commit and Volumes
  * Docker has a feature called `docker commit`, that allows creating an image from a running container
    * The only downside to this is that `volumes` mounted into the `container` are not included when the `docker commit` command is run
    * **This means normal volume mounting processes can NOT be used**
  * Using [Mutagen](https://mutagen.io/), the issue can be avoided
    * It allows syncing local files into docker container without volumes
    * Using the Keg-CLI, a sync can be setup using the `keg sync create <options>` task

## Moving forward
* Now that this has been implemented into the Keg-CLI
* **All** keg related pull requests should include a docker image url
  * This makes it easy for anyone on the team to test the code changes

## TLDR

### Package Steps
1. Create a new feature branch for the repo being worked on
2. Run it in a container with a `mutagen sync`
  * To do this run the start task as described below
    * `keg <context> start <options>`
      * `context` - the name of the repo to be run w/ `keg`
        * Examples - `core` | `components` | `linked tap name`
          * **Important** - A tap must be linked for it to work properly
          * See `keg tap link` task for more information
      * `options` - See start task options in the Keg-CLI for more information
2. Make the changes to the repository as needed to complete the feature
  * The local changes should be auto-magically synced into the container
  * The containers application should see these changes and update accordingly 
3. Once complete, run the `keg docker package <options>` task
  * This should package the container, and push it to the configured docker repository
4. Submit a pull request and include the docker repository `url`

### Review Steps
1. Using the provided `url` in the pull request, run the `keg docker package run <url>` task
  * This will pull the docker image locally, then run it
2. Test the running container and application as needed


