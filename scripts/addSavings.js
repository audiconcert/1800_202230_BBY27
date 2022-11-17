const Name = document.getElementById("name");
const amount = document.getElementById("amt");
const date = document.getElementById("date");
const contributions = document.getElementById("contributions");
const form = document.getElementById("form");
const SID = ("" + Math.random()).substring(2, 7);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var userID = user.uid;
      console.log(userID);
      db.collection("users")
        .doc(user.uid)
        .collection("savings")
        .add({
          savingsID: SID,
          name: Name.value,
          amount: parseFloat(amount.value),
          contributions: parseFloat(contributions.value),
          date: firebase.firestore.Timestamp.fromDate(
            (date.valueAsDate = new Date())
          ),
        });
    }
    Name.value = "";
    amount.value = "";
    date.value = "";
    contributions.value = "";
  });
});

// let savingsID = localStorage.getItem("savingsID");

// function populateInfo() {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       var currentUser = db.collection("users").doc(user.uid);
//       currentUser
//         .collection("savings")
//         .where("savingsID", "==", savingsID)
//         .get()
//         .then((savingsDoc) => {
//             var size = savingsDoc.size;
//             var goal= savingsDoc.docs;
//             // var goalamount = userDoc.data().amount;
//             // etc
//             if((size = 1)) {
//                 var thisGoal = goal[0].data();
//                 var goalname = thisGoal.name;
//                 var goalamount = thisGoal.amount;
//             }

//             document.getElementById("name").innerHTML = goalname;
//             document.getElementById("amt").innerHTML = goalamount;
//         });
//     }
//   });
// }
