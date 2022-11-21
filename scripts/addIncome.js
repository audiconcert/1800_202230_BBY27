const Name = document.getElementById('source');
const amount = document.getElementById('amount');
const button = document.getElementById('logIncome');
// const date = document.getElementById('date');

function save() {
    alert('Saved income!');
    window.location.href = "income.html";
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userID = user.uid;
            console.log(userID);
            db.collection("users").doc(userID).collection("income").add({
                name: Name.value,
                amount: parseFloat(amount.value),
                // date: firebase.firestore.Timestamp.fromDate(date.valueAsDate = new Date())
            });
            form.name.value = ''
            form.amount.value = ''
            form.date.value = ''
        }
    });
    setTimeout(save, 400);
});