const  { encoding_for_model } = require( "@dqbd/tiktoken");
const fs = require('fs')

//Returns the number of tokens in a text string
function numTokensFromString(message) {
  const encoder = encoding_for_model("gpt-3.5-turbo");

  const tokens = encoder.encode(message);
  encoder.free();
  return tokens.length;
}

fs.readFile('compiled_data.txt','utf-8',(err,result)=>{
  
  let ans=numTokensFromString(result);
  console.log(ans)
})
