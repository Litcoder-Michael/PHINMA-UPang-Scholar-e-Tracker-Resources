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
 

  // ======> ADMIN <======== //
  var search = document.getElementById('search');
  var myname =  document.getElementById('name');
  var sched =   document.getElementById('sched');
  var idnum =   document.getElementById('idnum');
  var course =  document.getElementById('course');
  var scholar = document.getElementById('scholar');
  var year =    document.getElementById('year');
  var department = document.getElementById('department');
  var faculty = document.getElementById('faculty');

  var semesters = '';
  var months = '';
// Save Record to firebase
function saveRecord() {
    console.log('saverecordclicked');
    var date = '';
    var timein = '';
    var timeout = '';
    var hrs = '';
    var name = '';
    var id = '';
    var course = '';
    var scholar = '';
    var year = '';
    var department = '';
    var faculty = '';
    var description = '';

    

     var table = document.getElementById("StudentDTR");

        for (var i = 1, row; row = table.rows[i]; i++) {
            //iterate through rows
            //rows would be accessed using the "row" variable assigned in the for loop
            for (var j = 0, col; col = row.cells[j]; j++) {
              //iterate through columns
              //columns would be accessed using the "col" variable assigned in the for loop
             
              if (j == 0){
          
                date = col.innerText;
              } else if (j == 1) {
               
                timein = col.innerText;
              }  else if (j == 2) {
                timeout = col.innerText;
                
              } else if (j == 3) {
                hrs = col.innerText;
               
              } else if (j == 4) {
                name = col.innerText;
                
              } else if (j == 5) {
                id = col.innerText;
                
              } else if (j == 6) {
                course = col.innerText;
               
              }  else if (j == 7) {
                scholar = col.innerText;
              
              } else if (j == 8) {
                year = col.innerText;
               
              } else if (j == 9) {
                department = col.innerText;
                
              } else if (j == 10) {
                faculty = col.innerText;
               
              } else if (j == 11) {
                description = col.innerText;
              }
            
            }  
            
            RecordsDate(date);
            SaveRecordToFirestore(months, semesters, date,timein, timeout,hrs,name, id,course,scholar,year,department,faculty,description);
        }
               
   
                if (date == '' || timeinout == '' || hrs == '' || name == '' || id == '' || course == '' || scholar == '' || year == '' || department == '' || faculty == '' || description == '') {
                    window.alert('check your fields');
                    console.log('check fields');
                    return;
                } else {
           
                }
    }






// ===> store records in firebase
function RecordsDate(date) {
    var splitDate = date.split('-');
        var year = splitDate[0];
        var month = splitDate[1];
        var day = splitDate[2];
    
      
        switch(month) {
            case '01':
      
                semesters = 'Second Semester';
                months = 'January';
                break;
            case '02':
                console.log('February');
                semesters = 'Second Semester';
                months = 'February';
                break;
            case '03':
           
                semesters = 'Second Semester';
                months = 'March';
                break;   
            case '04':
               
                month = 'April';
                break;
            case '05':
               
                month = 'May';
             
                break;
            case '06':
            
                semesters = 'First Semester';
                months = 'June';     
                break;
            case '07':
     
                semesters = 'First Semester';
                months = 'July';
                break;
            case '08':
               
                semesters = 'First Semester';
                months = 'August';
                break;
            case '09':
       
                semesters = 'First Semester';
                months = 'September';
                break;
            case '10':
          
                semesters = 'First Semester';
                months = 'October';
                break;
            case '11':
        
                semesters = 'Second Semester';
                months = 'November';
                break;
            case '12':
           
                semesters = 'Second Semester';
                months = 'December';
                break;
            default:
                console.log('empty');
        }

}

// ====> in DTRPageCITE.html
function OnLoadDTR(){
    // db = firebase.firestore();
    // var user = firebase.auth().currentUser;
    // window.alert('user id ' + user.uid);
    mo = localStorage.getItem('month');
    sem = localStorage.getItem('semester');
    
    var studInput = document.getElementById('studno');
    studInput.oninput = TextChanged; 
}

// ====> in JuneDTR.html
var studTable = document.getElementById('addedStudTable');
function OnLoadStudentRecord() {
    var studTable = document.getElementById('addedStudTable');
    var to = document.getElementById('toData');
    var userID = localStorage.getItem('userid');
    var myMonth = localStorage.getItem('month');
    var mySemester = localStorage.getItem('semester');

    to.innerHTML = 'Records of ' + myMonth;

   
    db.collection('admin_record').doc(userID).collection('Semester').doc(mySemester).collection(myMonth).get().then(function(snapshots) {
        var content = '';
        if (snapshots.empty) {
            window.alert("No Student Scholar on the list");
            return;
        }
        snapshots.forEach(function(docu) {
          
            var objectData = docu.data();
            var fullname = objectData['Name'];
            var coursee = objectData['Course'];
            var yearr = objectData['Year'];
            var id = objectData['ID'];
            var scholar = objectData['Scholarship'];
            var department = objectData['Department'];
            var faculty = objectData['Faculty'];
            var timein = objectData['Timein'];
            var timeout = objectData['Timeout'];
            var description = objectData['Description'];
            var hours = objectData['Hours'];
            var date = objectData['Date'];
            var row = `<tr>
                            <td>${date}</td>
                            <td>${timein}</td>
                            <td>${timeout}</td>
                            <td>${hours}</td>
                            <td>${fullname}</td>
                            <td>${id}</td>
                            <td>${coursee}</td>
                            <td>${scholar}</td> 
                            <td>${yearr}</td>
                            <td>${department}</td>
                            <td>${faculty}</td> 
                            <td>${description}</td>      
                       </td>`
            studTable.innerHTML += row;
        });
    }); 
}

