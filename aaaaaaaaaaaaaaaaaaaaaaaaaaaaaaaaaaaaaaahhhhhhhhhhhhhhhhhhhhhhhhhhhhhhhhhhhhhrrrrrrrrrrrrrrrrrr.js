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
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Check if user is logged in
firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        console.log("No user is signed in.");
        window.location.href = "login.html";
    }
});

var imageV, titleV, dateV, authorV, officeV, descriptionV, contentV;
var postingNumberV, assignmentV, positionV, salaryGradeV, deadlineV, linkV;

// Modal Variables
var modal = document.getElementById("delete-modal");
var span = document.getElementsByClassName("close")[0];
var confirmDeleteButton = document.getElementById("confirm-delete-yyy");
var closeModalButton = document.getElementById("close-modal");
var deleteFunction;

// Close Modal Event
span.onclick = function() {
    modal.style.display = "none";
}

closeModalButton.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function showDeleteModal(deleteFunc) {
    modal.style.display = "block";
    deleteFunction = deleteFunc;
    confirmDeleteButton.onclick = function() {
        deleteFunction();
        modal.style.display = "none";
    };
}

// Success Stories Functions
function readStoryForm() {
    imageV = document.getElementById("image").value;
    titleV = document.getElementById("title").value;
    dateV = document.getElementById("date").value;
    authorV = document.getElementById("author").value;
    officeV = document.getElementById("office").value;
    descriptionV = document.getElementById("description").value;
    contentV = document.getElementById("content").value;
}

function deleteStoryData(uid, storyKey) {
    showDeleteModal(function() {
        firebase.database().ref(`users/${uid}/stories/${storyKey}`).remove()
            .then(() => {
                return firebase.database().ref(`publicStories/${storyKey}`).remove();
            })
            .then(() => {
                document.getElementById(storyKey).remove();
                alert("Data Deleted");
            })
            .catch(error => {
                console.error("Error deleting data: ", error);
            });
    });
}

function insertStoryData() {
    readStoryForm();
    const user = firebase.auth().currentUser;
    if (user) {
        const uid = user.uid;
        const newStoryRef = firebase.database().ref(`users/${uid}/stories`).push();
        const newStoryKey = newStoryRef.key;

        const storyData = {
            image: imageV,
            title: titleV,
            date: dateV,
            author: authorV,
            office: officeV,
            description: descriptionV,
            content: contentV,
        };

        const updates = {};
        updates[`users/${uid}/stories/${newStoryKey}`] = storyData;
        updates[`publicStories/${newStoryKey}`] = storyData;

        firebase.database().ref().update(updates).then(() => {
            alert("Data Inserted");

            // Add data to the table only if it's not already there
            if (!document.getElementById(newStoryKey)) {
                var table = document.getElementById("data-table-story").getElementsByTagName('tbody')[0];
                var newRow = table.insertRow();
                newRow.setAttribute("id", newStoryKey);
                newRow.innerHTML = `
                    <td>${titleV}</td>
                    <td>${authorV}</td>
                    <td>${dateV}</td>
                    <td><button class="delete-button" onclick="deleteStoryData('${uid}', '${newStoryKey}')">Delete</button></td>
                `;
            }

            document.getElementById("image").value = "";
            document.getElementById("title").value = "";
            document.getElementById("date").value = "";
            document.getElementById("author").value = "";
            document.getElementById("office").value = "";
            document.getElementById("description").value = "";
            document.getElementById("content").value = "";
        }).catch(error => {
            console.error("Error inserting data: ", error);
        });
    } else {
        alert("No user is signed in.");
    }
}

function displayStoryData() {
    const user = firebase.auth().currentUser;
    if (user) {
        const uid = user.uid;
        firebase.database().ref(`users/${uid}/stories`).on("value", function(snapshot) {
            var table = document.getElementById("data-table-story").getElementsByTagName('tbody')[0];
            table.innerHTML = ""; // Clear existing table data
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                var newRow = table.insertRow();
                newRow.setAttribute("id", childSnapshot.key);
                newRow.innerHTML = `
                    <td>${childData.title}</td>
                    <td>${childData.author}</td>
                    <td>${childData.date}</td>
                    <td><button class="delete-button" onclick="deleteStoryData('${uid}', '${childSnapshot.key}')">Delete</button></td>
                `;
            });
        });
    } else {
        alert("No user is signed in.");
    }
}

