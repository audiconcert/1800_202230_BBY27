
const source = document.getElementById('locale')
const amount = document.getElementById('amt')
const category = document.getElementById('category')
const form = document.getElementById('form')
const favourite = document.getElementById('save')
var date = document.getElementById('date')


form.addEventListener('submit', (e) => {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userID = user.uid;
            console.log(userID);
            db.collection("users").doc(user.uid).collection("expenses").add({
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
                    source: form.source.value,
                    amount: parseFloat(amount.value),
                    category: form.category.value,
                    date: firebase.firestore.Timestamp.fromDate(date.valueAsDate = new Date())
                });
                db.collection("users").doc(user.uid).collection("expenses").add({
                    source: form.source.value,
                    amount: parseFloat(amount.value),
                    category: form.category.value,
                    date: firebase.firestore.Timestamp.fromDate(date.valueAsDate = new Date())
                });
                form.source.value = ''
                form.amount.value = ''
                form.date.value = ''
            }
        })
    }
})