
export default function helpFn(directoryPath)
{
  console.log(`The following commands can be executed:
      
      node main.js tree directorypath*      
      node main.js organize directorypath*
      node main.js help

      *Not mentioning the directorypath will execute the command on current working directory!
  `)
}