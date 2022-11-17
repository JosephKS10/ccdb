import React, {useState,useEffect} from 'react'
import './AllData.css'
import { Link } from 'react-router-dom'
import back from '../pictures/back.svg'
import  {ref, get} from "firebase/database";
import { auth, database } from '../firebase';

const AllData = () => {
    const [allDataContent, setallDataContent] = useState([{
        name:"",
        pid:"",
        cr1:"",
        cr2:"",
        cr3:""
      }])
    useEffect(()=>{
        const databaseref = ref(database);
        get(databaseref)
          .then((snapshot) => {
            const data = snapshot.val();
            if(data!= null){
            for(let value in data){
              if(value!=="users"){
                setallDataContent(oldArray=> [...oldArray, {
                  name:data[value]["name"],
                  pid:data[value]["pubchemCid"],
                  cr1:data[value]["cr1pubchem"],
                  cr2:data[value]["cr3wikipedia"],
                  cr3:data[value]["cr2chemspider"]
                }]) 
              }
            }
          }
          })
          .catch((err) => {
            console.error(err);
        });
    },[])

  return (
    <div className="body">
    <div className="all-data-container1">
    <div className="header-login">
          <div className="heading-login">CCDB.</div>
          <Link className='Link' to='/'><button className="button"><img src={back} alt="back" className="back"/><h2 className='back-title'>Back</h2></button></Link>
      </div>
    </div>
    <div className="all-data-container2">
      <div className="all-data-box2"><br />
      <h1 className="heading-all-data">All Data present in CCDB</h1><br />
      <div className='table'>
      <table className='alldata-table'>
          <thead>
          <tr>
            <th><b className='bold'>Name</b></th>
            <th><b className='bold'>Pubchem ID</b></th>
            <th><b className='bold'>Pubchem</b></th>
            <th><b className='bold'>ChemSpider</b></th>
            <th><b className='bold'>Wikipedia</b></th>
          </tr>
          </thead>
          <tbody>
   {
   allDataContent.map((p, key) => {
    console.log(p["pid"]);
          if(p["pid"] != ""){
            console.log(p["name"]);
            return(
              <>
              <tr className='tr' key={key}>
                <td className='tr-name'><b>{p["name"]}</b></td>
                <td>{p["pid"]}</td>
                <td><a href={p["cr1"]} target="_blank" className='a'>Click here</a></td>
                <td><a href={p["cr3"]} target="_blank" className='a'>Click here</a></td>
                <td><a href={p["cr2"]} target="_blank" className='a'>Click here</a></td>
              </tr>
              </>
            )
          }
     
       
     })}
   </tbody>
        </table>
        </div>
      </div>
    </div>  
     
  </div>
  )
}

export default AllData