// ===> from (clickSearch) methods
function retrieveAllStudentRecord(myMonth, mySemester) {
    var studTable = document.getElementById('addedStudTable');
    var userID = localStorage.getItem('userid');
    db.collection('admin_record').doc(userID).collection('Semester').doc(mySemester).collection(myMonth).get().then(function(snapshots) {
  
        var content = '';
        if (snapshots.empty) {
            window.alert("No Student Scholar in the list");
            return;
        }
        snapshots.forEach(function(docu) {
            console.log(docu.data());
            var objectData = docu.data();
            var fullname = objectData['Name'];
            var coursee = objectData['Course'];
            var yearr = objectData['Year'];
            var id = objectData['ID'];
            var scholar = objectData['Scholarship'];
            var department = objectData['Department'];
            var faculty = objectData['Faculty'];
            var timein = objectData['Timein'];
            var timeout = objectData['Timeout'];
            var description = objectData['Description'];
            var hours = objectData['Hours'];
            var date = objectData['Date'];
            var faculty = objectData['Faculty'];
            var row = `<tr>
                    <td>${date}</td>
                    <td>${timein}</td>
                    <td>${timeout}</td>
                    <td>${hours}</td>
                    <td>${fullname}</td>
                    <td>${id}</td>
                    <td>${coursee}</td>
                    <td>${scholar}</td> 
                    <td>${yearr}</td>
                    <td>${department}</td>
                    <td>${faculty}</td> 
                    <td>${description}</td> 
                       </td>`

            studTable.innerHTML += row;
        });
    }); 
}

function retrieveFilteredStudentRecord(mySemester, myMonth, searchid) {
    var studTable = document.getElementById('addedStudTable');
    var userID = localStorage.getItem('userid');
    db.collection('admin_record').doc(userID).collection('Semester').doc(mySemester).collection(myMonth).where('ID', '==' , searchid).get().then((snapshot) => {

        if (snapshot.empty) {
            window.alert('No Student Scholar on the list');
            searchRecord.value = '';
            return;
        }
        snapshot.forEach(function(docu)  {
            var objectData = docu.data();
            
            var fullname = objectData['Name'];
            var coursee = objectData['Course'];
            var yearr = objectData['Year'];
            var id = objectData['ID'];
            var scholar = objectData['Scholarship'];
            var department = objectData['Department'];
            var faculty = objectData['Faculty'];
            var timein = objectData['Timein'];
            var timeout = objectData['Timeout'];
            var description = objectData['Description'];
            var hours = objectData['Hours'];
            var date = objectData['Date'];
            var faculty = objectData['Faculty'];
            
            var row = `<tr>
                    <td>${date}</td>
                    <td>${timein}</td>
                    <td>${timeout}</td>
                    <td>${hours}</td>
                    <td>${fullname}</td>
                    <td>${id}</td>
                    <td>${coursee}</td>
                    <td>${scholar}</td> 
                    <td>${yearr}</td>
                    <td>${department}</td>
                    <td>${faculty}</td> 
                    <td>${description}</td> 
                       </td>`

            studTable.innerHTML += row;
        });
    })
}

// ===> search records

function clickSearch(){
    var searchRecord = document.getElementById('searchStudentRecord');
    var studTable = document.getElementById('addedStudTable');
        var myMonth = localStorage.getItem('month');
        var mySemester = localStorage.getItem('semester');
        var tableRecord = document.getElementById('StudentDTR');
        var row = tableRecord.getElementsByTagName('tbody')[1];
    
       studTable.innerHTML = '';
        
   
   
    if (searchRecord.value == '') {
        retrieveAllStudentRecord(myMonth, mySemester);
        return
    }
    retrieveFilteredStudentRecord(mySemester, myMonth, searchRecord.value);
}

// ===> key value storing data to other page
var to = document.getElementById('toData');
let passedData = 'das';
function month(data) {
    localStorage.setItem('month', data);
    passedData = data;
    console.log(data);  


}

function semester(data) {
    localStorage.setItem('semester', data);

}

// ===> save records from DTRPageCITE.html

