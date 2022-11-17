
const source = document.getElementById('locale')
const amount = document.getElementById('amt')
const category = document.getElementById('category')
const form = document.getElementById('form')
var favourite = document.getElementById('save')
var date = document.getElementById('date')
const EID = (""+Math.random()).substring(2,7); // new

function sendBack() {
    alert("Added!")
    window.location.href = "expense.html";
}
function save() {
    alert("Saved!")
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
    })
    setTimeout(sendBack, 400);
})


favourite.addEventListener('click', (e) => {
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
