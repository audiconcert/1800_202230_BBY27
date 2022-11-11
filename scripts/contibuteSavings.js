let goalID = localStorage.getItem("name");

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;
        console.log(userID);

        currentUser.collection("savings").doc(savings.uid)
        .where("name", "==", goalID)
        .get()
        .then((queryGoal) => {
            //see how many results you have got from the query
            size = queryGoal.size;
            // get the documents of query
            Goal = queryGoal.docs;

            // We want to have one document per hike, so if the the result of
            //the query is more than one, we can check it right now and clean the DB if needed.
            if ((size = 1)) {
            var thisGoal = Goal[0].data();
            var name = thisGoal.name;
            document.getElementById("goal").innerHTML = name;
            } else {
            console.log("Query has more than one data");
            }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }
})




// function showGoals() {
//     let favouritestemplate = document.getElementById("goalstemplate");
//     let favouriteCardGroup = document.getElementById("goalsCardGroup");

//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             var currentUser = db.collection("users").doc(user.uid);
//             var userID = user.uid;
//             console.log(userID);

//             currentUser.collection("savings")
//                 .get()
//                 .then(function (snap) {
//                     snap.forEach(function (doc) {
//                         var goalAmount = doc.data().amount;
//                         var contributions = doc.data().contributions;
//                         var name = doc.data().name;
//                         let testFavouriteCard = favouritestemplate.content.cloneNode(true);
//                         testFavouriteCard.querySelector('.card-title1').innerHTML = "$" + contributions;
//                         testFavouriteCard.querySelector('.card-title2').innerHTML = "/  $" + goalAmount;
//                         testFavouriteCard.querySelector('.card-length').innerHTML = name;
//                         favouriteCardGroup.appendChild(testFavouriteCard);
//                     })
//                 })
//         }
//     })
// }
// showGoals();

// function showGoal() {
//     let Name = document.getElementById("goal");
//     let Goal = document.getElementById("goalAmount");

//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             var currentUser = db.collection("users").doc(user.uid);
//             var userID = user.uid;
//             console.log(userID);

//             currentUser.collection("savings").doc(savings.uid)
//             .get()
//             .then(function (snap) {
//                 snap.forEach(function (doc) {
//                     var goalAmount = doc.data().amount;
//                     var goalName = doc.data().name;
//                     $("goalAmount").text("/ $" +goalAmount);
//                     $("goal").text(goalName);
//                 })
//             })

//         }
//     })
// }

// function contributeSavings() {
//     console.log("in");
//     let Name = document.getElementById("goal").value;
//     let Contributions = document.getElementById("contributions").value;

//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             var currentUser = db.collection("users").doc(user.uid);
//             var userID = user.uid;
//             console.log(userID);
//             db.collection("users").doc(user.uid).collection("savings").add({
//                 name: Name,
//                 userID: userID,
//                 amount: SavingsAmount,
//                 date: Date,
//                 contributions: Contributions
//             }).then(() => {
//                 window.location.href = "savingsGoal.html"; //new line added
//             })
//         };
//     });
// }

