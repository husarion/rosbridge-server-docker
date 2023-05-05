let listener = document.getElementById("listener");

var ros = new ROSLIB.Ros();

ros.on('connection', function () {
    console.log('Connected to websocket server.');
});

ros.on('error', function (error) {
    console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function () {
    console.log('Connection to websocket server closed.');
});

ros.connect('ws://localhost:9090');  


// First, we create a Topic object with details of the topic's name and message type.
var chatter = new ROSLIB.Topic({
    ros: ros,
    name: '/chatter',
    messageType: 'std_msgs/String'
});

// Then we add a callback to be called every time a message is published on this topic.
chatter.subscribe(function (message) {
    console.log('Received message on ' + chatter.name + ': ' + message.data);
    listener.innerText = message.data;
});