// Job Opportunities Functions
function readJobForm() {
    postingNumberV = document.getElementById("postingNumber").value;
    assignmentV = document.getElementById("assignment").value;
    positionV = document.getElementById("position").value;
    salaryGradeV = document.getElementById("salaryGrade").value;
    deadlineV = document.getElementById("deadline").value;
    linkV = document.getElementById("link").value;
}

function deleteJobData(uid, postingNumber) {
    showDeleteModal(function() {
        firebase.database().ref(`users/${uid}/jobs/${postingNumber}`).remove()
            .then(() => {
                return firebase.database().ref(`publicJobs/${postingNumber}`).remove();
            })
            .then(() => {
                document.getElementById(postingNumber).remove();
                alert("Data Deleted");
            })
            .catch(error => {
                console.error("Error deleting data: ", error);
            });
    });
}

function insertJobData() {
    readJobForm();
    const user = firebase.auth().currentUser;
    if (user) {
        const uid = user.uid;
        const newJobData = {
            postingNumber: postingNumberV,
            assignment: assignmentV,
            position: positionV,
            salaryGrade: salaryGradeV,
            deadline: deadlineV,
            link: linkV,
        };

        // Save job data under the user's node
        firebase.database().ref(`users/${uid}/jobs/${postingNumberV}`).set(newJobData)
            .then(() => {
                // Also save job data under the publicJobs node
                return firebase.database().ref(`publicJobs/${postingNumberV}`).set(newJobData);
            })
            .then(() => {
                alert("Data Inserted");

                // Add data to the table only if it's not already there
                if (!document.getElementById(postingNumberV)) {
                    var table = document.getElementById("data-table-job").getElementsByTagName('tbody')[0];
                    var newRow = table.insertRow();
                    newRow.setAttribute("id", postingNumberV);
                    newRow.innerHTML = `
                        <td>${assignmentV}</td>
                        <td>${positionV}</td>
                        <td>${salaryGradeV}</td>
                        <td><button class="delete-button" onclick="deleteJobData('${uid}', '${postingNumberV}')">Delete</button></td>
                    `;
                }

                document.getElementById("postingNumber").value = "";
                document.getElementById("assignment").value = "";
                document.getElementById("position").value = "";
                document.getElementById("salaryGrade").value = "";
                document.getElementById("deadline").value = "";
                document.getElementById("link").value = "";
            })
            .catch(error => {
                console.error("Error inserting data: ", error);
            });
    } else {
        alert("No user is signed in.");
    }
}

function displayJobData() {
    const user = firebase.auth().currentUser;
    if (user) {
        const uid = user.uid;
        firebase.database().ref(`users/${uid}/jobs`).on("value", function(snapshot) {
            var table = document.getElementById("data-table-job").getElementsByTagName('tbody')[0];
            table.innerHTML = ""; // Clear existing table data
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                var newRow = table.insertRow();
                newRow.setAttribute("id", childSnapshot.key);
                newRow.innerHTML = `
                    <td>${childData.assignment}</td>
                    <td>${childData.position}</td>
                    <td>${childData.salaryGrade}</td>
                    <td><button class="delete-button" onclick="deleteJobData('${uid}', '${childSnapshot.key}')">Delete</button></td>
                `;
            });
        });
    } else {
        alert("No user is signed in.");
    }
}

function showSection(sectionId) {
    document.querySelectorAll('.content > div').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

document.getElementById("insert-story").onclick = insertStoryData;
document.getElementById("insert-job").onclick = insertJobData;

// Display existing data on load
window.onload = function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            displayStoryData();
            displayJobData();
        } else {
            window.location.href = "login.html";
        }
    });
};

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        console.error("Sign out error:", error);
    });
}
