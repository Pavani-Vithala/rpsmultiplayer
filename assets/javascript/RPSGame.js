player1Connect=0
player2Connect=0
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
  
    
  
  $("#Start").on("click", function(event) {
      console.log("Entered button click function");
    event.preventDefault();
     // Grabs user input
     player1Connect = 1;
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
              database.ref("player1Data").push(
                {playerName1:playerName,
                  player1Win:player1Win,
                  player1Lose:player1Lose,
                  player1Connect:player1Connect
                });
            $("#player-name").hide();
            $("#Start").hide();
            $("#playerInfo").append("<br>");
            
             playGame(playerName);
            
            }       
          
     else
     {
       player2Connect = 1;
      database.ref("player2Data").push(
        {
          playerName2:playerName,
          player2Win:player2Win,
          player2Lose:player2Lose,
          player2Connect:player2Connect
      });
      $("#player-name").hide();
      $("#Start").hide();
      $("#playerInfo").append("<br>","<br>");
      var str2 = "Hi "+playerName +"!" + " You are Player2"
      console.log("The value of STR1 is "+str2);
      $("#playerInfo").text(str2)
      $("#playerInfo").append("<br>","<br>");
      //playerName = CurPlayer1;
     // console.log("The value of playerName1 after Player 2 is selected is "+playerName);
      //track =1;
      //playGame(playerName);

     

    }
} 
  });

  database.ref("player1Data").on('child_added', function(snapshot) {
        playerName1 = snapshot.val().playerName1;
        //playerName2 = snapshot.val().playerName2;
    
    
    console.log("Entered on value function");
   /* if (snapshot.val().playerName1 !== "")
        console.log("The value of Player Name1 is"+ snapshot.val().playerName1);
        console.log("The value of Player Name2 is"+ snapshot.val().playerName2);  
        track = 1;*/
      $("#player1arena").val(snapshot.val().playerName1);
     // $("#player2arena").val(snapshot.val().playerName2);
 /* }
      else
      {
      if (snapshot.val().playerName1 !== "")
      {
         
            $("#player1arena").val(snapshot.val().playerName1);
          $("#player1arena")
          $("#player-name").text("");

         console.log("The value of Player Name1 is"+ snapshot.val().playerName1);
         console.log("The value of Player Name2 is"+ snapshot.val().playerName2);
      }
     
    
    }*/
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }); 
  database.ref("player2Data").on('child_added', function(snapshot) {
    playerName2 = snapshot.val().playerName2;
    console.log("Entered on value function");

  $("#player2arena").val(snapshot.val().playerName2);
}, function(errorObject) {
console.log("The read failed: " + errorObject.code);
}); 



  function playGame(playerName)
  {
    var str1 = "Hi " +playerName + "!" + " You are Player1";
    var str3 = "It's your turn";
            var str4 = str1 + "\n" + str3;
            
            console.log("The value of STR3 is "+str4);
           if (track !== 1)
             $("#playerInfo").text(str1)
            else
             $("#playerInfo").text(str4);   

  }
});