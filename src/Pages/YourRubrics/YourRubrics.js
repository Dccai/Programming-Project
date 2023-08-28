import React,{useState,useContext, useEffect} from 'react';
import { Context } from '../../App';
import { getDoc, collection,data,doc,getDocs} from 'firebase/firestore';
import { Navigate } from 'react-router-dom';
import { firestore } from '../../Firebase';
import './YourRubrics.css';
export function YourRubrics(){
    let contextData=useContext(Context);
    let ref=collection(firestore,'userData');
    let [rubrics,setRubrics]=useState(false);
    let [editRubric,goEditRubric]=useState(false);
    useEffect(()=>{
        async function getRubrics(){
        let document=await getDoc(doc(ref,contextData.docId));
        let docData=document.data();
        setRubrics(docData.rubric);
        }
        getRubrics();
    },[]);
    async function handleEdit(rubricPassword){
        let documents=await getDocs(collection(firestore,'userData'));
        documents.docs.forEach(doc=>{
            let docData=doc.data();
            for (let dataProperties in docData.rubric){
                if(docData.rubric[dataProperties].password===rubricPassword){
                    contextData.rubricToEdit.current=docData.rubric[dataProperties];
                    contextData.rubricToEditKey.current=dataProperties;
                }
            }
        });
        goEditRubric(true);
    }
    if(editRubric){
        return <Navigate to="/EditRubric" replace={true}/>;
    }
    return (
        <div id='rubricDisplay'>
            {rubrics!==false?rubrics.map((a,h)=>{
            return (
            <div className='rubricShower' key={h} onClick={()=>{handleEdit(a.password)}}>
                <h3>{a.name}</h3>
                <p>{a.description}</p>
                <span>{a.password}</span>
            </div>
            );
            }):<h1>Add Your Rubrics</h1>}
        </div>
    )
}