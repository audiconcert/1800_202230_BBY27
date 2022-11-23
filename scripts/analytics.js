var currentUser;
var treeImg = document.getElementById('ernieImg');
var imgTemplate = document.getElementById('imgTemplate');
var imgCard = document.getElementById('imgCard');
var progressBar = document.getElementsByClassName('progress-bar');
var now = new Date();


function insertTreeName() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then((userDoc) => {
                var treeName = userDoc.data().treeName;
                document.getElementById("treeName").innerText = treeName + "'s Health";
            })
        } else {
            console.log('No user is signed in');
        }
    });
}
insertTreeName();

function insertTree() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then((userDoc) => {
                var expenses = userDoc.data().expenseCount;
                var income = userDoc.data().incomeCount;
                if (expenses > income) {
                    var terrible = document.getElementById('tree');
                    terrible.src = '/images/tree3.png'
                } else if (expenses < income) {
                    var terrible = document.getElementById('tree');
                    terrible.src = '/images/tree1.png'
                }
            })
        }
    })
}
insertTree();