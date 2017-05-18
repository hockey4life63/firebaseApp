var firebaseRef = firebase.database();
var userRef = firebaseRef.ref("/users");
var chatRef = firebaseRef.ref("/chat");

$("#submitReg").on("click", function(event) {
    event.preventDefault();
    var email = $("#emailInput").val();
    var password = $("#passowrdInput").val();
    var name = $("#displayNameInput").val();
    $("#emailInput").val("");
    $("#passowrdInput").val("");
    $("#displayNameInput").val("");
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(user) {
            user.updateProfile({
                displayName: name
            }).then(function() {
                firebaseRef.ref("/users/" + firebase.auth().currentUser.uid).set({
                    displayName: firebase.auth().currentUser.displayName,
                    gameID: 000,
                    choice: "",
                    totalWins: 0
                })

            })

        })
});

$("#login").on("click", function(event) {
    event.preventDefault();
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();
    $("#loginEmail").val("");
    $("#loginPassword").val("");
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

});
// firebase.auth().signInWithEmailAndPassword("hockey4life63@aim.com", "").catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
// }); //readd password to mak work
var dataLoaded = false;
chatRef.on("child_added", function(snapshot) {
    if (dataLoaded) {
        var chat = snapshot.val()
        let item = $("<p>").text(chat.user + ": " + chat.message)
        $("#chatBox").prepend(item)
    } else {

    }
});
chatRef.once("value", function(snapshot) {
    dataLoaded = true;
})
$("#chatSubmit").on("click", function(event) {
    event.preventDefault();
    var chat = $("#chatMessage").val();
    chatRef.push().set({
        message: chat,
        user: firebase.auth().currentUser.displayName
    })
    $("#chatMessage").val("");
})
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("logged in!")
    } else {
        // User is signed out.
        // ...
    }
    // ...
});

// /*
// online RPS:
// check db for player count
// if less than 2 ask for user name
// 	if 0 players 
// 		store in player1
// 	else
// 		store in player2
// confirm each player is ready;
// each player chooses one(r,p,s)
// once each has choosen(or timedout)
// 	show each other their choices and decalre winner
// 	update scorea
// 	ask agian
// on player leave clear that players stored stats
// 	and change user count apporiately
// if player 1 leaves move player 2 to player 1
// on both leaving reset to default stats

// chat system:
// once name is given load chat box
// check chat database for new messages
// if new message display new message with username before it

// users{
// 	userCount: 0
// 	userid{
// 		displayName : name,
// 		gameID : gameid,
// 		userChoice:(r,p,s),
// 		totalWins: 0,
// 	}
// }
// messages{
// 	gameID{
// 		gameStart: 10000000
// 		chat{
// 			messageCount: 0
// 			message0{
// 				user : name,
// 				message : message
// 				sentTime: 100000000
// 			}
// 		}
// 		player1{
// 			choice: r,
// 			wins: 0
// 		},
// 		player2{
// 			choice: r,
// 			wins: 0
// 		},
// 		gamesPlayed: 0
// 	}
// }







console.log("hello")
