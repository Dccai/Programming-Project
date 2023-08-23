import React,{useState,useContext, useEffect} from 'react';
import { Context } from '../../App';
import { getDoc, collection,data,doc } from 'firebase/firestore';
import { firestore } from '../../Firebase';
export function YourRubrics(){
    let contextData=useContext(Context);
    let ref=collection(firestore,'userData');
    let [rubrics,setRubrics]=useState(false);
    
    useEffect(()=>{
        async function getRubrics(){
        let document=await getDoc(doc(ref,contextData.docId));
        let docData=document.data();
        console.log(docData.rubric)
        setRubrics(docData.rubric);
        }
        getRubrics();
    },[]);
    return (
        <div>
            {rubrics!==false?rubrics.map((a,h)=>{
            return (
            <h1>Rubric To Add</h1>
            );
            }):<h1>Add Your Rubrics</h1>}
        </div>
    )
}