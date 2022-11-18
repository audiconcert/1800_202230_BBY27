
const source = document.getElementById('locale')
const amount = document.getElementById('amt')
const category = document.getElementById('category')
const date = document.getElementById('date')
const form = document.getElementById('form')
const save = document.getElementById('saveExp')
const favourite = document.getElementById('addFav')

function addFav() {
    alert('Logged Expense and Added to Favourites!');
    window.location.href = "expense.html";

}

function saveExp() {
    alert('Logged Expense!');
    window.location.href = "expense.html";
}


const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

favourite.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            var userID = user.uid;
            console.log(userID);
            db.collection("users").doc(user.uid).collection("expenses").add({
                source: form.source.value, 
                category: form.category.value, 
                amount: parseFloat(form.amount.value),
            }).then(function(doc) {
                var expenseID = doc.id;
                db.collection("users").doc(userID).set({
                    favourites: firebase.firestore.FieldValue.arrayUnion(expenseID)
                }, {merge:true});
            });           
        }
    });
    setTimeout(addFav, 400);
});

save.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            var userID = user.uid;
            console.log(userID);
            db.collection("users").doc(user.uid).collection("expenses").add({
                source: form.source.value,
                category: form.category.value,
                amount: parseFloat(form.amount.value),
            });
        }
    });
    setTimeout(saveExp, 400);
});

