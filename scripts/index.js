const loginBox=document.getElementById('login-box')
const signupBpx=document.getElementById('signup-box')

const loginEmail=document.getElementById('login-email')
const loginPassword=document.getElementById('login-password')
const loginBtn=document.getElementById('login-btn')

const signupName=document.getElementById('signup-name')
const signupEmail=document.getElementById('signup-email')
const signupPassword=document.getElementById('signup-password')
const signupBtn=document.getElementById('signup-btn')

const signupSwitch=document.getElementById('signup-switch')
const loginSwitch=document.getElementById('login-switch')

const signupError=document.getElementById('signup-err')
const loginError=document.getElementById('login-err')

let username=''
let email=''
let password=''
let validationError=false;



const resetInputs = () =>{
    username=''
    email=''
    password=''
}

const handleLogin = () =>{

    validateForm('login');
    let isEqual=false
    let user={}
     if(!validationError)
        for(let i=0;i<users.length;i++){
            if(users[i].email.toLowerCase()===email.toLowerCase() && users[i].password===password) {
                
                
                isEqual=true;
                user=users[i]
                break;
             
            }
            else{
                isEqual=false
            }
        }
        if(isEqual){
            window.localStorage.setItem('session',JSON.stringify(user))
            window.location.assign('/')
        }
        else
            loginError.innerText='wrong email or password'
    }   

    const handleSignUp=()=>{
        validateForm('signup');


        if(!validationError)
         for(let i = 0 ; i<users.length;i++){
            if(users[i].email.toLowerCase()===email.toLowerCase()) {
                
                    signupError.innerText='email already in use';
                    break;
            }
            else{
                users.push({name:username,email:email,password:password,favourites:[]});
                window.localStorage.setItem('users',JSON.stringify(users))
                handleLogin()
                break;
            }
        }
           
           
    }


loginEmail.addEventListener('change',(e)=>email=e.target.value)
loginPassword.addEventListener('change',(e)=>password=e.target.value)

signupName.addEventListener('change',(e)=>username=e.target.value)
signupEmail.addEventListener('change',(e)=>email=e.target.value)
signupPassword.addEventListener('change',(e)=>password=e.target.value)

