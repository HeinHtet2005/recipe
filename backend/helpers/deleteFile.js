const fs = require('fs').promises



const deleteFile = async (path)=> {
   try {
        await fs.access(path);
        await fs.unlink(path);
      } catch (err) {
        console.log(err);
      }

}

module.exports = deleteFile