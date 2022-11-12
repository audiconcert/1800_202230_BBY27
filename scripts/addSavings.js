const name = document.getElementById('name')
const amount = document.getElementById('amt')
const date = document.getElementById('date')
const contributions = document.getElementById('contributions')
const form = document.getElementById('form')


form.addEventListener('submit', (e) => {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userID = user.uid;
            console.log(userID);
            db.collection("users").doc(user.uid).collection("savings").add({
                name: form.name.value,
                amount: parseFloat(form.amount.value),
                contributions: parseFloat(form.contributions.value),
                date: form.date.value,
            });
            form.name.value = ''
            form.amount.value = ''
            form.date.value = ''
            form.contributions.value = ''
        }
    })
})