document.getElementById('locale').value = localStorage.getItem('expenseSource');
document.getElementById('amt').value = localStorage.getItem('expenseAmount');
document.getElementById('category').value = localStorage.getItem('expenseCategory');
var expenseID = localStorage.getItem('expenseID');

const saveButton = document.getElementById('save');

function save() {
    alert("Saved!")
    window.location.href = "expense.html";
}

saveButton.addEventListener('click', (e) => {
    const expenseCategory = document.getElementById('category');
    const expenseSource = document.getElementById('locale');
    const expenseAmount = document.getElementById('amt');
    if (expenseCategory.value > ''
        && expenseSource.value > ''
        && expenseAmount.value > '') {
        e.preventDefault();
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                var userID = user.uid;
                console.log(userID);
                var expense = db.collection("users").doc(userID).collection("expenses").where("expenseID", "==", expenseID);
                expense.get().then(() => {
                    return expense.update({
                        category: expenseCategory,
                        source: expenseSource,
                        amount: parseFloat(expenseAmount),
                        date: firebase.firestore.Timestamp.fromDate((date.valueAsDate = new Date()))
                    })
                })
            };
        })
    }
    setTimeout(save, 600);
})
