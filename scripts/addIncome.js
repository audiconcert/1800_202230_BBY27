const Name = document.getElementById('source');
const amount = document.getElementById('amount');
const category = document.getElementById('category');
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
                category: category.value,
            });
            var Amount = parseFloat(amount.value);
            db.collection("users").doc(user.uid).get().then(function (doc) {
                var currentIncomeCount = doc.data().incomeCount;
                db.collection("users").doc(user.uid).set({
                    incomeCount: currentIncomeCount + Amount
                }, { merge: true });
            });
            form.name.value = ''
            form.amount.value = ''
            form.date.value = ''
        }
    });
    setTimeout(save, 2000);
});