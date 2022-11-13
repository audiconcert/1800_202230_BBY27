const name = document.getElementById('name')
const amount = document.getElementById('amt')
const date = document.getElementById('date')
const form = document.getElementById('form')



form.addEventListener('submit', (e) => {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userID = user.uid;
            console.log(userID);
            db.collection("users").doc(user.uid).collection("income").add({
                name: name.value,
                amount: parseFloat(amount.value),
                date: firebase.firestore.Timestamp.fromDate(date.valueAsDate = new Date())
            });
            form.name.value = ''
            form.amount.value = ''
            form.date.value = ''
        }
    })
})