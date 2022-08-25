import path from 'path';
import fs from 'fs';
import types from '../components/utility.js';
export default function organizeFn(directoryPath)
{
  

  if(directoryPath == undefined)
  {
    console.log("Executing command on current working directory!");
    directoryPath = process.cwd();
  }
  console.log(`Executing command organize for path ${directoryPath} \n`)
  let doesExist = fs.existsSync(directoryPath);

  if(!doesExist)
  {
    console.log("please enter the correct path!");
    return;
  }
  else
  {
    let destPath = path.join(directoryPath,"organize_files");
    if(!fs.existsSync(destPath))
    {
      fs.mkdirSync(destPath);
    }

    organizeHelper(directoryPath, destPath);

  }


}


function organizeHelper(srcDir ,destDir)
{
  let children = fs.readdirSync(srcDir);

  for(let i = 0; i< children.length; i++)
  {
    let childAdd = path.join(srcDir, children[i]);

    let childIsFile = fs.lstatSync(childAdd).isFile();

    if(childIsFile)
    {
      let childCategory = getCategory(children[i]);

      console.log("|---",children[i],"belongs to -->",childCategory);
      sendFiles(childAdd,destDir,childCategory);
    }

  }

}


function getCategory(childName)
{
  let extName = path.extname(childName);
  let ext = extName.slice(1);

  for(let category in types)
  {
    let extArray = types[category];

    for(let i = 0; i<extArray.length; i++)
    {
      if(extArray[i] == ext)
      {
        return category;
      }
    }

  }

  return "others";
}


function sendFiles(childAdd , destDir , category)
{
  let categoryPath = path.join(destDir,category);
  
  if(!fs.existsSync(categoryPath))
  {
    fs.mkdirSync(categoryPath);
  }

  let fileName = path.basename(childAdd);

  let fileDestAdd = path.join(categoryPath,fileName);

  fs.copyFileSync(childAdd, fileDestAdd);
  // Uncomment below if want to cut-paste files instead of copy-paste
  // fs.unlinkSync(childAdd); 
  console.log(fileName,"Copied to",category,"\n");

}
