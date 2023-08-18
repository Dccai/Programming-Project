import './CreateQuestionaire.css';
import { useState } from 'react';
export function CreateQuestionaire(){
    let [rubric,setRubric]=useState([]);
    function addRow(e){
        return;
    }
    return (
        <div>
            <h1>Create Rubric</h1>
            <form onSubmit={addRow}>
            <div>Category</div>    
            <input type="text" required/>
            <div>Score Of 1</div> 
            <input type="text" required/>
            <div>Score Of 2</div> 
            <input type="text" required/>
            <div>Score Of 3</div> 
            <input type="text" required/>
            <div>Score Of 4</div> 
            <input type="text" required/>
            <button>Create A Row</button>
            </form>
        </div>
    );
}