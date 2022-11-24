const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

function showFavourite() {
    let favouritestemplate = document.getElementById("favouritestemplate");
    let favouriteCardGroup = document.getElementById("favouriteCardGroup");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;

            console.log(userID);

            currentUser.collection("income").get().then(function (snap) {
                snap.forEach(function (doc) {
                    var incomeID = doc.id;
                    var amount = doc.data().amount;
                    var Name = doc.data().name;
                    var date = doc.data().date;
                    var testFavouriteCard = favouritestemplate.content.cloneNode(true);
                    testFavouriteCard.querySelector('.card-amount').innerHTML =  formatter.format(parseFloat(amount));
                    testFavouriteCard.querySelector('.card-title').innerHTML = Name;
                    testFavouriteCard.querySelector('.card-date').innerHTML = date;

                    // testFavouriteCard.querySelector('.card-amount').id = 'amount-' + expenseID;
                    // testFavouriteCard.querySelector('.card-title').id = 'title-' + expenseID;
                    // testFavouriteCard.querySelector('.card-category').id = 'category-' + expenseID;
                    // testFavouriteCard.querySelector('.add').id = 'add-' + expenseID;


                    // testFavouriteCard.querySelector('.edit').onclick = () => setExpenseData(expenseID);
                    testFavouriteCard.querySelector('.delete').onclick = () => deleteFavourite(incomeID);

                    favouriteCardGroup.appendChild(testFavouriteCard);

                });
            });
        } else {
            console.log("No user is signed in");
            window.location.href = 'login.html';
        }
    });
}
showFavourite();

// function addExistingFavourite(expenseID) {
//     firebase.auth().onAuthStateChanged(user => {
//         if(user) {
//             var currentUser = db.collection("users").doc(user.uid);
//             var addID = 'add-' + expenseID;
//             currentUser.collection("expenses").doc(expenseID).get()
//             .then(function(doc) {
//                 var Amount = doc.data().amount;
//                 db.collection("users").doc(user.uid).get().then(function(doc) {
//                     var currentExpenseCount = doc.data().expenseCount;
//                     db.collection("users").doc(user.uid).set({
//                         expenseCount: currentExpenseCount + Amount,
//                     }, {merge:true});
//                 });

//             }).then(function () {
//                 document.getElementById(addID).innerText = 'Added!';
//                 setTimeout(function(){document.getElementById(addID).innerText = 'Add'}, 3500);
//             });
//         }
//     });
// }

function deleteFavourite(ID) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.collection("income").doc(ID).delete().then(() => {
                alert("Deleted Income!");
                window.location.href = "income.html";
            });

        }
    });
}