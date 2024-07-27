// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBvCo3oKxF7VaGyvqzcXl4BYEYmzgAkyVM",
  authDomain: "amia-caraga-website.firebaseapp.com",
  databaseURL: "https://amia-caraga-website-default-rtdb.firebaseio.com",
  projectId: "amia-caraga-website",
  storageBucket: "amia-caraga-website.appspot.com",
  messagingSenderId: "725656270766",
  appId: "1:725656270766:web:008b5df732b3d35dd0fa3f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Function to fetch and display success stories
function fetchSuccessStories() {
  firebase.database().ref('publicStories').once('value').then(function(snapshot) {
    var container = document.getElementById('success-stories-container');
    container.innerHTML = ''; // Clear any existing content
    var stories = [];

    snapshot.forEach(function(childSnapshot) {
      var story = childSnapshot.val();
      stories.push(story);
    });

    // Sort stories by timestamp in descending order
    stories.sort((a, b) => b.timestamp - a.timestamp);

    var count = 0;
    var row;

    stories.forEach(function(story) {
      if (count % 3 === 0) {
        row = document.createElement('div');
        row.className = 'success-stories-row';
        container.appendChild(row);
      }

      // Escape single quotes and newlines
      var sanitizedContent = story.content.replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r');
      var sanitizedTitle = story.title.replace(/'/g, "\\'");

      var storyHTML = `
        <div class="col-lg-4 col-md-6 mb-3 d-flex justify-content-center">
          <div class="auth-form-light text-left py-5 px-4 px-sm-5 mt-4">
            <div class="brand-logo">
              <img src="${story.image}" alt="logo" class="w-100 mt-0" style="padding: 0;">
            </div>
            <h4>${truncateTitle(story.title)}</h4>
            <p>${story.date} | ${story.author} | ${story.office}</p>
            <p class="font-weight-light">${story.description}</p>
            <button type="button" class="btn btn-outline-dark btn-fw" onclick="showModal('${story.image}', '${sanitizedTitle}', '${story.date}', '${story.author}', '${story.office}', '${sanitizedContent}')">Read More</button>
          </div>
        </div>
      `;
      row.insertAdjacentHTML('beforeend', storyHTML);
      count++;
    });
  });
}

// Function to truncate the title if it exceeds 50 words
function truncateTitle(title) {
  var words = title.split(' ');
  if (words.length > 50) {
    return words.slice(0, 50).join(' ') + '...';
  }
  return title;
}

// Fetch success stories on page load
window.onload = fetchSuccessStories;

// Get the modal
var modal = document.getElementById("myModal");

// Function to show the modal with specific content
function showModal(image, title, date, author, office, content) {
  document.getElementById("modal-image").src = image;
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-date").textContent = date;
  document.getElementById("modal-author").textContent = author;
  document.getElementById("modal-office").textContent = office;
  document.getElementById("modal-content").textContent = content;

  modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
