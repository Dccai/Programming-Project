
import './App.css';
import { Route,Routes,Link,BrowserRouter} from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { onAuthStateChanged } from 'firebase/auth';
import { RubricQuestionaire } from './Pages/RubricQuestionaire/RubricQuestionaire';
import { CreateQuestionaire } from './Pages/CreateQuestionaire/CreateQuestionaire';
import React,{useEffect,useState,createContext,useRef} from 'react';
import { firestore,auth } from './Firebase';
import {getDocs,query,where,collection,data} from 'firebase/firestore';
import { Login } from './Pages/Login/Login';
import { Signup } from './Pages/Signup/Signup';
import { Checkin } from './Pages/Checkin/Checkin';
import { YourRubrics } from './Pages/YourRubrics/YourRubrics';
import { EditRubric } from './Pages/EditRubric/EditRubric';
export const Context=createContext();
function App() {
  let ref=collection(firestore,'userData');
  let [user,setUser]=useState(undefined);
  let [docId,setDocId]=useState(undefined);
  let rubricToUse=useRef(undefined);
  let [rubricToEdit,updateRubric]=useState(undefined);
  let rubricToEditKey=useRef(undefined);
  useEffect(
    ()=>{
      let authListener=onAuthStateChanged(auth,(user)=>{
        if(user){
        setUser(user.uid);
        async function getData(){
          let q=query(ref,where('id','==',user.uid));
          let docs=await getDocs(q);
          let doc=docs.docs[0]
          let data=doc.data();
          setDocId(data.docId);
        }
        getData();
      }
    });
      return ()=>authListener;
    }
    ,[]);
    let contextData={userId:user,docId:docId,setDocId:setDocId,rubricToUse:rubricToUse,rubricToEdit:rubricToEdit,updateRubric:updateRubric,rubricToEditKey:rubricToEditKey};
  function Navbar(){
    return (
      <nav id="navBar">
        <div className='linkBlock'>
        <Link className="link" to="/Home">Home</Link>
        </div>
        <div className='linkBlock'>
        <Link className="link" to="/">Start Page</Link>
        </div>
        <div className='linkBlock'>
        <Link className="link" to="/YourRubrics">Your Rubrics</Link>
        </div>
      </nav>
    );
  }
  return (
    <div className="App">
      <BrowserRouter>
      {user&&<Navbar/>}
      <Routes>
        <Route path="/" element={<Checkin/>}/>
        <Route path="/Home" element={<Context.Provider value={contextData}><Home/></Context.Provider>}/>
        <Route path="/RubricQuestionaire" element={<Context.Provider value={contextData}><RubricQuestionaire/></Context.Provider>}/>
        <Route path="/CreateQuestionaire" element={<Context.Provider value={contextData}><CreateQuestionaire/></Context.Provider>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Signup" element={<Context.Provider value={contextData}><Signup/></Context.Provider>}/>
        <Route path="/YourRubrics" element={<Context.Provider value={contextData}><YourRubrics/></Context.Provider>}/>
        <Route path="/EditRubric" element={<Context.Provider value={contextData}><EditRubric/></Context.Provider>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
