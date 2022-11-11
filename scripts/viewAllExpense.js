function showExpenses() {
    let cardTemplate = document.getElementById("expenseCardTemplate");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            console.log(userID);

            currentUser.collection("expenses")
                .get()
                .then(snap => {
                    //var i = 1;  //if you want to use commented out section
                    snap.forEach(doc => { //iterate thru each doc
                        var source = doc.data().source;        // get value of the "name" key
                        var amount = doc.data().amount;   // get value of the "details" key
                        var date = doc.data().date;    //get unique ID to each hike to be used for fetching right image
                        let newcard = cardTemplate.content.cloneNode(true);

                        //update title and text and image
                        newcard.querySelector('.card-title').innerHTML = source;
                        newcard.querySelector('.card-text').innerHTML = amount;
                        newcard.querySelector('.card-length').innerHTML = date;

                        //give unique ids to all elements for future use
                        // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                        // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                        // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                        //attach to gallery
                        document.getElementById("expenses-go-here").appendChild(newcard);
                        //i++;   //if you want to use commented out section
                    })
                });
        }
    });
}

showExpenses();