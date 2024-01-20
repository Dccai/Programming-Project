import React,{useState,useContext, useEffect} from 'react';
import { Context } from '../../App';
import { getDoc, collection,data,doc,getDocs,updateDoc,onSnapshot} from 'firebase/firestore';
import { Navigate,useNavigate } from 'react-router-dom';
import { firestore } from '../../Firebase';
import './YourRubrics.css';
export function YourRubrics(){
    let nav=useNavigate();
    let contextData=useContext(Context);
  
    let ref=collection(firestore,'userData');
    let [rubrics,setRubrics]=useState(false);
    let [editRubric,goEditRubric]=useState(false);
    let [update,doUpdate]=useState(0);
    useEffect(()=>{
        async function getRubrics(){  
        if(contextData.userId!==undefined){
       let document=await getDoc(doc(ref,contextData.docId));
       let docData=document.data();
       setRubrics(docData.rubric);
        }
        else{
           nav("/Home");
        };
        }
        getRubrics();
        try{
       onSnapshot(doc(ref,contextData.docId), (doc) => {
          getRubrics() });
       }
       catch(e){
        console.log(e);
       }
    

      
    
       
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
                    placeHolder.rubric.splice(placeHolder.rubric.indexOf(placeHolder.rubric[dataProperties]),1);
             }
                        }
        let passPlaceHolder=passDocData;
        passPlaceHolder.passwords.splice(passPlaceHolder.passwords.indexOf(rubricPassword),1);
        await updateDoc(doc(collection(firestore,'passwords'),'z3riCRgKX2AFUE6Sr3g7'),passPlaceHolder)
        await updateDoc(doc(ref,contextData.docId),placeHolder);
        doUpdate(a=>a+1);
    }
    if(editRubric){
        return <Navigate to="/EditRubric" replace={true}/>;
    }
    return (
        <div id='rubricDisplay'>
            {(rubrics!==false&&rubrics.length!==0)?rubrics.map((a,h)=>{
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
            }):<h1 id="addRubricLine">Add Your Rubrics</h1>}
        </div>
    )
}