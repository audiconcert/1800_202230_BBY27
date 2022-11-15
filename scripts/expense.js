
var i = 1;

function showFavourite() {
    let favouritestemplate = document.getElementById("favouritestemplate");
    let favouriteCardGroup = document.getElementById("favouriteCardGroup");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);

            currentUser.collection("favourites")
                .limit(10)
                .get()
                .then(function (snap) {
                    
                    snap.forEach(function (doc) {
                        var amount = doc.data().amount;
                        var source = doc.data().source;
                        var category = doc.data().category;
                        var date = doc.data().date;
                        var testFavouriteCard = favouritestemplate.content.cloneNode(true);
                        testFavouriteCard.querySelector('.card-amount').innerHTML = "$" + amount;
                        testFavouriteCard.querySelector('.card-title').innerHTML = source;
                        testFavouriteCard.querySelector('.card-category').innerHTML = category;
                        testFavouriteCard.querySelector('.card-date').innerHTML = date;

                        testFavouriteCard.querySelector('.card-title').id = 'add-source' + i;
                        testFavouriteCard.querySelector('.card-amount').id = 'add-amount' + i;
                        testFavouriteCard.querySelector('.card-category').id = 'add-category' + i;
                        testFavouriteCard.querySelector('.card-date').id = 'add-date' + i;

                        favouriteCardGroup.appendChild(testFavouriteCard);
                        i++;
                    })
                })
        }
    })
}
showFavourite();


function addExistingFavourite() {

    const Amount = document.getElementById('#add-amount' + i)
    const Source = document.getElementById('#add-source' + i)
    const Category = document.getElementById('#add-category' + i)
    // const Date = firebase.firestore.Timestamp.fromDate(date.valueAsDate = new Date())
    console.log(Amount);
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);
            currentUser.collection("expenses").add({
                source: Source,
                category: Category,
                userID: userID,
                amount: parseFloat(Amount),
                // date: Date
            })
        }
    })
}
// const source = document.getElementById('locale')
// const amount = document.getElementById('amt')
// const category = document.getElementById('category')
// const form = document.getElementById('form')
// const favourite = document.getElementById('save')
// var date = document.getElementById('date')


// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             var userID = user.uid;
//             console.log(userID);
//             db.collection("users").doc(user.uid).collection("expenses").add({
//                 source: source.value,
//                 category: form.category.value,
//                 amount: parseFloat(amount.value),
//                 date: firebase.firestore.Timestamp.fromDate(date.valueAsDate = new Date())
//             });
//             form.source.value = ''
//             form.amount.value = ''
//             form.date.value = ''
//         };
//     })
// })





function deleteFavourite() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.collection("favourites").doc(/*the document*/).delete().then(() => {
                alert("Expense successfully deleted.")
            })
        }
    })
}

function deleteExpense() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.collection("expenses").doc(/*the document*/).delete().then(() => {
                alert("Expense successfully deleted.")
            })
        }
    })
}
