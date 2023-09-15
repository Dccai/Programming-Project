import './CreateQuestionaire.css';
import { useEffect, useRef, useState,useContext } from 'react';
import { firestore } from '../../Firebase';
import { Context } from '../../App';
import {collection, addDoc,query,where,getDocs,data,getDoc, updateDoc,arrayUnion,doc} from 'firebase/firestore';
export function CreateQuestionaire(){
    let contextData=useContext(Context);
    let maxLength=useRef(0);
    let ref=collection(firestore,'userData');
    let rubric=useRef({});
    let [update,setUpdate]=useState(0);
    let [passTaken,setPassTaken]=useState(false);
    function addRow(e){
        e.preventDefault();
        
        maxLength.current+=1;
        let form=new FormData(e.currentTarget);
        let data=Object.fromEntries(form);
        rubric.current[maxLength.current]={category:data.category,1:data.score1,2:data.score2,3:data.score3,4:data.score4};
        setUpdate(a=>a+1)
    }
    function deleteRow(row){
        let arrayToReplace=rubric.current;
        delete arrayToReplace[row]
        rubric.current=arrayToReplace;
        setUpdate(a=>a+1);
    }
    async function addRubric(e){
    e.preventDefault();
    let form =new FormData(e.currentTarget);
    let data=Object.fromEntries(form);
    let passwordDocs=await getDoc(doc(firestore,'passwords','z3riCRgKX2AFUE6Sr3g7'));
    let passwordList=passwordDocs.data();
    if(passwordList.passwords.includes(data.rubricPassword)){
        setPassTaken(true);
    }
    else{
    rubric.current['name']=data.rubricName;
    rubric.current['description']=data.rubricDescription;
    rubric.current['password']=data.rubricPassword;
    updateDoc(doc(ref,contextData.docId),{rubric:arrayUnion(rubric.current)})
    updateDoc(doc(firestore,'passwords','z3riCRgKX2AFUE6Sr3g7'),{passwords:arrayUnion(data.rubricPassword)})
    }
    }
    return (
        <div>
            {passTaken&&<div className='popUp'><h1 className='popUpPassTaken'>Password Is Taken</h1><button className='coolButton' onClick={()=>setPassTaken(false)}>Close</button></div>}
            <h1>Create Rubric</h1>
            Current Rubric: <br/>
            <div className="rubricGridDisplay">
            <div className="rubricGrid">Category</div><div className="rubricGrid">Score of 1</div><div className="rubricGrid">Score of 2</div><div className="rubricGrid">Score of 3</div><div className="rubricGrid">Score of 4</div> </div>
            {Object.keys(rubric.current).map((a,h)=><div className='rubricGridDisplay row' keys={h}><div className="rubricGrid">{rubric.current[a]['category']}</div><div className="rubricGrid">{rubric.current[a][1]}</div><div className="rubricGrid">{rubric.current[a][2]}</div><div className="rubricGrid">{rubric.current[a][3]}</div><div className="rubricGrid">{rubric.current[a][4]}</div><button className='rubricGrid' onClick={()=>deleteRow(a)}>Delete Row</button></div>)}
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
            <form onSubmit={addRubric}>
                <label htmlFor='rubricName'>Name Of The Rubric</label>
                <input type='text' required name="rubricName"/>
                <label htmlFor='rubricDescription'>Rubric Description</label>
                <input type='text' required name="rubricDescription"/>
                <label htmlFor='rubricPassword'>Rubric Password</label>
                <input type='text' required name="rubricPassword"/>
                <button type='submit'>Add Rubric</button>
            </form>
            
            
        </div>
    );
}