


// function showGoal() {
//     console.log("in");
//     let contributeTemplate = document.getElementById("contributeTemplate");
//     let goalGroup = document.getElemenetById("contributeGroup");

//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             var currentUser = db.collection("users").doc(user.uid);
//             var userID = user.uid;
//             console.log(userID);
//             currentUser.collection("savings")
//             .get()
//             .then (function(snap) {
//                 snap.forEach(function(doc) {
//                     console.log(doc.data().name);
//                     var goalName = doc.data().name;
//                     var goalAmount = doc.data().amount;
//                     let testGoal = contributeTemplate.content.cloneNode(true);
//                     testGoal.querySelector('.goalName').innerHTML = goalName;
//                     testGoal.querySelector('.goalAmount').innerHTML = "/ $" + goalAmount;
//                     goalGroup.appendChild(testGoal);
//                 })
//             })

//             // .add({
//             //     contributions: Contributions
//             // }).then(() => {
//             //     window.location.href = "savingsGoal.html"; //new line added
//             // })
//         };
//     });
// }

// showGoal();
