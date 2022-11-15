function showExpenses() {
    let cardTemplate = document.getElementById("expenseCardTemplate");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);

            currentUser.collection("expenses")
                .orderBy("date")
                .get()
                .then(snap => {

                    snap.forEach(doc => {
                        var source = doc.data().source;
                        var amount = doc.data().amount;
                        var expenseID = doc.data().expenseID;
                        var category = doc.data().category;
                        var date = doc.data().date
                        let newcard = cardTemplate.content.cloneNode(true);
                        newcard.querySelector('.card-amount').innerHTML = "$" + amount;
                        newcard.querySelector('.card-title').innerHTML = source;
                        newcard.querySelector('.card-category').innerHTML = category;
                        newcard.querySelector('.card-date').innerHTML = date;

                        newcard.querySelector('.card-title').id = 'f-source';
                        newcard.querySelector('.card-amount').id = 'f-amount';
                        newcard.querySelector('.card-category').id = 'f-category';
                        newcard.querySelector('.card-date').id = 'f-date';
                        newcard.querySelector('.add').id = 'add-' + expenseID;
                        newcard.querySelector('.add').onclick = () => addExistingExpense(expenseID);
                        document.getElementById("expenses-go-here").appendChild(newcard);

                    })
                });
        }
    });
}

showExpenses();

function addExistingExpense(expenseID) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.collection("expenses").where("expenseID", "==", expenseID)
                .get()
                .then(function (snap) {
                    snap.forEach(function (doc) {
                        currentUser.collection("expenses").add({
                            amount: doc.data().amount,
                            source: doc.data().source,
                            expenseID: doc.data().expenseID,
                            category: doc.data().category,
                            date: doc.data().date
                        })
                    })
                })
                .then(function () {
                    var addID = 'add-' + expenseID;
                    document.getElementById(addID).innerText = 'Added!';
                })
        }
    })
}