function SaveRecordToFirestore(month, semester, date, timein, timeout,hrs, name, id, course, scholar, year, department, faculty, description) {
    // ==> admin record firestore
    var userID = localStorage.getItem('userid');
    
    db.collection('admin_record').doc(userID).collection('Semester').doc(semester).collection(month).doc().set({
        'Date' : date,
        'Timein' : timein,
        'Timeout' : timeout,
        'Hours' : hrs,
        'Name' : name,
        'ID' : id,
        'Course' : course,
        'Scholarship' : scholar,
        'Year' : year,
        'Department' : department,
        'Faculty' : faculty,
        'Description' : description
    })
    .then(function(){
        window.alert('Successfully store the records in ' + semester + ' in the month of ' + month);
    })
    .catch(function(error) {
        console.log('error saving records in admin' + error);
}); 

    // ==> student record firestore
   db.collection('student_record').doc(id).collection('Semester').doc(semester).collection(month).doc().set({
            'Date' : date,
            'Timein' : timein,
            'Timeout' : timeout,
            'Hours' : hrs,
            'Name' : name,
            'ID' : id,
            'Course' : course,
            'Scholarship' : scholar,
            'Year' : year,
            'Department' : department,
            'Faculty' : faculty,
            'Description' : description
        })
        .then(function(){
            
        })
        .catch(function(error) {
            console.log('error saving records student ' + error);
    }); 
}

// ===> DTRPageCITE.html, ... student number field on text change function



// ===> search Student ID autofill fields if exists
var mo = '';
var sem = '';
function TextChanged(text) {
    console.log(text.target.value);
    retrieveStudentRecordToFields(sem ,mo, text.target.value);
}


// searchid atuto fill fields 
function retrieveStudentRecordToFields(mySem, myMonth, myid) {
    var date = document.getElementById("date");

    var totalhrs = document.getElementById("totalhrs");
    var studname = document.getElementById("studname");
    var studno = document.getElementById("studno");
    var course = document.getElementById("course");
    var scholarship = document.getElementById("scholarship");
    var year = document.getElementById("year");
    var assigneddept = document.getElementById("assigneddept");
    var assignedFaculty = document.getElementById("assignedFaculty");
    var dutydescription = document.getElementById("dutydescription");

    db.collection('scholar_list').where('IdNumber', '==' , myid).get().then((snapshot) => {

        if (snapshot.empty) {
            //window.alert('No Student Scholar on the list');
            //searchRecord.value = '';
            console.log('snapshot is empty');
            date.value = '';
      
            totalhrs.value = '';
            studname.value = '';
            
            course.value = '';
            scholarship.value = '';
            year.value = '';
            assigneddept.value = '';
            assignedFaculty.value = '';
            dutydescription.value = '';
            return;
        }
        snapshot.forEach(function(docu)  {
            var objectData = docu.data();
            var fullname = objectData['Name'];
            var coursee = objectData['Course'];
            var yearr = objectData['Year'];
            var id = objectData['IdNumber'];
            var scholarr = objectData['Scholarship'];
            var department = objectData['Department'];
            var faculty = objectData['Faculty'];
       
            studname.value = fullname;
            studno.value = id;
            course.value = coursee;
            scholarship.value = scholarr;
            year.value = yearr;
            assigneddept.value = department;
            assignedFaculty.value = faculty;
          //  dutydescription.value = description;

        });
    });
}

// =====> ManagingAccount.html <======= //


function OnLoadManageAccount() {
   
    var mfirstname = document.getElementById('editFirstNameInput');
    var mmiddlename = document.getElementById('editMiddleNameInput');
    var mlastname = document.getElementById('editLastNameInput');
    var midnumber = document.getElementById('editIdnumber');
    var memail = document.getElementById('editsignup_email');
    var musername = document.getElementById('editusername');
    var mpassword = document.getElementById('editsignup_password');
    var mdepartment = document.getElementById('editdepartment');
    var userID = localStorage.getItem('userid');
    console.log('user id ===> ', userID);
    db.collection('users').doc(userID).get().then(function(data){
        if(data.exists) {
            var objectData = data.data();
            console.log(objectData['firstname']);
            mfirstname.value = objectData['firstname'],
            mmiddlename.value = objectData['middlename'],
            mlastname.value = objectData['lastname'],
            midnumber.value = objectData['idnumber'],
            memail.value = objectData['email'],
            musername.value = objectData['username'],
            mpassword.value = objectData['password'],
            mdepartment.value = objectData['department']
        } else {
            console.log('no such docuemnt');
        }
    })
    .catch(function(err) {
        console.log('error getting docuemnt', err);
    });

    //profile image
    
}


function manageSave() {
    var image = document.getElementById('output');

    var mfirstname = document.getElementById('editFirstNameInput');
    var mmiddlename = document.getElementById('editMiddleNameInput');
    var mlastname = document.getElementById('editLastNameInput');
    var midnumber = document.getElementById('editIdnumber');
    var memail = document.getElementById('editsignup_email');
    var musername = document.getElementById('editusername');
    var mpassword = document.getElementById('editsignup_password');
    var mdepartment = document.getElementById('editdepartment');
   
    var userID = localStorage.getItem('userid');
    db.collection('users').doc(userID).update({
        'firstname' : mfirstname.value,
        'middlename' : mmiddlename.value,
        'lastname' : mlastname.value,
        'idnumber' : midnumber.value,
        'email' : memail.value,
        'username' : musername.value,
        'password' : mpassword.value,
        'department' : mdepartment.value
    }).then(function(){
        window.alert('successfully updated account');
    }).catch(function(err) {
        window.alert('Error updating account');
    });
}

