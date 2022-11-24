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
        if (treeName != null) {
          document.getElementById("treeNameInput").value = treeNamE;
        }
      });
    } else {
      console.log("No user is signed in");
      window.location.href = 'login.html';
    }
  });
}

populateInfo();

var ImageFile;      //global variable to store the File Object reference

function chooseFileListener(){
    const fileInput = document.getElementById("mypic-input");   // pointer #1
    const image = document.getElementById("mypic-goes-here");   // pointer #2

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function(e){

        //the change event returns a file "e.target.files[0]"
	      ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);

        //change the DOM img element source to point to this file
        image.src = blob;    //assign the "src" property of the "img" tag
    })
}
chooseFileListener();

function editUserInfo() {
  document.getElementById("personalInfoFields").disabled = false;
}

var form = document.getElementById('form');
var newUserName = document.getElementById("nameInput");
var newUserEmail = document.getElementById("emailInput");
var newTreeName = document.getElementById("treeNameInput");
var edit = document.getElementById('edit');
var save = document.getElementById('save');
var logout = document.getElementById('logout');

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
      } else {
        console.log("No user is signed in");
        window.location.href = 'login.html';
      }
  });
});

logout.addEventListener('click', (e) => {
  window.location.href = 'index.html';
});