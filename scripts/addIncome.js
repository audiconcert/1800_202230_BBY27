const Name = document.getElementById('source');
const amount = document.getElementById('amount');
const date = document.getElementById('date');
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
                date: date.value,
            });
            form.name.value = ''
            form.amount.value = ''
            form.date.value = ''
        }
    });
    setTimeout(save, 400);
});