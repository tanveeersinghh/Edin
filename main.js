#!/usr/bin/env node

import organizeFn from './commands/organize.js';
import treeFn from './commands/tree.js';
import helpFn from './commands/help.js';


const inputArray = process.argv.slice(2);

let command = inputArray[0];



switch(command)
{
  case "tree": treeFn(inputArray[1]);
    break;
  
  case "organize": organizeFn(inputArray[1]);
    break;

  case "help":helpFn();
    break;

  default: console.log("please use different command")
}


