var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        var user = authResult.user;                            
        if (authResult.additionalUserInfo.isNewUser) {         
            db.collection("users").doc(user.uid).set({         
                    name: user.displayName,                  
                    email: user.email, 
                    treeName: "Ernie",
                    budget: 0,  
                    favourites: firebase.firestore.FieldValue.arrayUnion(),  
                    expenseCount: 0,
                    incomeCount: 0, 
                    completedGoalsCount: 0,          
                }).then(function () {
                    console.log("New user added to firestore");
                    window.location.assign("main.html");       // re-direct to main.html after signup
                })
                .catch(function (error) {
                    console.log("Error adding new user: " + error);
                });
            
        } else {
            return true;
        }
        return false;
    },
      uiShown: function() {
        document.getElementById('loader').style.display = 'none';
      }
    },
    signInFlow: 'popup',
    signInSuccessUrl: 'main.html',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    tosUrl: '<your-tos-url>',
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  ui.start('#firebaseui-auth-container', uiConfig);
