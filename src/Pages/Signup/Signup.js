import React,{useState} from "react";
import { firestore,auth } from "../../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {addDoc,collection} from "@firebase/firestore";
export function Signup(){
    let reference=collection(firestore,"UserData");
    let [error,tryAgain]=useState(false);
    function signup(e){
        e.preventDefault();
        let form=new FormData(e.currentTarget);
        let data=Object.fromEntries(form);
        createUserWithEmailAndPassword(auth, data.signUpEmail,data.signUpPassword).then((user)=>{addDoc(reference,{id:user.user.uid,rubric:[]});}).catch(error=>{console.log(error);tryAgain(true);});
    }
    if (!error){
        return (
            <div id="signUp">
            <form onSubmit={signup}>
                <label htmlFor="signUpEmail">Email</label>
                <input name="signUpEmail" id="signUpEmail" type="text" required/>
                <label htmlFor="signUpPassword">Password</label>
                <input name="signUpPassword" id="signUpPassword" type="text" required/>
                <button type="submit">Submit</button>
            </form>
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