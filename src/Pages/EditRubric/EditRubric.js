import React,{useContext, useEffect,useRef} from 'react';
import { Context } from '../../App';
import { useState } from 'react';
import './EditRubric.css';
import { firestore } from '../../Firebase';
import { updateDoc,doc,data,collection, getDoc,onSnapshot} from 'firebase/firestore';
export function EditRubric(){
    let ref=collection(firestore,'userData');
    let keysToIterateThrough=useRef(false);
    let [update,doUpdate]=useState(0);
    let textarea;
    let contextData=useContext(Context);
    useEffect(()=>{
        const unsub = onSnapshot(doc(ref,contextData.docId), (doc) => {
            doUpdate(a=>a+1)});
        let keys=Object.keys(contextData.rubricToEdit.current);
        keys.pop(keys.indexOf('name'));
        keys.pop(keys.indexOf('description'));
        keys.pop(keys.indexOf('password'));
        keysToIterateThrough.current=keys.map(a=>parseInt(a));
    },[]);
    async function handleTextChange(e,row,grid){
        e.preventDefault();
        let docData=await getDoc(doc(ref,contextData.docId));
        let theData=docData.data();
        theData['rubric'][contextData.rubricToEditKey.current][row][grid]=e.target.value;
        contextData.rubricToEdit.current[row][grid]=e.target.value;
        doUpdate(a=>a+1)
        await updateDoc(doc(ref,contextData.docId),theData)
    }
    async function handleAdd(e){
        let maxKey=keysToIterateThrough.current.length===0?0:Math.max(...keysToIterateThrough.current);
        e.preventDefault();
        let docData=await getDoc(doc(ref,contextData.docId));
        let theData=docData.data();
        theData['rubric'][contextData.rubricToEditKey.current][maxKey+1]={1:'Add Data',2:'Add Data',3:'Add Data',4:'Add Data','category':'Add Data'};
        contextData.rubricToEdit.current[maxKey+1]={1:'Add Data',2:'Add Data',3:'Add Data',4:'Add Data','category':'Add Data'};
        keysToIterateThrough.current.push(maxKey+1);
        await updateDoc(doc(ref,contextData.docId),theData)
        
    }
    async function handleDelete(e,row){
        e.preventDefault();
        let docData=await getDoc(doc(ref,contextData.docId));
        let theData=docData.data();
        delete theData['rubric'][contextData.rubricToEditKey.current][row]
        let oldkey=keysToIterateThrough.current;
        oldkey.splice(oldkey.indexOf(row), 1);
        delete contextData.rubricToEdit.current[row];
        keysToIterateThrough.current=oldkey;
        await updateDoc(doc(ref,contextData.docId),theData)
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
                keysToIterateThrough.current.length!==0&&keysToIterateThrough.current&&keysToIterateThrough.current.map(
                    (a,h)=>{
                        if (contextData.rubricToEdit.current[a]===undefined){
                            return null;
                        }
                        console.log(contextData.rubricToEdit.current[a][1])
                        return (
                            <div className='rubricRow' key={h}>
                                <textarea className='rubricGrid' onChange={(e)=>handleTextChange(e,a,'category')} defaultValue={contextData.rubricToEdit.current[a]['category']}/>
                                <textarea className='rubricGrid' onChange={(e)=>handleTextChange(e,a,1)} defaultValue={contextData.rubricToEdit.current[a][1]}/>
                                <textarea  className='rubricGrid' onChange={(e)=>handleTextChange(e,a,2)} defaultValue={contextData.rubricToEdit.current[a][2]}/>
                                <textarea  className='rubricGrid' onChange={(e)=>handleTextChange(e,a,3)}defaultValue={contextData.rubricToEdit.current[a][3]}/>
                                <textarea  className='rubricGrid' onChange={(e)=>handleTextChange(e,a,4)} defaultValue={contextData.rubricToEdit.current[a][4]}/>
                                <button className='rubricGrid rubricDelete' onClick={(e)=>handleDelete(e,parseInt(a))}>Delete</button>
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