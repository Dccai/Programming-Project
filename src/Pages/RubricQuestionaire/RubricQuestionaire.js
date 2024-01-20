import './RubricQuestionaire.css'
import React,{useState,useEffect,useContext, useRef} from 'react';
import { Context } from '../../App';
import { useNavigate } from 'react-router-dom';
export function RubricQuestionaire(){
    let contextData=useContext(Context);
    let [rubricIt,setRubricIt]=useState(false);
    let [score,updateScore]=useState([]);
    let nav=useNavigate();
    useEffect(()=>{
        if(contextData.userId!==undefined){
        let rubricKeys=Object.keys(contextData.rubricToUse.current);
        rubricKeys.pop(rubricKeys.indexOf('name'));
        rubricKeys.pop(rubricKeys.indexOf('description'));
        rubricKeys.pop(rubricKeys.indexOf('password'));
        setRubricIt(rubricKeys);
        }
        else{
            nav("/Home");
        }
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
            <div className="questionaireBackground">
                <h1 id="rubricQuestionHead">{contextData.rubricToUse.current['name']}</h1>
                <h3 id="rubricQuestionCategory">{contextData.rubricToUse.current[rubricIt[score.length]]['category']}</h3>
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
            <div className="questionaireBackground">
                <h1 id="rubricQuestionHead">Your Grade</h1>
                <h3 id="rubricQuestionCategory" style={{fontSize:'50px'}}>{handleScore()}</h3>
            </div>
        )
    }
    else{
    return (
        <div className="questionaireBackground">
        <h1>Questionaire</h1>

        </div>
    );
    }
}