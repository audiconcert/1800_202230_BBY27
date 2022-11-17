var currentUser;

function populateInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      currentUser.get().then((userDoc) => {
        var userName = userDoc.data().name;
        var userEmail = userDoc.data().email;
        var treeNamE = userDoc.data().treeName;

        if (userName != null) {
          document.getElementById("nameInput").value = userName;
        }
        if (userEmail != null) {
          document.getElementById("emailInput").value = userEmail;
        }
        if (treeNamE != null) {
          document.getElementById("treeNameInput").value = treeNamE;
        }
      });
    } else {
      console.log("No user is signed in");
    }
  });
}

populateInfo();

function editUserInfo() {
  document.getElementById("personalInfoFields").disabled = false;
}

// Can't save new (edited) info yet
function saveUserInfo() {
  userName = form.document.getElementById("nameInput").value;
  userEmail = form.document.getElementById("emailInput").value;
  treeNamE = form.document.getElementById("treeNameInput").value;

  currentUser
    .update({
      name: userName,
      email: userEmail,
      treeName: treeNamE,
    })
    .then(() => {
      console.log("Document successfully updated");
    });

  document.getElementById("personalInfoFields").disabled = true;
}
