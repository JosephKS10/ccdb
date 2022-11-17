import React, {useState, useEffect} from 'react'
import './Profile.css'
import back from '../pictures/back.svg'
import { Link } from 'react-router-dom';
import {CgProfile} from "react-icons/cg";
import { auth, database } from '../firebase';
import  {ref, get} from "firebase/database";

const Profile = () => {
    const [profile, setProfile] = useState({
        username: "",
        email: "",
        uid: ""
    })
    const [bookmarkPID, setBookmarkPID] = useState([]);
    const [bookmarkContent, setbookContent] = useState([{
      name:"",
      pid:"",
      cr1:"",
      cr2:"",
      cr3:""
    }])
    useEffect(() => {
            getUserdataandBookmarkInfo();
            loadbookmarkdata();
    }, [])

       async function getUserdataandBookmarkInfo(){
       auth.onAuthStateChanged((user)=>{
        if(user){
            setProfile({
                username: user.displayName,
                email: user.email,
                uid: user.uid
            })
            //
            const tasksRef = ref(database, "users/"+user.uid+"/");
            get(tasksRef)
           .then((snapshot) => {
             const data = snapshot.val();
             if(data != null){
               console.log(data);
               for(let value in data){
                 console.log(profile.uid)
                 if(value.length === 4){
                  setBookmarkPID(oldArray => [...oldArray, data[value]["bookmark"]]);
                 }
               }
             }
           
          })
           .catch((err) => {
             console.error(err);
         });
        }
      });
      
    }

    function loadbookmarkdata(){
      const databaseref = ref(database);
      get(databaseref)
        .then((snapshot) => {
          const data = snapshot.val();
          console.log(data);
          if(data!= null){
          for(let value in data){
            if(value!=="users" && data[value]["pubchemCid"]){
              setbookContent(oldArray=> [...oldArray, {
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
    }
    


  return (
    <div className='profile-body'>
  <div className="profile-container1">
      <div className="header-login">
            <div className="heading-login">CCDB.</div>
            <Link className='Link' to='/'><button className="button"><img src={back} alt="back" className="back"/><h2 className='back-title'>Back</h2></button></Link>
        </div>
      </div>
      <div className="profile-container2">
         <div className="profile-box1"><br />
         <div className='center'>
         <CgProfile className='profile-image-profile'/>
         <div className="profile-block">
            <p className="name">{profile.username}</p>
            <p className="email">{profile.email}</p>
            </div>
            </div>
        </div>
        <div className="profile-box2"><br />
        <h1 className="heading-profile">Your Favourite Bookmarks</h1><br />
        <div className="bookmark-div">
        <table className='bookmark-table'>
          <thead>
          <tr>
            <th>Name</th>
            <th>Pubchem ID</th>
            <th>Pubchem</th>
            <th>ChemSpider</th>
            <th>Wikipedia</th>
          </tr>
          </thead>
          <tbody>
   {
   bookmarkContent.map((p, key) => {
    console.log(p["pid"]);
     for(let value in bookmarkPID){
          if(bookmarkPID[value] == p["pid"]){
            console.log(p["name"]);
            return(
              <>
              <tr className='tr'>
                <td className='tr-name'><b>{p["name"]}</b></td>
                <td>{p["pid"]}</td>
                <td><a href={p["cr1"]} target="_blank" className='a'>Click here</a></td>
                <td><a href={p["cr3"]} target="_blank" className='a'>Click here</a></td>
                <td><a href={p["cr2"]} target="_blank" className='a'>Click here</a></td>
              </tr>
              </>
            )
          }
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

export default Profile