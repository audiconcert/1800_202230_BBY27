var currentUser;

function populateInfo() {
    firebase.auth().onAuthStateChanged((user) => {
        if(user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then((userDoc) => {
                var userName = userDoc.data().name;
                var userEmail = userDoc.data().email;
                var treeName = userDoc.data().treeName;

                if (userName != null) {
                    document.getElementById("nameInput").value = userName;
                }
                if (userEmail != null) {
                    document.getElementById("emailInput").value = userEmail;
                }
                if (treeName != null) {
                    document.getElementById("treeNameInput").value = treeName;
                }

            });
        } else {
            console.log("No user is signed in");
        }
    });
}

populateInfo();

function editUserInfo() {
    document.getElementById("personalInfoFields").disabled = true;
}

function saveUserInfo() {
    userName = document.getElementById("nameInput").value;
    userEmail = document.getElementById("emailInput").value;
    treeName = document.getElementById("treeNameInput").value;
}