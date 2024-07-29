// Your web app's Firebase configuration
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

// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Set up our register function
function register() {
    // Get all our input fields
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Invalid Email or Password');
        return;
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function() {
            // Declare user variable
            var user = auth.currentUser;

            // Add this user to Firebase Database
            var database_ref = database.ref();

            // Create User data
            var user_data = {
                email: email,
                last_login: Date.now()
            };

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data);

            // Done
            alert('User Created!');
            window.location.href = "home";
        })
        .catch(function(error) {
            // Firebase will use this to alert of its errors
            var error_message = error.message;

            alert(error_message);
        });
}

// Set up our login function
function login() {
    // Get all our input fields
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Invalid Email or Password!');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            // Redirect to home page on successful login
            window.location.href = "home";
        })
        .catch(function(error) {
            // Firebase will use this to alert of its errors
            var error_message = error.message;
            alert(error_message);
        });
}

function logout() {
    auth.signOut().then(() => {
        window.location.href = "login";
    }).catch((error) => {
        console.error("Sign out error:", error);
    });
}

// Validate Functions
function validate_email(email) {
    var expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validate_password(password) {
    return password.length >= 6;
}

function validate_field(field) {
    return field != null && field.length > 0;
}
