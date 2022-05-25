
var fs = require('fs')
const fse = require('fs-extra')
const targetPath = './env.json';
const robots_path = 'src/assets/robots.txt';

/*Code to create the robots.txt file dynamically based on environment*/
let robots_file_path = 'src/assets/robots/robots.txt';
if(process.env.NODE_ENV == "prod"){
  robots_file_path = 'src/assets/robots/robots-prod.txt';
}
//Read content from the file
fse.readFile(robots_file_path, "utf8")
.then((function(content) {
  //Write content from the file
  fs.writeFile(robots_path, content, function (err) {
    if(err) {
      throw console.error(err);
    }else{
        console.log(`Robots file generated at ${robots_path} for ${process.env.NODE_ENV} server \n`);
   }
  });      
  console.log("robots_file_content : ", content)
}));