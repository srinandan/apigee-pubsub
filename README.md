# wsdl2apigee
This demonstrates an implementation of publish-subscriber using Apigee Edge and Apigee 
BaaS (backend as a service).

## Install
* Deploy the Apigee Edge proxy 'pubsubTopics'
* Deploy the Apigee Edge proxy 'pubsubSubscriber'
* Deploy the Apigee Edge proxy 'pubsubEvents'

## Usage
### BaaS Setup
Setup a collection called 'topics' and another collection called 'subscribers'

### Managing Topics
The pubsubTopics proxy is a facade to the topics collection in BaaS. 
Sample message to create a topic:
```
  {
    "name": "topic1",
    "description": "this is topic1"
  }
```
The proxy pubsubTopics provides a facade to create, search, get, delete modify topics. 
There is also an API call to retrieve all subscribers for a topic. Ex:
```
http://{hostname}/v1/topics/{topicname}/subscribers
```

### Managing Subscriptions
The pubsubSubscribers proxy is a facade to the subscribers collection in BaaS.
Sample message to create a subscriber:
```
  {
    "name": "sub1",
    "description": "subscriber for topic1",
    "topic": "topic1",
    "callback": "http://apigee.com"
  }
```
The proxy pubsubSubscribers provides a facade to create, search, get, delete modify subscribers. 
There is also an API call to retrieve all topics for a subscriber. Ex:
```
http://{hostname}/v1/subscribers/{subscribername}/topics
```

### Connecting Entitites
BaaS provides the ability to connect entities. More information can be found here:
For this implementation, we will connect topics to subscribers and vice versa. For ex:

Connecting sub1 (subscriber) to top1 (topic)
```
curl -X POST https://api.usergrid.com/{orgname}/{appname}/topic/topic1/subscribers/subscribers/sub1
```

Connecting top1 (topic) to sub 1 (subscriber)
```
curl -X POST https://api.usergrid.com/ssridhar/sandbox/subscribers/sub1/subscribes/topic/topic1
``` 

## How it works
Publish an event to the pubsubEvent proxy like this:
```
Content-Type: application/json
POST: /v1/events

{
	"topicname": "topic1",
	"event": {
		"data": "event can contain any valida json payload"
	}
}
```

The pubsubEvent proxy retrives all the subscribers for the topic. For each subscriber, it POSTs the
event data to the callback URL (that the subscriber set when registering).
