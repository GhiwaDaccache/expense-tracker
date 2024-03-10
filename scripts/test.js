const loginBtn = document.getElementById('login-btn')
const loginEmail = document.getElementById('login-email')
const loginPassword = document.getElementById('login-password')
const signupError = document.getElementById('login-err')
const loginError = document.getElementById('signup-err')


// let username=''
// let email=''
// let password=''
// let validationError=false;


// const resetInputs=()=>{
//     username=''
//     email=''
//     password=''
// }


const validateForm = (type) =>{
    if(type=='signup')
    
        if(email=="" ||password==""|| username=="" ){
            signupError.innerText='Please fill all fields above';
            // validationError=true;
            
        }
        // else{
        //     validationError=false
        // }

    if(type=='login')
        if(email==="" || password===""){
            loginError.innerText='Oops! please fill everything';
            validationError=true;
        }
        // else{
        //     validationError=false
        // }
}