import React,{useContext, useEffect} from 'react';
import { Context } from '../../App';
import { useState } from 'react';
import './EditRubric.css';
import { firestore } from '../../Firebase';
import { updateDoc,doc,data,collection, getDoc} from 'firebase/firestore';
export function EditRubric(){
    let ref=collection(firestore,'userData');
    let [keysToIterateThrough,setKeys]=useState(false);
    let [update,doUpdate]=useState(0);
    useEffect(()=>{
        let keys=Object.keys(contextData.rubricToEdit.current);
        keys.pop(keys.indexOf('name'));
        keys.pop(keys.indexOf('description'));
        keys.pop(keys.indexOf('password'));
        setKeys(keys);
    },[]);
    let contextData=useContext(Context);
    async function handleTextChange(e,row,grid){
        e.preventDefault();
        let docData=await getDoc(doc(ref,contextData.docId));
        let theData=docData.data();
        theData['rubric'][contextData.rubricToEditKey.current][row][grid]=e.target.value;
        await updateDoc(doc(ref,contextData.docId),theData)
        contextData.rubricToEdit.current[row][grid]=e.target.value;
        
    }
    async function handleAdd(e){
        return;
    }
    async function handleDelete(e,row){
        e.preventDefault();
        let docData=await getDoc(doc(ref,contextData.docId));
        let theData=docData.data();
        delete theData['rubric'][contextData.rubricToEditKey.current][row]
        await updateDoc(doc(ref,contextData.docId),theData)
        delete contextData.rubricToEdit.current[row];
        doUpdate(a=>a+1);
    }
    return (
        <div id="EditRubric">
            <h1>{contextData.rubricToEdit.current.name}</h1>
            <h3>{contextData.rubricToEdit.current.description}</h3>
            <div id="displayRubric">
            <div className='rubricRow' key={-1}>
                                <div className='rubricGrid'>Category</div>
                                <div className='rubricGrid'>Score Of 1</div>
                                <div className='rubricGrid'>Score Of 2</div>
                                <div className='rubricGrid'>Score Of 3</div>
                                <div className='rubricGrid' >Score Of 4</div>
                            </div>
            {
                keysToIterateThrough&&keysToIterateThrough.map(
                    (a,h)=>{
                        return (
                            <div className='rubricRow' key={h}>
                                <textarea className='rubricGrid' onChange={(e)=>handleTextChange(e,a,'category')} defaultValue={contextData.rubricToEdit.current[a]['category']}></textarea>
                                <textarea className='rubricGrid' onChange={(e)=>handleTextChange(e,a,1)} defaultValue={contextData.rubricToEdit.current[a][1]}></textarea>
                                <textarea  className='rubricGrid' onChange={(e)=>handleTextChange(e,a,2)} defaultValue={contextData.rubricToEdit.current[a][2]}></textarea>
                                <textarea  className='rubricGrid' onChange={(e)=>handleTextChange(e,a,3)}defaultValue={contextData.rubricToEdit.current[a][3]}></textarea>
                                <textarea  className='rubricGrid' onChange={(e)=>handleTextChange(e,a,4)} defaultValue={contextData.rubricToEdit.current[a][4]}></textarea>
                                <button className='rubricGrid rubricDelete' onClick={(e)=>handleDelete(e,a)}>Delete</button>
                            </div>
                        );
                    }
                )
            }
            </div>
            <button onClick={handleAdd}>Add Row</button>
        </div>
    );
}