import React from 'react'
import "./Home.css";
import close from '../pictures/close.svg';
import search from '../pictures/search.svg';
import DropdownMenu from '../components/DropdownMenu';
import EntryContainer from './EntryContainer';
import {auth, db} from "../firebase";
import { onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from 'react';
import Profilecard from './Profilecard';
export default function Home() {

  const[showProfileCard, setShowProfileCard] = useState(false);
  const [logintitle, setLoginTitle] = useState("LOGIN");
  const [userObject, setUserObject] = useState({
    username: "",
    email: "",
    uid: ""
  });

  const [search_entry,setSearchEntry] = useState("");
  const [carcinogen, setCarcinogens] = useState([]);
  const [check, setCheck]= useState(false);
  const [index,setIndex] = useState(-1);
  const[object, setObject] = useState({
    CarcinogenName: '',
    CarcinogenCID: '',
    CarcinogenCancerCaused: '',
    CarcinogenPID: '',
    CarcinogenAstructure: '',
    CarcinogenBstructure: '',
    CarcinogenIupacname: '',
    CarcinogenMolecularformula: '',
    CarcinogenSynonyms: '',
    CarcinogenMolecularweight: '',
    CarcinogenSummarychebi: '',
    CarcinogenCp1: '',
    CarcinogenCp2: '',
    CarcinogenCp3: '',
    CarcinogenCp4: '',
    CarcinogenEp1: '',
    CarcinogenEp2: '',
    CarcinogenEp3: '',
    CarcinogenEp4: '',
    CarcinogenCr1: '',
    CarcinogenCr2: '',
    CarcinogenCr3: '',
    CarcinogenUcr1: '',
    CarcinogenUcr2: '',
    CarcinogenUcr3: '',
  });

  const handleSearchChange = (e) => {
    setSearchEntry(e.target.value)
  }

  //read
  useEffect(() => {
    // for reading data from the database
    onValue(ref(db), snapshot=> {
      setCarcinogens([]);
      const data = snapshot.val();
      if(data !== null){
        Object.values(data).map((carci) => {
          setCarcinogens(oldArray => [...oldArray, carci]);
        });

      }
    }); 
    // searching the database
    searchDatabase();
    //on signup successful
    auth.onAuthStateChanged((user)=>{
      if(user){
        setLoginTitle("");
        setShowProfileCard(true);
        setUserObject({
          username: user.displayName,
          email: user.email,
          uid: user.uid
        })
      }
      else{setLoginTitle("LOGIN");}
      console.log(user);
    })

  }, [])

  function searchDatabase(){
  
    
    document.getElementById("searchbutton").addEventListener("click", function(event){
      event.preventDefault()  
      console.log("search given is: "+search_entry);
    });

    // name 
    function getCarcinogenName(carcinogen) {
      return carcinogen.name;
    }
    // chembl id
    function getCarcinogenCID(carcinogen){
      return carcinogen.chemblId;
    }
    // Cancer caused
    function getCarcinogenCancerCaused(carcinogen){
      return carcinogen.cancerCaused;
    }
    // pubchem 
    function getCarcinogenPID(carcinogen){
      return carcinogen.pubchemCid;
    }
    // a structure (2-d structures)
    function getCarcinogenAstructure(carcinogen){
      return carcinogen.astructure;
    }
    // b structure (3-d structure)
    function getCarcinogenBstructure(carcinogen){
      return carcinogen.bstructure;
    }
    // iupac name
    function getCarcinogenIupacname(carcinogen){
      return carcinogen.iupacName;
    }
    // molecular formula
    function getCarcinogenMolecularformula(carcinogen){
      return carcinogen.molecularFormular;
    }
    // synonyms
    function getCarcinogenSynonyms(carcinogen){
      return carcinogen.synonyms;
    }
    // molecular weight
    function getCarcinogenMolecularweight(carcinogen){
      return carcinogen.molecularWeight;
    }
    // summary chebi
    function getCarcinogenSummarychebi(carcinogen){
      return carcinogen.summaryChebi;
    }
     // computed property 1
     function getCarcinogenCp1(carcinogen){
      return carcinogen.cp1hydrogenBondDonorCount;
    }
     // computed property 2
     function getCarcinogenCp2(carcinogen){
      return carcinogen.cp2hydrogenBondAcceptorCount;
    }
     // computed property 3
     function getCarcinogenCp3(carcinogen){
      return carcinogen.cp3exactMass;
    }
     // computed property 4
     function getCarcinogenCp4(carcinogen){
      return carcinogen.cp4heavyAtomCount;
    }
     // Experimental property 1
     function getCarcinogenEp1(carcinogen){
      return carcinogen.ep1physicalDescription;
    }
     // Experimental property 2
     function getCarcinogenEp2(carcinogen){
      return carcinogen.ep2colorform;
    }
     // Experimental property 3
     function getCarcinogenEp3(carcinogen){
      return carcinogen.ep3boilingPoint;
    }
     // Experimental property 4
     function getCarcinogenEp4(carcinogen){
      return carcinogen.ep4solubility;
    }
    // Cross reference 1
    function getCarcinogenCr1(carcinogen){
      return carcinogen.cr1pubchem;
    }
    // Cross reference 2
    function getCarcinogenCr2(carcinogen){
      return carcinogen.cr2chemspider;
    }
    // Cross reference 3
    function getCarcinogenCr3(carcinogen){
      return carcinogen.cr3wikipedia;
    }
    // Unichem Cross reference 1
    function getCarcinogenUcr1(carcinogen){
      return carcinogen.ucr1drugbank;
    }
    // Unichem Cross reference 2
    function getCarcinogenUcr2(carcinogen){
      return carcinogen.ucr2atlas;
    }
    //Unichem Cross reference 3
    function getCarcinogenUcr3(carcinogen){
      return carcinogen.ucr3chebi;
    }

    let entry_search_name = carcinogen.map(getCarcinogenName);
    let entry_search_cid = carcinogen.map(getCarcinogenCID);
    let entry_search_cancer_caused = carcinogen.map(getCarcinogenCancerCaused);
    let entry_search_pid = carcinogen.map(getCarcinogenPID);
    let entry_search_astructure = carcinogen.map(getCarcinogenAstructure);
    let entry_search_bstructure = carcinogen.map(getCarcinogenBstructure);
    let entry_search_iupacname = carcinogen.map(getCarcinogenIupacname);
    let entry_search_molecular_formula = carcinogen.map(getCarcinogenMolecularformula);
    let entry_search_synonyms = carcinogen.map(getCarcinogenSynonyms);
    let entry_search_molecular_weight = carcinogen.map(getCarcinogenMolecularweight);
    let entry_search_summary_chebi = carcinogen.map(getCarcinogenSummarychebi);
    let entry_search_cp1 = carcinogen.map(getCarcinogenCp1);
    let entry_search_cp2 = carcinogen.map(getCarcinogenCp2);
    let entry_search_cp3 = carcinogen.map(getCarcinogenCp3);
    let entry_search_cp4 = carcinogen.map(getCarcinogenCp4);
    let entry_search_ep1 = carcinogen.map(getCarcinogenEp1);
    let entry_search_ep2 = carcinogen.map(getCarcinogenEp2);
    let entry_search_ep3 = carcinogen.map(getCarcinogenEp3);
    let entry_search_ep4 = carcinogen.map(getCarcinogenEp4);
    let entry_search_cr1 = carcinogen.map(getCarcinogenCr1);
    let entry_search_cr2 = carcinogen.map(getCarcinogenCr2);
    let entry_search_cr3 = carcinogen.map(getCarcinogenCr3);
    let entry_search_ucr1 = carcinogen.map(getCarcinogenUcr1);
    let entry_search_ucr2 = carcinogen.map(getCarcinogenUcr2);
    let entry_search_ucr3 = carcinogen.map(getCarcinogenUcr3);

    console.log(entry_search_name);
    console.log(entry_search_pid);
    // console.log(entry_search_cid);
    // console.log(entry_search_cancer_caused);
    // console.log(entry_search_astructure);
    // console.log(entry_search_bstructure);
    // console.log(entry_search_iupacname);
    // console.log(entry_search_molecular_formula);
    // console.log(entry_search_synonyms);
    // console.log(entry_search_molecular_weight);
    // console.log(entry_search_summary_chebi);
    // console.log(entry_search_cp1);
    // console.log(entry_search_cp2);
    // console.log(entry_search_cp3);
    // console.log(entry_search_cp4);
    // console.log(entry_search_ep1);
    // console.log(entry_search_ep2);
    // console.log(entry_search_ep3);
    // console.log(entry_search_ep4);
    // console.log(entry_search_cr1);
    // console.log(entry_search_cr2);
    // console.log(entry_search_cr3);
    // console.log(entry_search_ucr1);
    // console.log(entry_search_ucr2);
    // console.log(entry_search_ucr3);

    
    // index of the search entry
    
    // if(parseInt(search_entry) !== "string"){
    // for (let value of entry_search_name){
    //     if((search_entry.toLowerCase()) === value.toLowerCase()){
    //       let entry_index_name = entry_search_name.indexOf(value);
    //       setIndex(entry_index_name);
    //       setCheck(true);
    //       console.log("hello");
    //       if(entry_index_name !== -1){
    //         console.log("hello world");
    //       }
    //       return;
    //     }
    //   }
    // } 

    for (let value of entry_search_pid){
      if(value === parseInt(search_entry)){
        let entry_index_pid = entry_search_pid.indexOf(value);
        setIndex(entry_index_pid);
        setCheck(true);
        if(entry_index_pid !== -1){
          setObject({
            CarcinogenName: entry_search_name[entry_index_pid],
            CarcinogenCID: entry_search_cid[entry_index_pid],
            CarcinogenCancerCaused: entry_search_cancer_caused[entry_index_pid],
            CarcinogenPID: entry_search_pid[entry_index_pid],
            CarcinogenAstructure: entry_search_astructure[entry_index_pid],
            CarcinogenBstructure: entry_search_bstructure[entry_index_pid],
            CarcinogenIupacname: entry_search_iupacname[entry_index_pid],
            CarcinogenMolecularformula: entry_search_molecular_formula[entry_index_pid],
            CarcinogenSynonyms: entry_search_synonyms[entry_index_pid],
            CarcinogenMolecularweight: entry_search_molecular_weight[entry_index_pid],
            CarcinogenSummarychebi: entry_search_summary_chebi[entry_index_pid],
            CarcinogenCp1: entry_search_cp1[entry_index_pid],
            CarcinogenCp2: entry_search_cp2[entry_index_pid],
            CarcinogenCp3: entry_search_cp3[entry_index_pid],
            CarcinogenCp4: entry_search_cp4[entry_index_pid],
            CarcinogenEp1: entry_search_ep1[entry_index_pid],
            CarcinogenEp2: entry_search_ep2[entry_index_pid],
            CarcinogenEp3: entry_search_ep3[entry_index_pid],
            CarcinogenEp4: entry_search_ep4[entry_index_pid],
            CarcinogenCr1: entry_search_cr1[entry_index_pid],
            CarcinogenCr2: entry_search_cr2[entry_index_pid],
            CarcinogenCr3: entry_search_cr3[entry_index_pid],
            CarcinogenUcr1: entry_search_ucr1[entry_index_pid],
            CarcinogenUcr2: entry_search_ucr2[entry_index_pid],
            CarcinogenUcr3: entry_search_ucr3[entry_index_pid],
          })
        }
        return;
      }
    }


  }
  // reseting search bar
  function clear(){
    document.getElementById("search_input").value = "";
    setCheck(false);
    setSearchEntry("");
  }
  
  return (
    <div className="body">
      <div className="header">
       {showProfileCard &&<Profilecard name={userObject.username} email={userObject.email} show={setShowProfileCard}/>}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <DropdownMenu login={logintitle}/>&nbsp;&nbsp;
       </div>
      <div className="titlecontainer">
        <div className="heading">CCDB.</div><br />
        <div className="searchbox">
            <input type="text" className='textfield-search' placeholder='Search Carcinogen by Pubchem ID' value={search_entry} onChange={handleSearchChange} id="search_input"/>
            <div className="buttoncontainer">
            <img src={close} alt="close" className='close' height="50px" width="50px" onClick={clear}/>&nbsp;&nbsp;&nbsp;
            <hr className="line"/>
            <button className='search' id="searchbutton" onClick={searchDatabase}><img src={search} alt="search" height="50px" width="50px"/>
            </button>
            </div>
        </div>
      </div>
      
     {check &&<EntryContainer object={object} useruid={userObject.uid}/>}
     <br />
    </div>
  );
}
