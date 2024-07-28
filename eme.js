
        // Firebase configuration
        import { initializeApp } from "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js";
        import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js";

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
        const app = initializeApp(firebaseConfig);
        const auth = getAuth();

        // Check if user is already logged in


        // Redirect to home if user is already logged in
        onAuthStateChanged(auth, (user) => {
            if (user) {
                window.location.href = "home.html";
            }
        });