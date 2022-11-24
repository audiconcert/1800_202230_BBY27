var currentUser;

function insertName() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then ((userDoc) => {
                var userName = userDoc.data().name;
                var treeName = userDoc.data().treeName;
                document.getElementById("name-goes-here").innerText = "Good to see you, " + userName;  
                document.getElementById("tree-name-goes-here").innerText = treeName;
            });
        } else {
            console.log('No user is signed in');
        }
    });
}
insertName(); 