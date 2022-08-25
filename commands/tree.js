import path from 'path';
import fs from 'fs';
export default function treeFn(directoryPath)
{
  

  if(directoryPath == undefined)
  {
    console.log("Executing command on current working directory!");
    directoryPath = process.cwd();
  }
  console.log(`Executing command tree for path ${directoryPath} \n`)
  let doesExist = fs.existsSync(directoryPath)

  if(!doesExist)
  {
    console.log("Please enter a correct path!")
  }
  else
  {
    treeHelper(directoryPath,"");
  }

}

function treeHelper(directoryPath,indent)
{
  let isFile = fs.lstatSync(directoryPath).isFile()
  if(isFile)
  {
    let fileName = path.basename(directoryPath)
    console.log(indent+"|---->"+fileName);
  }
  else
  {
    let children = fs.readdirSync(directoryPath);
    let dirName = path.basename(directoryPath);
    console.log(indent+ "L___"+dirName);

    for(let i = 0; i< children.length; i++)
    {
      let childAdd = path.join(directoryPath,children[i])
      treeHelper(childAdd,indent+"\t");
    }

  }
  


}