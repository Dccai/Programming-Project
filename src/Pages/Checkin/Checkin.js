import React,{useState} from "react";
import { Navigate } from "react-router-dom";
import "./Checkin.css";
export function Checkin(){
    let [signUp,goSignUp]=useState(false);
    let [login,goLogin]=useState(false);
    if(signUp){
        
        return <Navigate to="/Signup" replace={true}/>;
        
    }
    if(login){
        return <Navigate to="/Login" replace={true}/>;
    }
    return (
        <div id="Checkin">
            <h1>Sign Up!</h1>
            <button id="signUp"onClick={()=>goSignUp(true)}>Sign Up</button>
            <h1>Login!</h1>
            <button id="login" onClick={()=>goLogin(true)}>Login</button>
            
        </div>
    );
}