/* global OT API_KEY TOKEN SESSION_ID SAMPLE_SERVER_BASE_URL */

var apiKey;
var sessionId;
var token;
var session;
var startShareBtn; 


//function setStartButton()
//{
//    startShareBtn = document.getElementById("startScreenShare");
//    startShareBtn.addEventListener("click", event => {
//        OT.checkScreenSharingCapability(response => {
//            if (!response.supported || response.extensionRegistered === false) {
//                alert("Screen sharing not supported");
//            } else if (response.extensionInstalled === false) {
//                alert("Browser requires extension");
//            } else {
//                const screenSharePublisher = OT.initPublisher(
//                    "screen",
//                    {
//                        insertMode: "append",
//                        width: "100%",
//                        height: "100%",
//                        videoSource: "screen",
//                        publishAudio: true
//                    },
//                    handleError
//                );
//                session.publish(screenSharePublisher, handleError);
//            }
//        });
//    });
//}

function handleCallback(error) {
    if (error) {
        console.log("error: " + error.message);
    } else {
        console.log("callback success");
    }
}




function setScreenSharing() {
        OT.checkScreenSharingCapability(response => {
            if (!response.supported || response.extensionRegistered === false) {
                alert("Screen sharing not supported");
            } else if (response.extensionInstalled === false) {
                alert("Browser requires extension");
            } else {
                const screenSharePublisher = OT.initPublisher(
                    "screen",
                    {
                        insertMode: "append",
                        width: "100%",
                        height: "100%",
                        videoSource: "screen",
                        publishAudio: true
                    },
                    handleCallback
                );
                session.publish(screenSharePublisher, handleCallback);
            }
        });
}






function handleError(error) {
    if (error) {
        console.error(error);
    }
}

function initializeSession() {
     session = OT.initSession(apiKey, sessionId);

    // Subscribe to a newly created stream
    session.on('streamCreated', function streamCreated(event) {
        var subscriberOptions = {
            insertMode: 'append',
            width: '1440px',
            height: '900px'
        };
        session.subscribe(event.stream, 'subscriber', subscriberOptions, handleError);
    });

    session.on('sessionDisconnected', function sessionDisconnected(event) {
        console.log('You were disconnected from the session.', event.reason);
    });

    // initialize the publisher
    var publisherOptions = {
        insertMode: 'append',
        width: '100%',
        height: '100%'
    };
    var publisher = OT.initPublisher('publisher', publisherOptions, handleError);

    // Connect to the session
    session.connect(token, function callback(error) {
        if (error) {
            handleError(error);
        } else {
            // If the connection is successful, publish the publisher to the session
            session.publish(publisher, handleError);
        }
    });
}
function initApp() {
    // See the config.js file.

    console.log(API_KEY);
    console.log(TOKEN);
    console.log(SESSION_ID);

    if (API_KEY && TOKEN && SESSION_ID) {
        apiKey = API_KEY;
        sessionId = SESSION_ID;
        token = TOKEN;
        initializeSession();
    } else if (SAMPLE_SERVER_BASE_URL) {
        // Make an Ajax request to get the OpenTok API key, session ID, and token from the server
        fetch(SAMPLE_SERVER_BASE_URL + '/session').then(function fetch(res) {
            return res.json();
        }).then(function fetchJson(json) {
            apiKey = json.apiKey;
            sessionId = json.sessionId;
            token = json.token;

            initializeSession();
        }).catch(function catchErr(error) {
            handleError(error);
            alert('Failed to get opentok sessionId and token. Make sure you have updated the config.js file.');
        });
    }
}
