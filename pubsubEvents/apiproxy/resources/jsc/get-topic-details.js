 var payload = JSON.parse(context.getVariable("request.content"));
 
 if ( ! payload.topicname) {
   throw new Error('You must specify a topicname');
 }

 if ( ! payload.event) {
   throw new Error('You must specify an event object to pubish');
 }
 
 context.setVariable("topicname", payload.topicname);
 
 context.setVariable("event", JSON.stringify(payload.event));
