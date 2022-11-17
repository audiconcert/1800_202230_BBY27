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

var form = document.getElementById('form');
var newUserName = document.getElementById("nameInput");
var newUserEmail = document.getElementById("emailInput");
var newTreeName = document.getElementById("treeNameInput");
var edit = document.getElementById('edit');
var save = document.getElementById('save');
  


form.addEventListener('submit', (e) => {
  e.preventDefault();
  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          var userID = user.uid;
          console.log(userID);
          db.collection("users").doc(user.uid).update({
            name: newUserName.value,
            email: newUserEmail.value,
            treeName: newTreeName.value,
          });
          document.getElementById("personalInfoFields").disabled = true;
      };
  });
});