// handles image file
var file;
var urlImage;
var fileImage = document.getElementById('file');
fileImage.addEventListener('change', function(event) {
    var image = document.getElementById('output');
    urlImage = URL.createObjectURL(event.target.files[0]);
 
    image.src = urlImage;
    file = event.target.files[0];    
})


// send to super admin

function sendToSuperAdmin(){
    var mySemester = localStorage.getItem('semester');
    
    if (mySemester == 'First Semester') {
        sendFirstSemester();
    } else if (mySemester == 'Second Semester'){
        sendSecondSemester();
    } else {

    }
}
// FIRST SEMESTER METHOD
function sendFirstSemester(){
    var userID = localStorage.getItem('userid');
    var june, july, aug, sept, oct;
    june = july = aug = sept = oct = 0;
    // month of june
    db.collection('admin_record').doc(userID).collection('Semester').doc('First Semester').collection('June').get().then(function(snapshots){
        if (snapshots.empty) {

            june = 0;
           
            return
        }
        june = 1;
      
        snapshots.forEach(function(docu){
            var objectData = docu.data();
            var fullname = objectData['Name'];
            var coursee = objectData['Course'];
            var yearr = objectData['Year'];
            var id = objectData['ID'];
            var scholar = objectData['Scholarship'];
            var department = objectData['Department'];
            var faculty = objectData['Faculty'];
            var timein = objectData['Timein'];
            var timeout = objectData['Timeout'];
            var description = objectData['Description'];
            var hours = objectData['Hours'];
            var date = objectData['Date'];
            db.collection('superadmin_record').doc('kVprJm7Q0OE68gupVYlT').collection('Semester').doc('First Semester').collection('June').doc().set({
                'Date' : date,
                'Timein' : timein,
                'Timeout' : timeout,
                'Hours' : hours,
                'Name' : fullname,
                'ID' : id,
                'Course' : coursee,
                'Scholarship' : scholar,
                'Year' : yearr,
                'Department' : department,
                'Faculty' : faculty,
                'Description' : description
            })
            .then(function(){
                console.log('successfully send to super admin');
                

            })
            .catch(function(err){
                console.log('error saving to super admin ' , err);
            });
        })
    });
    // month of july
    db.collection('admin_record').doc(userID).collection('Semester').doc('First Semester').collection('July').get().then(function(snapshots){
        if (snapshots.empty) {

            july = 0;
            return;
        }
        july = 1;
        snapshots.forEach(function(docu){
            var objectData = docu.data();
            var fullname = objectData['Name'];
            var coursee = objectData['Course'];
            var yearr = objectData['Year'];
            var id = objectData['ID'];
            var scholar = objectData['Scholarship'];
            var department = objectData['Department'];
            var faculty = objectData['Faculty'];
            var timein = objectData['Timein'];
            var timeout = objectData['Timeout'];
            var description = objectData['Description'];
            var hours = objectData['Hours'];
            var date = objectData['Date'];
            db.collection('superadmin_record').doc('kVprJm7Q0OE68gupVYlT').collection('Semester').doc('First Semester').collection('July').doc().set({
                'Date' : date,
                'Timein' : timein,
                'Timeout' : timeout,
                'Hours' : hours,
                'Name' : fullname,
                'ID' : id,
                'Course' : coursee,
                'Scholarship' : scholar,
                'Year' : yearr,
                'Department' : department,
                'Faculty' : faculty,
                'Description' : description
            })
            .then(function(){
                console.log('successfully send to super admin');
                
            })
            .catch(function(err){
                console.log('error saving to super admin ' , err);
            });
        })
    });
    // month of august
    db.collection('admin_record').doc(userID).collection('Semester').doc('First Semester').collection('August').get().then(function(snapshots){
        if (snapshots.empty) {

            aug = 0;
            return;
        }
        aug = 1;
        snapshots.forEach(function(docu){
            var objectData = docu.data();
            var fullname = objectData['Name'];
            var coursee = objectData['Course'];
            var yearr = objectData['Year'];
            var id = objectData['ID'];
            var scholar = objectData['Scholarship'];
            var department = objectData['Department'];
            var faculty = objectData['Faculty'];
            var timein = objectData['Timein'];
            var timeout = objectData['Timeout'];
            var description = objectData['Description'];
            var hours = objectData['Hours'];
            var date = objectData['Date'];
            db.collection('superadmin_record').doc('kVprJm7Q0OE68gupVYlT').collection('Semester').doc('First Semester').collection('August').doc().set({
                'Date' : date,
                'Timein' : timein,
                'Timeout' : timeout,
                'Hours' : hours,
                'Name' : fullname,
                'ID' : id,
                'Course' : coursee,
                'Scholarship' : scholar,
                'Year' : yearr,
                'Department' : department,
                'Faculty' : faculty,
                'Description' : description
            })
            .then(function(){
                console.log('successfully send to super admin');
                
            })
            .catch(function(err){
                console.log('error saving to super admin ' , err);
            });
        })
    });
    // month of september
    db.collection('admin_record').doc(userID).collection('Semester').doc('First Semester').collection('September').get().then(function(snapshots){
        if (snapshots.empty) {

            sept = 0;
            return;
        }
        sept = 1;
        snapshots.forEach(function(docu){
            var objectData = docu.data();
            var fullname = objectData['Name'];
            var coursee = objectData['Course'];
            var yearr = objectData['Year'];
            var id = objectData['ID'];
            var scholar = objectData['Scholarship'];
            var department = objectData['Department'];
            var faculty = objectData['Faculty'];
            var timein = objectData['Timein'];
            var timeout = objectData['Timeout'];
            var description = objectData['Description'];
            var hours = objectData['Hours'];
            var date = objectData['Date'];
            db.collection('superadmin_record').doc('kVprJm7Q0OE68gupVYlT').collection('Semester').doc('First Semester').collection('September').doc().set({
                'Date' : date,
                'Timein' : timein,
                'Timeout' : timeout,
                'Hours' : hours,
                'Name' : fullname,
                'ID' : id,
                'Course' : coursee,
                'Scholarship' : scholar,
                'Year' : yearr,
                'Department' : department,
                'Faculty' : faculty,
                'Description' : description
            })
            .then(function(){
                
                
            })
            .catch(function(err){
                console.log('error saving to super admin ' , err);
            });
        })
    })
    .then(function(){
        
    });
    // month of october
    db.collection('admin_record').doc(userID).collection('Semester').doc('First Semester').collection('October').get().then(function(snapshots){
        if (snapshots.empty) {
            
         oct = 0;
         if(june == 0 && july == 0 && aug == 0 && sept == 0 && oct == 0) {
            window.alert('No records to send');
            } else {
                window.alert('successfully send the records');
          }
            return;
        }
        oct = 1;
        if(june == 0 && july == 0 && aug == 0 && sept == 0 && oct == 0) {
            window.alert('No records to send');
            } else {
                window.alert('successfully send the records');
            }
        snapshots.forEach(function(docu){
            var objectData = docu.data();
            var fullname = objectData['Name'];
            var coursee = objectData['Course'];
            var yearr = objectData['Year'];
            var id = objectData['ID'];
            var scholar = objectData['Scholarship'];
            var department = objectData['Department'];
            var faculty = objectData['Faculty'];
            var timein = objectData['Timein'];
            var timeout = objectData['Timeout'];
            var description = objectData['Description'];
            var hours = objectData['Hours'];
            var date = objectData['Date'];
            db.collection('superadmin_record').doc('kVprJm7Q0OE68gupVYlT').collection('Semester').doc('First Semester').collection('October').doc().set({
                'Date' : date,
                'Timein' : timein,
                'Timeout' : timeout,
                'Hours' : hours,
                'Name' : fullname,
                'ID' : id,
                'Course' : coursee,
                'Scholarship' : scholar,
                'Year' : yearr,
                'Department' : department,
                'Faculty' : faculty,
                'Description' : description
            })
            .then(function(){
                console.log('successfully send the records');
                
            })
            .catch(function(err){
                console.log('error saving to super admin ' , err);
            });
        })
    });
    
}
// SECOND SEMESTER METHOD
function sendSecondSemester(){
    var nov, dec, jan, feb, mar;
    nov = dec = jan = feb = mar = 0;
    var userID = localStorage.getItem('userid');
    // month of november
    db.collection('admin_record').doc(userID).collection('Semester').doc('Second Semester').collection('November').get().then(function(snapshots){
        if (snapshots.empty) {
            nov = 0;
            
            console.log('empty november');
        } else {
            nov = 1;
        snapshots.forEach(function(docu){
            var objectData = docu.data();
            var fullname = objectData['Name'];
            var coursee = objectData['Course'];
            var yearr = objectData['Year'];
            var id = objectData['ID'];
            var scholar = objectData['Scholarship'];
            var department = objectData['Department'];
            var faculty = objectData['Faculty'];
            var timein = objectData['Timein'];
            var timeout = objectData['Timeout'];
            var description = objectData['Description'];
            var hours = objectData['Hours'];
            var date = objectData['Date'];
            db.collection('superadmin_record').doc('kVprJm7Q0OE68gupVYlT').collection('Semester').doc('Second Semester').collection('November').doc().set({
                'Date' : date,
                'Timein' : timein,
                'Timeout' : timeout,
                'Hours' : hours,
                'Name' : fullname,
                'ID' : id,
                'Course' : coursee,
                'Scholarship' : scholar,
                'Year' : yearr,
                'Department' : department,
                'Faculty' : faculty,
                'Description' : description
            })
            .then(function(){
                console.log('successfully send to super admin');
                
            })
            .catch(function(err){
                console.log('error saving to super admin ' , err);
            });
            })
        }
    });
    // month of december
    db.collection('admin_record').doc(userID).collection('Semester').doc('Second Semester').collection('December').get().then(function(snapshots){
        if (snapshots.empty) {
            dec = 0;
            console.log('empty december');
        } else {
            dec = 1;
        snapshots.forEach(function(docu){
            var objectData = docu.data();
            var fullname = objectData['Name'];
            var coursee = objectData['Course'];
            var yearr = objectData['Year'];
            var id = objectData['ID'];
            var scholar = objectData['Scholarship'];
            var department = objectData['Department'];
            var faculty = objectData['Faculty'];
            var timein = objectData['Timein'];
            var timeout = objectData['Timeout'];
            var description = objectData['Description'];
            var hours = objectData['Hours'];
            var date = objectData['Date'];
            db.collection('superadmin_record').doc('kVprJm7Q0OE68gupVYlT').collection('Semester').doc('Second Semester').collection('December').doc().set({
                'Date' : date,
                'Timein' : timein,
                'Timeout' : timeout,
                'Hours' : hours,
                'Name' : fullname,
                'ID' : id,
                'Course' : coursee,
                'Scholarship' : scholar,
                'Year' : yearr,
                'Department' : department,
                'Faculty' : faculty,
                'Description' : description
            })
            .then(function(){
                console.log('successfully send to super admin');
                
            })
            .catch(function(err){
                console.log('error saving to super admin ' , err);
            });
        })
        }
    });
    // month of January
    db.collection('admin_record').doc(userID).collection('Semester').doc('Second Semester').collection('January').get().then(function(snapshots){
        if (snapshots.empty) {
            jaan = 0;
            console.log('empty november');
        } else {
            jan = 1;
        snapshots.forEach(function(docu){
            var objectData = docu.data();
            var fullname = objectData['Name'];
            var coursee = objectData['Course'];
            var yearr = objectData['Year'];
            var id = objectData['ID'];
            var scholar = objectData['Scholarship'];
            var department = objectData['Department'];
            var faculty = objectData['Faculty'];
            var timein = objectData['Timein'];
            var timeout = objectData['Timeout'];
            var description = objectData['Description'];
            var hours = objectData['Hours'];
            var date = objectData['Date'];
            db.collection('superadmin_record').doc('kVprJm7Q0OE68gupVYlT').collection('Semester').doc('Second Semester').collection('January').doc().set({
                'Date' : date,
                'Timein' : timein,
                'Timeout' : timeout,
                'Hours' : hours,
                'Name' : fullname,
                'ID' : id,
                'Course' : coursee,
                'Scholarship' : scholar,
                'Year' : yearr,
                'Department' : department,
                'Faculty' : faculty,
                'Description' : description
            })
            .then(function(){
                console.log('successfully send to super admin');
              
            })
            .catch(function(err){
                console.log('error saving to super admin ' , err);
            });
        })
        }
    });
    // month of february
    db.collection('admin_record').doc(userID).collection('Semester').doc('Second Semester').collection('February').get().then(function(snapshots){
        if (snapshots.empty) {
            console.log('empty november');
            feb = 0;
        } else {
            feb = 1;
        snapshots.forEach(function(docu){
            var objectData = docu.data();
            var fullname = objectData['Name'];
            var coursee = objectData['Course'];
            var yearr = objectData['Year'];
            var id = objectData['ID'];
            var scholar = objectData['Scholarship'];
            var department = objectData['Department'];
            var faculty = objectData['Faculty'];
            var timein = objectData['Timein'];
            var timeout = objectData['Timeout'];
            var description = objectData['Description'];
            var hours = objectData['Hours'];
            var date = objectData['Date'];
            db.collection('superadmin_record').doc('kVprJm7Q0OE68gupVYlT').collection('Semester').doc('Second Semester').collection('February').doc().set({
                'Date' : date,
                'Timein' : timein,
                'Timeout' : timeout,
                'Hours' : hours,
                'Name' : fullname,
                'ID' : id,
                'Course' : coursee,
                'Scholarship' : scholar,
                'Year' : yearr,
                'Department' : department,
                'Faculty' : faculty,
                'Description' : description
            })
            .then(function(){
                console.log('successfully send to super admin');
                
            })
            .catch(function(err){
                console.log('error saving to super admin ' , err);
            });
        })
        }
    });
    // month of March
    db.collection('admin_record').doc(userID).collection('Semester').doc('Second Semester').collection('March').get().then(function(snapshots){
        if (snapshots.empty) {
            mar = 0;
            if (nov == 0 && dec == 0 && jan == 0 && feb == 0 && mar == 0) {
                window.alert('No records to send');
       
               
            } else {
                window.alert('successfully send the records');
            }
 
        } else {
            if (nov == 0 && dec == 0 && jan == 0 && feb == 0 && mar == 0) {
                window.alert('No records to send');
        
                
             } else {
                window.alert('successfully send the records');
             }
        snapshots.forEach(function(docu){
            var objectData = docu.data();
            var fullname = objectData['Name'];
            var coursee = objectData['Course'];
            var yearr = objectData['Year'];
            var id = objectData['ID'];
            var scholar = objectData['Scholarship'];
            var department = objectData['Department'];
            var faculty = objectData['Faculty'];
            var timein = objectData['Timein'];
            var timeout = objectData['Timeout'];
            var description = objectData['Description'];
            var hours = objectData['Hours'];
            var date = objectData['Date'];
            db.collection('superadmin_record').doc('kVprJm7Q0OE68gupVYlT').collection('Semester').doc('Second Semester').collection('March').doc().set({
                'Date' : date,
                'Timein' : timein,
                'Timeout' : timeout,
                'Hours' : hours,
                'Name' : fullname,
                'ID' : id,
                'Course' : coursee,
                'Scholarship' : scholar,
                'Year' : yearr,
                'Department' : department,
                'Faculty' : faculty,
                'Description' : description
            })
            .then(function(){
                
                console.log('successfully send to super admin');
                mar = 1;
                
            })
            .catch(function(err){
                console.log('error saving to super admin ' , err);
            });
        })
        }
    })
    .then(function(){
        console.log()
        
       
    });
   
}


