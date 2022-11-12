
const source = document.getElementById('locale')
const amount = document.getElementById('amt')
const category = document.getElementById('category')
const date = document.getElementById('date')
const form = document.getElementById('form')
const favourite = document.getElementById('save')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userID = user.uid;
            console.log(userID);
            db.collection("users").doc(user.uid).collection("expenses").add({
                source: Source,
                userID: userID,
                amount: parseFloat(Amount),
                date: firebase.firestore.Timestamp.fromDate(new Date(Date))
            }).then(() => {
                window.location.href = "expense.html"; //new line added
            })
        };
    });
});


function addFavourite() {
    console.log("in");
    let source = document.getElementById("locale").value;
    let amount = document.getElementById("amt").value;
    let date = document.getElementById("date").value;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);
            db.collection("users").doc(user.uid).collection("favourites").add({
                source: source,
                userID: user.uid,
                amount: amount,
                date: date,
                source: form.source.value,
                amount: parseFloat(form.amount.value),
                category: form.category.value,
                date: form.date.value
            });
            form.source.value = ''
            form.amount.value = ''
            form.date.value = ''
        }
    })
};

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
                    amount: form.amount.value,
                    category: form.category.value,
                    date: form.date.value
                });
                db.collection("users").doc(user.uid).collection("expenses").add({
                    source: form.source.value,
                    amount: form.amount.value,
                    category: form.category.value,
                    date: form.date.value
                });
                form.source.value = ''
                form.amount.value = ''
                form.date.value = ''
            }
        })
    }
})