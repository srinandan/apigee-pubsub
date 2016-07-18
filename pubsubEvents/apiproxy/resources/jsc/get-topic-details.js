 var payload = JSON.parse(context.getVariable("request.content"));
 
 context.setVariable("topicname", "topic1");
 
 context.setVariable("event", JSON.stringify(payload.event));