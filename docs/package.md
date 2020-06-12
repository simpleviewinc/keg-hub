# Package Container

### Purpose
* The goal is to create a docker image the matches the exact environment in which the container was created
* Currently we are mounting our local volumes into the docker container to allow local development
* Unfortunately when using the `docker commit` command to create an image, volumes are not included

### Volume work-around
To get around the volume issue, we do the following:
  * Create a `tarball` of the mounted volume, and copy it to the docker container 
    * This will create a compressed copy of the currently running application
    * It also keeps the file folder structure to witch allows unpacking with that structure
  * Use the `docker commit` command to create an image of the running docker container
    * This creates an image from a running container including all it's files
  * This image is then run as a container **with out** the mounted volumes
    * The container start command is overwritten
    * Instead of running the application, it runs a command to unpack the saved `tarball`
      * This recreates the folder structure where the volumes were mounted
      * Because the volume are no longer mounted, the files will be included when `docker commit` is run
  * The `docker commit` command is run again on the container to include the files from the unpacked `tarball`
    * This creates the final image of the container, which also includes the code from the `tarball`

### TLDR - Package Steps
1. Run container with mounted volumes
   1. Copy the `/keg` folder from the volume to the container as a `tarball`
2. Run the `docker commit` command to create an image of the container
3. Run the image as a container **without** the mounted volumes
   1. Unpack the `tarball` from step one, back into the `/keg` folder
4. Run the `docker commit` command to create an image with the files in the correct location
5. Clean up and remove temp containers and images used to do the copy
6. Push the new image to the docker provider registry

