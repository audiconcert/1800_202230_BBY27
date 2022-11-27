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
            window.location.href = 'login.html';
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
            restartExpenseCount(userID);
            document.getElementById("personalInfoFields").disabled = true;
        };
    });
});

function restartExpenseCount(user) {
    var newDate = new Date();
    newDate.setTime(newDate.getTime() + 8000);
    var countDownDate = newDate.getTime();

    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        if (distance < 0) {
            clearInterval(x);
            db.collection("users").doc(user).update({
                expenseCount: 0
            }).then(restartExpenseCount(user));
        }

    }, 1000);

}


// function restartExpenseCount() {
//     firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//             var currentUser = db.collection("users").doc(user.uid);
//             var newDate = new Date();
//             newDate.setTime(newDate.getTime() + 10000);
//             var countDownDate = newDate.getTime();

//             setInterval(function() {
//                 var now = new Date().getTime();
//                 var distance = countDownDate - now;

//                 if (distance < 0) {
//                     currentUser.set({
//                         expenseCount: 0
//                     }, {merge:true});
//                 }
//             }, 1000);
//         }
//     });
// }

// 604800000 milliseconds in a week
// 86400000 milliseconds in a day