// ======> END ADMIN <======== //

// ======> SUPER ADMIN <======== //
        function addOnTheList() {
            var search = document.getElementById('search');
            var myname =  document.getElementById('name');
            var sched =   document.getElementById('sched');
            var idnum =   document.getElementById('idnum');
            var course =  document.getElementById('course');
            var scholar = document.getElementById('scholar');
            var year =    document.getElementById('year');
            var department = document.getElementById('department');
            var faculty = document.getElementById('faculty');
            db.collection('scholar_list').doc(idnum.value).set({
                Name: myname.value,
                Schedule: sched.value,
                IdNumber: idnum.value,
                Course: course.value,
                Scholarship: scholar.value,
                Year: year.value,
                Department: department.value,
                Faculty: faculty.value
            })
            .then(function(){
                window.alert("New scholar succesfully Added!");
                myname.value = '',
                sched.value = '',
                idnum.value = '',
                course.value = '',
                scholar.value = '',
                year.value = '',
                department.value = '',
                faculty.value = ''
            })
            .catch(function(error){
                window.alert("Error writing document: " , error);
            });
            
        }
        function OnLoadAddedStudent() {
  
            var studTable = document.getElementById('addedStudTable');
            db.collection('scholar_list').get().then(function(snapshots) {
                var content = '';
                if (snapshots.empty) {
                    window.alert("No Scholar on the list");
                    return;
                }
                snapshots.forEach(function(docu) {
                    console.log(docu.data());
                    var objectData = docu.data();
                    var fullname = objectData['Name'];
                    var coursee = objectData['Course'];
                    var contact = objectData['Contact']; 
                    var yearr = objectData['Year'];
                    var id = objectData['IdNumber'];
                    var scholar = objectData['Scholarship'];
                    var department = objectData['Department'];
                    var faculty = objectData['Faculty'];
                    var row = `<tr>
                                    <td>${fullname}</td>
                                    <td>${id}</td>
                                    <td>${coursee}</td>
                                    <td>${scholar}</td>
                                    <td>${yearr}</td>
                                    <td>${department}</td>
                                    <td>${faculty}</td>
                                    
                               </td>`
        
                    studTable.innerHTML += row;
                });
            }); 
        }

        // search student id
        function searchID() {
            var search = document.getElementById('search');
            var myname =  document.getElementById('name');
            var sched =   document.getElementById('sched');
            var idnum =   document.getElementById('idnum');
            var course =  document.getElementById('course');
            var scholar = document.getElementById('scholar');
            var year =    document.getElementById('year');
            var department = document.getElementById('department');
            var faculty = document.getElementById('faculty');
            console.log("student id : " + search.value);
           db.collection('student').where('StudentID', '==', search.value).get().then((snapshot) => {
               if (snapshot.empty) {
                   window.alert("Invalid Student ID")
                   return;
               }
               snapshot.forEach(doc => {
                   //    window.alert(doc.data());
                       console.log(doc.data())
                       var objectData = doc.data();
                       var email = objectData['email'];
        
                       var fullname = objectData['FullName'];
                       var coursee = objectData['Course'];
                       var contact = objectData['Contact'];
                       var password = objectData['Password'];
                       var yearr = objectData['YearLvl'];
                       var email = objectData['Email'];
                       var id = objectData['StudentID'];
                      // var facultyy = objectData['username'];
        
                       myname.value = fullname;
                       idnum.value = id;
                       course.value = coursee;      
                       year.value = yearr;
                     
               })
           });
        }
        
    function superad_sem(sem) {
        
        localStorage.setItem('superad_semester', sem)
    }
    function superad_month(month) {
 
        localStorage.setItem('superad_month', month);
    }

    function OnLoadSuperAdminRecord(){
        var studTable = document.getElementById('addedRecordTable');
        var to = document.getElementById('toData');

        var myMonth = localStorage.getItem('superad_month');
        var mySemester = localStorage.getItem('superad_semester');
    
        to.innerHTML = 'Records of ' + myMonth;
    
       
        db.collection('superadmin_record').doc('kVprJm7Q0OE68gupVYlT').collection('Semester').doc(mySemester).collection(myMonth).get().then(function(snapshots) {
            var content = '';
            if (snapshots.empty) {
                window.alert("No Student Scholar on the list");
                return;
            }
            snapshots.forEach(function(docu) {
                console.log(docu.data());
                var objectData = docu.data();
                var fullname = objectData['Name'];
                var coursee = objectData['Course'];
                var yearr = objectData['Year'];
                var id = objectData['ID'];
                var scholar = objectData['Scholarship'];
                var department = objectData['Department'];
                var faculty = objectData['Faculty'];
                var timein = objectData['Timein'];
                var timeout = objectData['Timeout'];
                var description = objectData['Description'];
                var hours = objectData['Hours'];
                var date = objectData['Date'];
                var row = `<tr>
                                <td>${date}</td>
                                <td>${timein}</td>
                                <td>${timeout}</td>
                                <td>${hours}</td>
                                <td>${fullname}</td>
                                <td>${id}</td>
                                <td>${coursee}</td>
                                <td>${scholar}</td> 
                                <td>${yearr}</td>
                                <td>${department}</td>
                                <td>${faculty}</td> 
                                <td>${description}</td>      
                           </td>`
                studTable.innerHTML += row;
            });
        }); 
    }

    function superad_clickSearch(){
        var super_search = document.getElementById('searchSuperAdminRecord');
        var myMonth = localStorage.getItem('superad_month');
        var mySemester = localStorage.getItem('superad_semester');
        var superRecordTable = document.getElementById('addedRecordTable');
        superRecordTable.innerHTML = '';
        if (super_search.value == '') {
            retrieveAllSuperAdminRecord(myMonth, mySemester);
            return
        } 
        retrieveFilteredSuperAdRecord(myMonth, mySemester, super_search.value);
    }
    function retrieveAllSuperAdminRecord(myMonth, mySemester){
        var superRecordTable = document.getElementById('addedRecordTable');
        db.collection('superadmin_record').doc('kVprJm7Q0OE68gupVYlT').collection('Semester').doc(mySemester).collection(myMonth).get().then(function(snapshots) {
            var content = '';
            if (snapshots.empty) {
                window.alert("No Student Scholar in the list");
                return;
            }
            snapshots.forEach(function(docu) {
                console.log(docu.data());
                var objectData = docu.data();
                var fullname = objectData['Name'];
                var coursee = objectData['Course'];
                var yearr = objectData['Year'];
                var id = objectData['ID'];
                var scholar = objectData['Scholarship'];
                var department = objectData['Department'];
                var faculty = objectData['Faculty'];
                var timein = objectData['Timein'];
                var timeout = objectData['Timeout'];
                var description = objectData['Description'];
                var hours = objectData['Hours'];
                var date = objectData['Date'];
                var row = `<tr>
                                <td>${date}</td>
                                <td>${timein}</td>
                                <td>${timeout}</td>
                                <td>${hours}</td>
                                <td>${fullname}</td>
                                <td>${id}</td>
                                <td>${coursee}</td>
                                <td>${scholar}</td> 
                                <td>${yearr}</td>
                                <td>${department}</td>
                                <td>${faculty}</td> 
                                <td>${description}</td>      
                           </td>`
                  superRecordTable.innerHTML += row;
            });
        }); 
    }

    function retrieveFilteredSuperAdRecord(myMonth, mySemester, searchid){
        var superRecordTable = document.getElementById('addedRecordTable');
        db.collection('superadmin_record').doc('kVprJm7Q0OE68gupVYlT').collection('Semester').doc(mySemester).collection(myMonth).where('ID', '==' , searchid).get().then((snapshot) => {

            if (snapshot.empty) {
                window.alert('No Student Scholar on the list');
                //searchRecord.value = '';
                return;
            }
            snapshot.forEach(function(docu)  {
                var objectData = docu.data();
                
                var fullname = objectData['Name'];
                var coursee = objectData['Course'];
                var yearr = objectData['Year'];
                var id = objectData['ID'];
                var scholar = objectData['Scholarship'];
                var department = objectData['Department'];
                var faculty = objectData['Faculty'];
                var timein = objectData['Timein'];
                var timeout = objectData['Timeout'];
                var description = objectData['Description'];
                var hours = objectData['Hours'];
                var date = objectData['Date'];
                var faculty = objectData['Faculty'];
                
                var row = `<tr>
                        <td>${date}</td>
                        <td>${timein}</td>
                        <td>${timeout}</td>
                        <td>${hours}</td>
                        <td>${fullname}</td>
                        <td>${id}</td>
                        <td>${coursee}</td>
                        <td>${scholar}</td> 
                        <td>${yearr}</td>
                        <td>${department}</td>
                        <td>${faculty}</td> 
                        <td>${description}</td> 
                           </td>`
    
                 superRecordTable.innerHTML += row;
            });
        })
    }
// ======> END SUPER ADMIN <======== //




//    console.log('Month => ' + month);
//    console.log('Semester => ' + semester);
//    console.log('date => ' + date);
//    console.log('timeinout => ' + timeinout);
//    console.log('hrs => ' + hrs);
//    console.log('name => ' + name);
//    console.log('id => ' + id);
//    console.log('course => ' + course);
//    console.log('scholar => ' + scholar);
//    console.log('year => ' + year);
//    console.log('department => ' + department);
//    console.log('faculty => ' + faculty);
//    console.log('Description => ' + description);


// ====> THIS IS IN SUPER ADMIN <=======







