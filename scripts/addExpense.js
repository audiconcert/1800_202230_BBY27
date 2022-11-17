
const source = document.getElementById('locale')
const amount = document.getElementById('amt')
const category = document.getElementById('category')
const date = document.getElementById('date')
const EID = (""+Math.random()).substring(2,7); // new
const form = document.getElementById('form')
const save = document.getElementById('saveExp')
const favourite = document.getElementById('addFav')

function addFav() {
    alert('Saved and Added to Favourites!');
    window.location.href = "expense.html";
}

function saveExp() {
    alert('Saved Expense!');
    window.location.href = "expense.html";
}


const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userID = user.uid;
            console.log(userID);
            db.collection("users").doc(user.uid).collection("expenses").add({
                // expenseID: EID, 
                source: source.value,
                category: form.category.value,
                amount: parseFloat(amount.value),
                date: firebase.firestore.Timestamp.fromDate(date.valueAsDate = new Date())
            });
            form.source.value = ''
            form.amount.value = ''
            form.date.value = ''
        };
    });
    setTimeout(saveExp, 400);
});


favourite.addEventListener('submit', (e) => {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userID = user.uid;
            console.log(userID);
            db.collection("users").doc(user.uid).collection("expenses").add({
                // expenseID: EID, 
                source: source.value,
                category: form.category.value,
                amount: parseFloat(amount.value),
                date: firebase.firestore.Timestamp.fromDate(date.valueAsDate = new Date())
            }).then(() => {
                db.collection("users").doc(user.uid).add({
                    
                })
            })
            // form.source.value = ''
            // form.amount.value = ''
            // form.date.value = ''
        };
    });
    
    setTimeout(addFav, 400);
});


// if (form.amount.value > ''
//         && form.source.value > ''
//         && form.date.value > '') {
//         e.preventDefault();
//         firebase.auth().onAuthStateChanged(user => {
//             if (user) {
//                 var userID = user.uid;
//                 console.log(userID);
//                 db.collection("users").doc(user.uid).collection("favourites").add({
//                     expenseID: EID,
//                     source: form.source.value,
//                     amount: parseFloat(amount.value),
//                     category: form.category.value,
//                     date: firebase.firestore.Timestamp.fromDate(date.valueAsDate = new Date())
//                 });
//             }
//         })
//     }
