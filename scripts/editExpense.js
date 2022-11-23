
var sourceInput = document.getElementById("locale");
var amountInput = document.getElementById("amt");
// var categoryInput = document.getElementById("category");
const expenseID = localStorage.getItem('id');

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.collection("expenses").doc(expenseID).get().then(function(doc) {
                var Source = doc.data().source;
                var Amount = doc.data().amount;
                // var Category = doc.data().category;

                if (Source != null) {
                    sourceInput.value = Source;
                }
                if (Amount != null) {
                    amountInput.value = Amount;
                }
                // if (Category != null) {
                //     categoryInput.value = Category;
                // }
            });
        } else {
            console.log("No user signed in.");
        }
    });
}
populateInfo();




// function save() {
//     alert("Saved!")
//     window.location.href = "expense.html";
// }

// saveButton.addEventListener('click', (e) => {
//     var expenseCategory = document.getElementById('category');
//     var expenseSource = document.getElementById('locale');
//     var expenseAmount = document.getElementById('amt');
//     if (expenseCategory.value > ''
//         && expenseSource.value > ''
//         && expenseAmount.value > '') {
//         e.preventDefault();
//         firebase.auth().onAuthStateChanged(user => {
//             if (user) {
//                 var userID = user.uid;
//                 console.log(userID);
//                 var expense = db.collection("users").doc(userID).collection("expenses").where("expenseID", "==", expenseID);
//                 expense.get().then(() => {
//                     return expense.update({
//                         category: expenseCategory,
//                         source: expenseSource,
//                         amount: parseFloat(expenseAmount),
//                         date: firebase.firestore.Timestamp.fromDate((date.valueAsDate = new Date()))
//                     })
//                 })
//             };
//         })
//     }
//     setTimeout(save, 600);
// });
