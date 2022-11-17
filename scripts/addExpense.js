
const source = document.getElementById('locale')
const amount = document.getElementById('amt')
const category = document.getElementById('category')
const date = document.getElementById('date')
const EID = (""+Math.random()).substring(2,7); // new
const form = document.getElementById('form')
const save = document.getElementById('saveExp')
const favourite = document.getElementById('addFav')

function addFav() {
    favourite.innerText = 'Added to Favourites!';
}

function saveExp() {
    alert('Saved Expense!');
}


const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

form.addEventListener('submit', (e) => {
    saveExp();
    e.preventDefault();
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userID = user.uid;
            console.log(userID);
            db.collection("users").doc(user.uid).collection("expenses").add({
                expenseID: EID, // new
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
    window.location.href = "expense.html"
    setTimeout(sendBack, 400);
})


favourite.addEventListener('click', (e) => {
    addFav();
    if (form.amount.value > ''
        && form.source.value > ''
        && form.date.value > '') {
        e.preventDefault();
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                var userID = user.uid;
                console.log(userID);
                db.collection("users").doc(user.uid).collection("favourites").add({
                    expenseID: EID,
                    source: form.source.value,
                    amount: parseFloat(amount.value),
                    category: form.category.value,
                    date: firebase.firestore.Timestamp.fromDate(date.valueAsDate = new Date())
                });
            }
        })
    }
    setTimeout(save, 400);
})
