

    var firebaseConfig = {
        apiKey: "AIzaSyCcAvpKc4n6ULH5jViXsOq3qy9sRPKEs70",
        authDomain: "capstoneprojectfinal-4cde6.firebaseapp.com",
        projectId: "capstoneprojectfinal-4cde6",
        storageBucket: "capstoneprojectfinal-4cde6.appspot.com",
        messagingSenderId: "32836148502",
        appId: "1:32836148502:web:dd2dccf61b02d3d2d10437",
        measurementId: "G-9L2VC0VBPM"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
     // firebase.analytics();
      var db = firebase.firestore();
      var storage = firebase.storage();
function login() {

    var userEmail = document.getElementById("email").value;
    var userPass = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(errorMessage);
        console.log("sign in : Eror => " + errorMessage);
    
        // ...
      });

}

let storageRef = storage.ref('admin/profilePicture');
let fileUpload = document.getElementById("file")
var file;
var urlImage;
var imageName;


fileUpload.addEventListener('change', function(event){
    var image = document.getElementById('output');
    urlImage = URL.createObjectURL(event.target.files[0]);
 
    image.src = urlImage;
    file = event.target.files[0];                                               

   
})
function signup() {
    //createUserWithEmailAndPassword
    var myemail = document.getElementById("signup_email").value;
    var mypassword = document.getElementById("signup_password").value;
    var fname = document.getElementById("FirstNameInput").value;
    var mname = document.getElementById("MiddleNameInput").value;
    var lname = document.getElementById("LastNameInput").value;
    var id = document.getElementById("Idnumber").value;
    var myusername = document.getElementById("username").value;
    var mydepartment = document.getElementById("department").value;

    console.log(myemail);
    console.log(mypassword);
    console.log(fname);
    console.log(mname);
    console.log(lname);
    console.log(id);
    console.log(myusername);
    console.log(mydepartment);
    
    if (myemail == '' || mypassword == '' || fname == '' || mname == '' || lname == '' || id == '' || myusername == '' || mydepartment == '') {
        window.alert('Check your fields');
        return
    }
    firebase.auth().createUserWithEmailAndPassword(myemail, mypassword)
    .then((usercreds) => {
        console.log(usercreds.user.uid);
        var userid = usercreds.user.uid;
     
        if (file != null) {
            storage.ref('admin/' + userid).put(file).then(function(snapshot) {
           
            },function(error) {
                console.log('ERROR => ' + error.message);
            });
        }
      
        db.collection("users").doc(userid).set({
            firstname : fname,
            middlename : mname,
            lastname : lname,
            idnumber : id,
            username : myusername,
            department : mydepartment,
            email : myemail,
            password : mypassword,
           
        })
        .then(function() {
            // console.log("Document successfully written!");
             window.alert("Succesully registered!");
            window.location.href = "MainPage.html";
        })
        .catch(function(error) {
            console.error("Error writing document: ", error.message);
            window.alert(error.message);
        });
      
    })

    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    
        window.alert("Error : " + errorMessage);
    
        // ...
      });

}

function logout() {
  

        firebase.auth().signOut().then(function() {
            // Sign-out successful.
           
         
          }).catch(function(error) {
            // An error happened.
            window.alert(err.message);
          });
   
  
}

// =====> SUPER ADMIN AUTH <======== //


function LogInButton() {
    var email = document.getElementById('emailfield');
    var password = document.getElementById('passwordfield');
    firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(function(user){
      
       // window.location.href = "MainPageSuperAdminAccount.html";
       
    })
    .catch(function(err){
        console.log('ERROR ' + err);
        window.alert(err);
    });
}

function logoutbtn() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
       // window.alert('succesfully logout');

      }).catch(function(error) {
        // An error happened.
        console.log("sign out error " + error);
      });
}