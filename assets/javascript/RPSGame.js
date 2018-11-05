playerName1=""
playerName2=""
player1Win=0;
player2Win=0;
player1Lose=0;
player2Lose=0;
track = 0;

$(document).ready(function () {
var config = {
    apiKey: "AIzaSyDLdipiGbu9gj1XtllJ4h-a5cSL2hal1b0",
    authDomain: "pavani-project-c7d6a.firebaseapp.com",
    databaseURL: "https://pavani-project-c7d6a.firebaseio.com",
    storageBucket: "pavani-project-c7d6a.appspot.com"
  };
  
  firebase.initializeApp(config);
   
  var database = firebase.database();
  database.ref("/playerData").push(
      {playerName1:playerName1,
        playerName2:playerName2,
        player1Win:player1Win,
        player2Win:player2Win,
        player1Lose:player1Lose,
        player2Lose:player2Lose
    });
  
  $("#Start").on("click", function(event) {
      console.log("Entered button click function");
    event.preventDefault();
     // Grabs user input
    var playerName = $("#player-name").val().trim();
    var CurPlayer1 = $("#player1arena").val();
    var CurPlayer2 = $("#player2arena").val();
    console.log("Player1Arena text is "+CurPlayer1);
    console.log("Player2Arena text is "+CurPlayer2);
    if(playerName==="")
    alert("Please Enter Player Name:");
    else
    {
        if(CurPlayer1 === "")
            {
        database.ref("/playerData").push(
            {
              playerName1:playerName,
              playerName2:playerName2,
              player1Win:player1Win,
              player2Win:player2Win,
              player1Lose:player1Lose,
              player2Lose:player2Lose
            });
            $("#player-name").hide();
            $("#Start").hide();
            $("#playerInfo").append("<br>");
            
             playGame(playerName);
            
            }       
          
     else
     {
     database.ref("/playerData").push(
        {
          playerName1:playerName1,
          playerName2:playerName,
          player1Win:player1Win,
          player2Win:player2Win,
          player1Lose:player1Lose,
          player2Lose:player2Lose
        
      }); 
      $("#player-name").hide();
      $("#Start").hide();
      $("#playerInfo").append("<br>","<br>");
      var str2 = "Hi "+playerName +"!" + " You are Player2"
      console.log("The value of STR1 is "+str2);
      $("#playerInfo").text(str2)
      $("#playerInfo").append("<br>","<br>");
     

    }
} 
  });

  database.ref("/playerData").on('child_added', function(snapshot) {
        playerName1 = snapshot.val().playerName1;
        playerName2 = snapshot.val().playerName2;
        
    console.log("The value of PlayerName2 is "+playerName2);
    console.log("Entered on value function");
    if (snapshot.val().playerName1 !== "" && snapshot.val().playerName2 !== "") {
        console.log("The value of Player Name1 is"+ snapshot.val().playerName1);
        console.log("The value of Player Name2 is"+ snapshot.val().playerName2);  
        track = 1;
      $("#player1arena").val(snapshot.val().playerName1);
      $("#player2arena").val(snapshot.val().playerName2);
    }
      else
      {
      if (snapshot.val().playerName1 !== "")
      {
          /*console.log("Setting the player1arena to Player1 name");
          var player1Details = $("<input>")
          player1Details.text()*/
            $("#player1arena").val(snapshot.val().playerName1);
          $("#player1arena")
          $("#player-name").text("");

         console.log("The value of Player Name1 is"+ snapshot.val().playerName1);
         console.log("The value of Player Name2 is"+ snapshot.val().playerName2);
      }
     /* if (snapshot.child("playerName2") != "")
      {
          track = 1;
          console.log("The value of track is "+track);
          

      }*/
    
    }
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });  
  function playGame(playerName)
  {
    var str1 = "Hi " +playerName + "!" + " You are Player1";
    var str3 = "It's your turn";
            var str4 = str1 + "\n" + str3;
            
            console.log("The value of STR3 is "+str4);
           if (playerName2 === "")
             $("#playerInfo").text(str1)
            else
             $("#playerInfo").text(str4);   

  }
});