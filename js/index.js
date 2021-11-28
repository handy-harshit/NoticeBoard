
const firebaseConfig = {
    apiKey: "AIzaSyC9iwB7T0IA6qQmLcg-j6mg9xj3N5J24ls",
    authDomain: "noticeboard-eb256.firebaseapp.com",
    projectId: "noticeboard-eb256",
    databaseURL: "noticeboard-eb256-default-rtdb.firebaseio.com",
    storageBucket: "noticeboard-eb256.appspot.com",
    messagingSenderId: "950214447583",
    appId: "1:950214447583:web:eb7610b7c9889442f0f46a",
    measurementId: "G-NNNQX6NMKZ"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.storage();
//firebase.getDatabase(firebaseConfig);
//firebase.getAnalytics(app);




firebase.auth.Auth.Persistence.LOCAL;

$("#btn-login").click(function()
   {
      var email = $("#email").val();
      var password = $("#password").val();
      if(email != ""  &&  password != "")
      {
          var result = firebase.auth().signInWithEmailAndPassword(email, password); 
          result.catch(function(error)
          {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode);
              console.log(errorMessage);
              window.alert("Message : " + errorMessage);
          });
      }
      else
      {
          window.alert("Form is incomplete. Please fill out all fields.");
      }
    });

$("#btn-signup").click(function()
    {
        var email = $("#email").val();
        var password = $("#password").val();
        var cPassword = $("#confirmPassword").val();
  
        if(email != ""  &&  password != ""  &&  cPassword != "")
        {
            if(password == cPassword)
            {
              var result = firebase.auth().createUserWithEmailAndPassword(email, password); 
  
              result.catch(function(error)
              {
                  var errorCode = error.code;
                  var errorMessage = error.message;
    
                  console.log(errorCode);
                  console.log(errorMessage);
    
                  window.alert("Message : " + errorMessage);
              });
            }
            else
            {
              window.alert("Password do not match with the Confirm Password.");
            }
        }
        else
        {
            window.alert("Form is incomplete. Please fill out all fields.");
        }
    });

$("#btn-resetPassword").click(function()
    {
       var auth = firebase.auth();
       var email = $("#email").val();
  
       if(email != "")
       {
           auth.sendPasswordResetEmail(email).then(function()
           {
              window.alert("Email has been sent to you, Please check and verify.");
           })
           .catch(function(error)
           {
              var errorCode = error.code;
              var errorMessage = error.message;
  
              console.log(errorCode);
              onsole.log(errorMessage);
  
              window.alert("Message : " + errorMessage);
           });
       }
       else
       {
          window.alert("Please write your email first.");
       }
    });


$("#btn-logout").click(function()
    {
        firebase.auth().signOut();
    });

$("#btn-update").click(function()
    {
      //var phone = $("#phone").val();
      //var address = $("#address").val();
      var bio = $("#bio").val();
      var fName = $("#firstName").val();
      var sName = $("#secondName").val();
      var eMail = $("#email").val();
      //var country = $("#country").val();
      //var gender = $("#gender").val();
  
      var rootRef = firebase.database().ref().child("Users");
      var userID = firebase.auth().currentUser.uid;
      var usersRef = rootRef.child(userID);

    //   console.log(rootRef,userID,usersRef)
      
  
      if(fName!="" && sName!="" && eMail!="" && bio!="")
      {
          var userData = 
          {
            //   "phone": phone,
            //   "address": address,
              "bio": bio,
              "firstName": fName,
              "secondName": sName,
              "email":eMail
            //   "country": country,
            //   "gender": gender,
          };
  
          usersRef.set(userData, function(error)
          {
              if(error)
              {
                  var errorCode = error.code;
                  var errorMessage = error.message;
  
                  console.log(errorCode);
                  console.log(errorMessage);
  
                  window.alert("Message : " + errorMessage);
              }
              else
              {
                  window.location.href = "MainPage.html";
              }
          });
      }
      else
      {
          window.alert("Form is incomplete. Please fill out all fields.");
      }
    });

function switchView(view)
{
    $.get({
        url:view,
        cache:false,
    })
    .then(function(data){
        $("#container").html(data);
    });
}