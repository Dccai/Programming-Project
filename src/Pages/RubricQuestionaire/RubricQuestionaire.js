import './RubricQuestionaire.css'
import React,{useState,useEffect,useContext, useRef} from 'react';
import { Context } from '../../App';
export function RubricQuestionaire(){
    let contextData=useContext(Context);
    let [rubricIt,setRubricIt]=useState(false);
    let [score,updateScore]=useState([]);
    useEffect(()=>{
        let rubricKeys=Object.keys(contextData.rubricToUse.current);
        rubricKeys.pop(rubricKeys.indexOf('name'));
        rubricKeys.pop(rubricKeys.indexOf('description'));
        rubricKeys.pop(rubricKeys.indexOf('password'));
        setRubricIt(rubricKeys);
    },[]);
    function handleClick(score){
        updateScore(a=>[...a,score])
    }
    function handleScore(){
        let theScore=0;
        score.forEach(a=>{
            console.log(score)
            theScore+=a
        });
        return theScore/(4*score.length);

    }
    if(rubricIt&&score.length<rubricIt.length){
        return(
            <div>
                <h1>{contextData.rubricToUse.current['name']}</h1>
                <h3>{contextData.rubricToUse.current[rubricIt[score.length]]['category']}</h3>
                <div id="displayOptions"><button className='option' onClick={()=>{handleClick(1)}}>{
                contextData.rubricToUse.current[rubricIt[score.length]][1]
                }</button>
                <button className='option' onClick={()=>{handleClick(2)}}>{
                contextData.rubricToUse.current[rubricIt[score.length]][2]
                }</button>
                <button className='option' onClick={()=>{handleClick(3)}}>{
                contextData.rubricToUse.current[rubricIt[score.length]][3]
                }</button>
                <button className='option' onClick={()=>{handleClick(4)}}>{
                contextData.rubricToUse.current[rubricIt[score.length]][4]
                }</button>
                </div>
            </div>
        )
    }
    else if(rubricIt&&rubricIt.length===score.length){
        return(
            <div>
                {handleScore()}
            </div>
        )
    }
    else{
    return (
        <div>
        <h1>Questionaire</h1>

        </div>
    );
    }
}