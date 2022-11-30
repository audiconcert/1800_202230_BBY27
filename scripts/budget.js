

function populateInfo() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then((userDoc) => {
                var budget = userDoc.data().budget;

                if (budget != null) {
                    var budgetInput = document.getElementById('budget');
                    budgetInput.value = budget;
                } 

                var weekly = 0;
                var biWeekly = 0;
                var monthly = 0;
                var yearly = 0;

                currentUser.collection("income").get().then(function (snap) {
                    snap.forEach(function (doc) {
                        let amount = doc.data().amount;
                        let category = doc.data().category;

                        if (category === "Weekly") {
                            weekly += amount;
                        } else if (category === "Bi-Weekly") {
                            biWeekly += (amount/2);
                        } else if (category === "Monthly") {
                            monthly += (amount/4);
                        } else if (category === "Yearly") {
                            yearly += (amount/52);
                        } else {

                        }

                    });
                    var recommendation = document.getElementById('recommendation-here');
                    var recommendedBudget = 0.7 * (weekly + biWeekly + monthly + yearly);
                    recommendation.innerText = formatter.format(recommendedBudget);
                });
                
                

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
            var currentUser = db.collection("users").doc(user.uid);

            if (newBudget.value > 0) {
                currentUser.update({
                    budget: parseFloat(newBudget.value)
                });
                alert('New expense limit saved!');
                document.getElementById("personalInfoFields").disabled = true;

                var endDate = new Date();
                endDate.setTime(endDate.getTime() + 604800000);
                var today = new Date();
                currentUser.set({
                    expenseCountStartDate: today,
                    expenseCountEndDate: endDate
                }, {merge:true});

            } else {
                currentUser.update({
                    budget: 0
                });
                alert("Please enter a number greater than zero.");
            }
        };
    });
});
// 604800000
// function restartExpenseCount() {
//     firebase.auth().onAuthStateChanged(user => {
//         if(user) {
//             var currentUser = db.collection("users").doc(user.uid);

//             var newDate = new Date();
//             newDate.setTime(newDate.getTime() + 5000);
//             var countDownDate = newDate.getTime();

//             setInterval(function() {
//                 var now = new Date().getTime();
//                 var distance = countDownDate - now;
//                 if (distance < 0) {
//                     currentUser.update({
//                         expenseCount: 0
//                     });
//                     restartExpenseCount();
//                 }
//             }, 1000);
//         }
//     });
// }


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


