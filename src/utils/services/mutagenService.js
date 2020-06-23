
/**

* This service should be called after the docker-compose service is called
  * So the docker-compose containers should already exist
* Steps to setup
  * Call the mutagen start task, to ensure the mutagen daemon is running
  * Calls the mutagen create task to create the mutagen sync
    * This task should be updated to validate if the sync already exists
  * Should add an exit listener similar to the docker-sync task
    * When the docker-compose service is closed, the mutagen sync should stop as well
    * Need to add a mutagen task to stop a sync
    * Need to add a mutagen task to list all syncs
    * Need to add a mutagen task to get all syncs

*/


const mutagenService = () => {
  
}

module.exports = {
  mutagenService
}