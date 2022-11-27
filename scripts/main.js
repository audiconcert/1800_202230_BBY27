var currentUser;

function insertName() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then((userDoc) => {
                var userName = userDoc.data().name;
                // var treeName = userDoc.data().treeName;
                document.getElementById("name-goes-here").innerText = "Good to see you, " + userName;
            });
        }
    });
}
insertName(); 

function updateExpenseCount() {
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then((doc) => {
                var endDate = doc.data().expenseCountEndDate.toDate();
                var now = new Date();

                if(endDate.getTime() < now.getTime()) {
                    var today = new Date();
                    var newEndDate = new Date();
                    newEndDate.setTime(newEndDate.getTime() + 604800000);
                    currentUser.update({
                        expenseCount: 0, 
                        expenseCountStartDate: today,
                        expenseCountEndDate: newEndDate,
                    })
                } else {
                    console.log('It has not been a week yet');
                }

            })
            
        }
    })
}
// setInterval(function() {
//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             var currentUser = db.collection("users").doc(user.uid);

//             currentUser.get().then((doc) => {
//                 // var startDate = doc.data().expenseCountStartDate;
//                 var now = new Date().getTime();
//                 var endDate = doc.data().expenseCountEndDate.getTime();
//                 var distance = endDate - now;

//                 var newEndDate = new Date();
//                 newEndDate.setTime(newEndDate.getTime() + 10000);
//                 var newToday = new Date();

//                 if (distance < 0) {
//                     currentUser.update({
//                         expenseCount: 0,
//                         expenseCountStartDate: newToday, 
//                         expenseCountEndDate: newEndDate, 
//                     });
//                 }
//             });

          
//         }
//     })
// }, 1000);

// 3600000 ms per hour

// var endDate = new Date();
//                 endDate.setTime(endDate.getTime() + 604800000);
//                 var today = new Date();
//                 currentUser.set({
//                     expenseCountStartDate: today,
//                     expenseCountEndDate: endDate
//                 }, {merge:true});
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
