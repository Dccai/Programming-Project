import React,{useState} from "react";
import { firestore,auth } from "../../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";
export function Login(){
    let [back,goBack]=useState(false);
    let [error,tryAgain]=useState(false);
    let [questionaire,goToQuestionaire]=useState(false);
    function onLogin(e){
        e.preventDefault();
        let form=new FormData(e.currentTarget);
        let data=Object.fromEntries(form);
        signInWithEmailAndPassword(auth,data.loginemail,data.loginpassword).then(a=>goToQuestionaire(true)).catch(e=>tryAgain(true))
    }
    if(back){
        return <Navigate to='/' replace={true}/>;
    }
    else if(questionaire){
        return <Navigate to="/Home" replace={true}/>;
    }
    if(!error){
    return (
        <div id="loginPage">
            <form onSubmit={onLogin}>
            <label htmlFor="loginemail">User Email</label>
            <input name="loginemail" id="loginemail"className="Loginform" type="text" required/>
            <label htmlFor="loginpassword">User Password</label>
            <input name="loginpassword" id="loginpassword"className="Loginform" type="text" required/>
            <button type="submit">Login</button>
            </form>
            <button onClick={()=>{goBack(true)}}>Go Back</button>
        </div>
    );
    }
    else{
        return (
            <div id="loginError">
                <h1>Invalid Email Or Password</h1>
                <button onClick={()=>tryAgain(false)}>Try Again</button>
            </div>
        );
    }
    
}