import { collection,getDocs } from 'firebase/firestore';
import './Home.css'
import React,{useState,useRef,useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { firestore } from '../../Firebase';
import { Context } from '../../App';

export function Home(){
    let contextData=useContext(Context);
    let [CreateQuestionaire,GoToCreateQuestionaire]=useState(false);
    let [questionaire,setQuestionaire]=useState(false);
    if(CreateQuestionaire){
        return <Navigate to="/CreateQuestionaire" replace={true}/>;
    }
    if(questionaire!==false){
        contextData.rubricToUse.current=questionaire;
        return <Navigate to="/RubricQuestionaire" replace={true} />;
    }
    async function handleSubmit(e){
        e.preventDefault();
        let form= new FormData(e.currentTarget);
        let data =Object.fromEntries(form);
        let documents=await getDocs(collection(firestore,'userData'));
        documents.docs.forEach(doc=>{
            let docData=doc.data();
            for (let dataProperties of docData.rubric){
                if(dataProperties.password===data.password){
                    setQuestionaire(dataProperties);
                }
            }
        });
        //Enter Firebase Stuff Here
    }
    return (
        <div id="homePage">
        <div id="spacer"></div>
        <h1 id="title">Test Your Project Ideas!</h1>
        <h3 className='sub'>Create Your Own Hackathon Rubric</h3>
        <button className="homeButtons"onClick={()=>{GoToCreateQuestionaire(true)}}>Create Questionaire</button>
        <h3 className='sub'>Go To Questionare</h3>
        <form onSubmit={handleSubmit}>
        <input name="password"id="password" type="text" placeholder="Enter Questionaire Password"/>
        <label htmlFor='password' id="passwordLabel">Enter Questionaire Password</label>
        <button className="homeButtons"type="submit">Go To Questionaire</button>
        </form>
        </div>
    );
}