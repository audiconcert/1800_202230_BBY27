var currentUser;

function populateInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      currentUser.get().then((userDoc) => {
        var userName = userDoc.data().name;
        var userEmail = userDoc.data().email;
        var treeNamE = userDoc.data().treeName;
        let picUrl = userDoc.data().profilePic;

        if (userName != null) {
          document.getElementById("nameInput").value = userName;
        }
        if (userEmail != null) {
          document.getElementById("emailInput").value = userEmail;
        }
        if (treeName != null) {
          document.getElementById("treeNameInput").value = treeNamE;
        }
        if (picUrl != null) {
          $("#mypic-goes-here").attr("src", picUrl);
        }
      });
    } else {
      console.log("No user is signed in");
      window.location.href = 'login.html';
    }
  });
}

populateInfo();

var ImageFile;

function chooseFileListener() {
  const fileInput = document.getElementById("mypic-input");
  const image = document.getElementById("mypic-goes-here");
  fileInput.addEventListener('change', function (e) {
    ImageFile = e.target.files[0];
    var blob = URL.createObjectURL(ImageFile);
    image.src = blob;
  })
}
chooseFileListener();

function editUserInfo() {
  document.getElementById("personalInfoFields").disabled = false;
  document.getElementById('emailInput').disable = true; // prevents users from changing their email.
}

function saveUserInfo() {
  firebase.auth().onAuthStateChanged(function (user) {
    var storageRef = storage.ref("images/" + user.uid + ".jpg");

    //Asynch call to put File Object (global variable ImageFile) onto Cloud
    storageRef.put(ImageFile)
      .then(function () {
        console.log('Uploaded to Cloud Storage.');

        //Asynch call to get URL from Cloud
        storageRef.getDownloadURL()
          .then(function (url) { // Get "url" of the uploaded file
            console.log("Got the download URL.");
            //get values from the from
            userName = document.getElementById('nameInput').value;
            userEmail = document.getElementById('emailInput').value;
            userTree = document.getElementById('treeNameInput').value;

            db.collection("users").doc(user.uid).update({
              name: userName,
              email: userEmail,
              treeName: userTree,
              profilePic: url
            })
              .then(function () {
                console.log('Added Profile Pic URL to Firestore.');
                console.log('Saved use profile info');
                document.getElementById('personalInfoFields').disabled = true;
              })
          })
      })
  })
}


function sendBack() {
  window.location.href = 'index.html';
}

function logout() {
  console.log("logging out user");
  firebase.auth().signOut().then(() => {
    alert('Signed out!');
    setTimeout(sendBack, 1000);
  }).catch((error) => {
    console.log('an error occurred.')
  });
}