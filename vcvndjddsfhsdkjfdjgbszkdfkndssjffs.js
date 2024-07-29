// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBvCo3oKxF7VaGyvqzcXl4BYEYmzgAkyVM",
    authDomain: "amia-caraga-website.firebaseapp.com",
    databaseURL: "https://amia-caraga-website-default-rtdb.firebaseio.com",
    projectId: "amia-caraga-website",
    storageBucket: "amia-caraga-website.appspot.com",
    messagingSenderId: "725656270766",
    appId: "1:725656270766:web:008b5df732b3d35dd0fa3f",
    measurementId: "G-SP922RR158"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function displayData() {
  firebase.database().ref("publicJobs").on("value", function(snapshot) {
    var table = document.getElementById("data-table");
    table.innerHTML = ""; // Clear existing table data
    var data = [];

    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      data.push(childData);
    });

    // Sort data by deadline in descending order
    data.sort(function(a, b) {
      return new Date(b.deadline) - new Date(a.deadline);
    });

    // Display sorted data
    data.forEach(function(item) {
      var newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${item.assignment}</td>
        <td>${item.position}</td>
        <td>${item.salaryGrade}</td>
        <td>${item.deadline}</td>
        <td><a href="${item.link}" target="_blank">Click Here</a></td>
      `;
      table.appendChild(newRow);
    });
  });
}

// Display existing data on load
window.onload = displayData;