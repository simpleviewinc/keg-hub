* Tap base docker file
  * Should not pull down git repo in dev mode
  * Change name of docker image to tap
  * Don't have a different docker image for each tap
  * In dev, mount the tap repo folder to /tap
  * In prod, pull git repo
    * This should only happen when deploying the tap
* Git key Task
  * Use encryption, to secure the git key
  * Need to decrypt when building the docker container, or doing a git command

