function populateInfo() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then((userDoc) => {
                var budget = userDoc.data().budget;

                if (budget != null) {
                    document.getElementById('budget').value = budget;
                }
            });
        } else {
            console.log("No user is signed in");
        }
    });
}
populateInfo();

var form = document.getElementById('form');
var newBudget = document.getElementById('budget');
var edit = document.getElementById('edit');
var save = document.getElementById('save');

function editUserInfo() {
    document.getElementById("personalInfoFields").disabled = false;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          var userID = user.uid;
          console.log(userID);
          db.collection("users").doc(user.uid).update({
            budget: parseFloat(newBudget.value)
          });
          document.getElementById("personalInfoFields").disabled = true;
      };
  });
});