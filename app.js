
// Initialize Firebase
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBPzbEOkfWd2QX6pDuULJFsOpNSkDItWXo",
  authDomain: "train-activity-c6ac5.firebaseapp.com",
  databaseURL: "https://train-activity-c6ac5.firebaseio.com",
  projectId: "train-activity-c6ac5",
  storageBucket: "",
  messagingSenderId: "759617035295"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();



// Capture Button Click
$("button").on("click", function(event) {

  event.preventDefault();

  // Grabbed values from text boxes
  var trainName = $("#train-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTime = $("#fistTime-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  // Code for handling the push
  database.ref().push({

    trainName: trainName,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency

    // dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  console.log(trainName);
  console.log(destination);
  console.log(firstTime);
  console.log(frequency);


});






// Firebase watcher + initial loader + order/limit HINT: .on("child_added"
database.ref().on("child_added", function(childSnapshot) {
  // storing the snapshot.val() in a variable for convenience
  var sv = childSnapshot.val();
  console.log("childSnapshot "+childSnapshot);

  console.log(sv.trainName);
  console.log(sv.destination);
  console.log(sv.firstTime);
  console.log(sv.frequency);



    // Assumptions
    var tFrequency = sv.frequency;
    console.log(tFrequency);

    // Time is 3:30 AM
    var firstTime = sv.firstTime;
    console.log(firstTime);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



    var tRow = $("<tr>");
    tRow.append($("<td>").text(sv.trainName));
    tRow.append($("<td>").text(sv.destination));
    tRow.append($("<td>").text(sv.frequency));
    tRow.append($("<td>").text(nextTrain));
    tRow.append($("<td>").text(tMinutesTillTrain));

    $(".body").append(tRow);


  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});








