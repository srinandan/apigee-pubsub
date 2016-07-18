 var searchResponse = JSON.parse(context.getVariable("response.content"));
 
 var finalResponse = searchResponse.entities;
 
 // update the response that will be returned to the client
 context.setVariable("response.content", JSON.stringify(finalResponse));