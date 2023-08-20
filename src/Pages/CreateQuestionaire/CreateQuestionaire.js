import './CreateQuestionaire.css';
import { useEffect, useRef, useState,useContext } from 'react';
import { firestore } from '../../Firebase';
import { Context } from '../../App';
import {collection, addDoc,query,where,getDocs,data, updateDoc} from 'firebase/firestore';
export function CreateQuestionaire(){
    let contextData=useContext(Context);
    let ref=collection(firestore,'userData');
    let rubric=useRef([]);
    let [update,setUpdate]=useState(0);
    function addRow(e){
        e.preventDefault();
        let form=new FormData(e.currentTarget);
        let data=Object.fromEntries(form);
        rubric.current.push([data.category,data.score1,data.score2,data.score3,data.score4]);
        setUpdate(a=>a+1)
    }
    function deleteRow(row){
        let arrayToReplace=rubric.current;
        arrayToReplace.pop(row);
        rubric.current=arrayToReplace;
        setUpdate(a=>a+1);
    }
    async function addRubric(){
    updateDoc(doc(ref,contextData.docId),{rubric:[]})
    }
    return (
        <div>
            <h1>Create Rubric</h1>
            Current Rubric: <br/>
            {rubric.current.map((a,h)=><div><div>{a[0]}</div><div>{a[1]}</div><div>{a[2]}</div><div>{a[3]}</div><div>{a[4]}</div><button onClick={()=>deleteRow(h)}>Delete Row</button></div>)}
            <form onSubmit={addRow}>
            <div>Category</div>    
            <input name="category" type="text" required/>
            <div>Score Of 1</div> 
            <input name="score1" type="text" required/>
            <div>Score Of 2</div> 
            <input name="score2" type="text" required/>
            <div>Score Of 3</div> 
            <input name="score3" type="text" required/>
            <div>Score Of 4</div> 
            <input type="text" name="score4"required/>
            <button>Create A Row</button>
            </form>
            <button onClick={addRubric}>Add Rubric</button>
        </div>
    );
}