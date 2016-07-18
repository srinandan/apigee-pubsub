 var subscribers = JSON.parse(context.getVariable("subscribers.content"));
 var headers = {'Content-Type' : 'application/json' };

 for (var i=0; i < subscribers.length; i++){
     var pushNotify = new Request(subscribers[i].callback, 'POST', headers, context.getVariable("event"));
     httpClient.send(pushNotify);  
 }