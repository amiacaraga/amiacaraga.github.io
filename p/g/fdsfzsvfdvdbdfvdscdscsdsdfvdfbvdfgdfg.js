// Firebase configuration
const firebaseConfig = {
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

// Check if user is already logged in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("User is signed in.");
      window.location.href = "home.html";
    } else {
      console.log("No user is signed in.");
    }
  });

function register() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Invalid Email or Password!');
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function() {
            window.location.href = "home.html";
        })
        .catch(function(error) {
            var error_message = error.message;
            alert(error_message);
        });
}

function validate_email(email) {
    var regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

function validate_password(password) {
    return password.length >= 6;
}