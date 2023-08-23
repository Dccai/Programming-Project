import React,{useState,useContext} from "react";
import { firestore,auth } from "../../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {addDoc,collection,updateDoc,doc} from "@firebase/firestore";
import { Context } from "../../App";
import { Navigate } from "react-router-dom";
export function Signup(){
    let contextData=useContext(Context);
    let reference=collection(firestore,"userData");
    let [error,tryAgain]=useState(false);
    let [back,goBack]=useState(false);
    let [questionaire,goToQuestionaire]=useState(false);
    function signup(e){
        e.preventDefault();
        let form=new FormData(e.currentTarget);
        let data=Object.fromEntries(form);
    createUserWithEmailAndPassword(auth, data.signUpEmail,data.signUpPassword).then((user)=>{addDoc(reference,{id:user.user.uid,rubric:[]}).then(dc=>{updateDoc(doc(reference,dc.id),{docId:dc.id})});})
        .then(a=>{goToQuestionaire(true);}).catch(error=>{console.log(error);tryAgain(true);});
    }
    if(back){
        return <Navigate to="/" replace={true}/>;
    }
    if(questionaire){
        return <Navigate to="/Home" replace={true}/>;
    }
    if (!error){
        return (
            <div id="signUpPage">
            <form onSubmit={signup}>
                <label htmlFor="signUpEmail">Email</label>
                <input name="signUpEmail" id="signUpEmail" type="text" required/>
                <label htmlFor="signUpPassword">Password</label>
                <input name="signUpPassword" id="signUpPassword" type="text" required/>
                <button type="submit">Submit</button>
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