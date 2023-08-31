import React,{useState,useContext, useEffect} from 'react';
import { Context } from '../../App';
import { getDoc, collection,data,doc,getDocs,updateDoc} from 'firebase/firestore';
import { Navigate } from 'react-router-dom';
import { firestore } from '../../Firebase';
import './YourRubrics.css';
export function YourRubrics(){
    let contextData=useContext(Context);
    let ref=collection(firestore,'userData');
    let [rubrics,setRubrics]=useState(false);
    let [editRubric,goEditRubric]=useState(false);
    let [update,doUpdate]=useState(0);
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
                    contextData.updateRubric(docData.rubric[dataProperties]);
                    contextData.rubricToEditKey.current=dataProperties;
                }
            }
        });
        goEditRubric(true);
    }
    async function handleDelete(rubricPassword){
        let document=await getDoc(doc(collection(firestore,'userData'),contextData.docId));
        let passwordDoc=await getDoc(doc(collection(firestore,'passwords'),'z3riCRgKX2AFUE6Sr3g7'));
        let placeHolder=undefined;
        let docData=document.data();
        let passDocData=passwordDoc.data();
        for (let dataProperties in docData.rubric){
           if(docData.rubric[dataProperties].password===rubricPassword){
                    placeHolder=docData
                    placeHolder.rubric.pop(placeHolder.rubric.indexOf(placeHolder.rubric[dataProperties]))
             }
                        }
        let passPlaceHolder=passDocData;
        passPlaceHolder.passwords.pop(passPlaceHolder.passwords.indexOf(rubricPassword));
        await updateDoc(doc(collection(firestore,'passwords'),'z3riCRgKX2AFUE6Sr3g7'),passPlaceHolder)
        await updateDoc(doc(ref,contextData.docId),placeHolder);
        doUpdate(a=>a+1)
    }
    if(editRubric){
        return <Navigate to="/EditRubric" replace={true}/>;
    }
    return (
        <div id='rubricDisplay'>
            {rubrics!==false?rubrics.map((a,h)=>{
            return (
            <div>
            <div className='rubricShower' key={h} onClick={()=>{handleEdit(a.password)}}>
                <h3>{a.name}</h3>
                <p>{a.description}</p>
                <span>{a.password}</span>
            </div>
            <button onClick={()=>{handleDelete(a.password)}}>Delete</button>
            </div>
            );
            }):<h1>Add Your Rubrics</h1>}
        </div>
    )
}