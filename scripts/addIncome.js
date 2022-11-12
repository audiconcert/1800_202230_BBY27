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
                name: form.name.value,
                amount: parseFloat(form.amount.value),
                date: form.date.value,
            });
            form.name.value = ''
            form.amount.value = ''
            form.date.value = ''
        }
    })
})