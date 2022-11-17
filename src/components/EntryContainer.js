import React, {useState, useEffect} from 'react'
import "./EntryContainer.css";
import {BsBookmarkPlus,BsBookmarkCheckFill} from 'react-icons/bs';
import {database} from "../firebase";
import {ref, set,onValue, remove } from "firebase/database";


const EntryContainer = (props) => {

    useEffect(()=> {
        checkboookmark();
    },[])

    const [bookmarkCheck, setBookmarkCheck] = useState(false);
    const [bookmarkToken, setBookmarkToken] = useState("");
    function generate_token(length){
        var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        var b = [];  
        for (var i=0; i<length; i++) {
            var j = (Math.random() * (a.length-1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join("");
    }

    function bookmarkAdded(){
        let token = generate_token(4);
        set(ref(database, 'users/' + props.useruid + '/'+token), {
             bookmark : props.object.CarcinogenPID
          }).then(res=> {
              console.log("Bookmark added");
              setBookmarkCheck(true);
          }).catch(res=>{
            alert("Couldn't add the bookmark! Some error occured")
          });
    }
    function bookmarkRemoved(){
        console.log(bookmarkToken);
        let userRef = ref(database,'users/' + props.useruid+"/"+bookmarkToken);
        remove(userRef).then(()=>{
            console.log("bookmark has been removed");
            setBookmarkCheck(false);
        }).catch(res=>{
            console.log("could not remove the bookmark");
        })
        

    }
    const checkboookmark= ()=>{
        const userRef = ref(database, 'users/' + props.useruid);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if(data !== null){
              for(let value in data){
                  if(value.length == 4 && data[value]["bookmark"] == props.object.CarcinogenPID){
                    setBookmarkCheck(true);
                    setBookmarkToken(value);
                    return;
                  }
                  else{
                    setBookmarkCheck(false);
                  }
              }
          }
        });
    }

    function bookmarkActive(){
       console.log(props.useruid)
        if(props.useruid !== ""){
            bookmarkAdded();
        }
        else{
            alert("Please login in order to save your bookmarks");
        }
    }
    function bookmarkInactive(){
        setBookmarkCheck(false);
        if(props.useruid !== null){
            bookmarkRemoved();
        }
        else{
            alert("Please login in order to save your bookmarks");
        }
    }
  return (
    <div className="entry-container">
    <div className="entry-header">
        <div className="header-content ">
        <div className="b1">
            <div className="name">
            <h3>Name:-</h3>
            <p className='data'>{props.object.CarcinogenName}</p>
            </div>
            <div className="chembleid">
            <h3>ChEMBL ID:-</h3>
            <p className='data'>{props.object.CarcinogenCID}</p>
            </div>
        </div>
        <div className="cancer">
        <h3>Cancer caused:-</h3>&nbsp;&nbsp;{props.object.CarcinogenCancerCaused}
        </div>
        {bookmarkCheck||<BsBookmarkPlus className='bookmark-icon' onClick={bookmarkActive}/>}
        {bookmarkCheck&&<BsBookmarkCheckFill className='bookmark-icon' onClick={bookmarkInactive}/>}
        </div>
    </div>
    <div className="entry-body top">
        <div className="pubchemid">
            <h3 className='body-heading'>PubChem CID:-</h3>
            <p className='body-data'>{props.object.CarcinogenPID}</p>
        </div>
        <div className="structures minus-top">
            <h3 className='body-heading'>Structures:-</h3>
            <img src={props.object.CarcinogenAstructure} alt="2-d structure"  className='structure-image'/>
            <img src={props.object.CarcinogenBstructure} alt="'"  className='structure-image'/>
        </div>
        <div className="iupacname minus-top">
            <h3 className='body-heading'>IUPAC Name:-</h3>
            <p className='body-data'>{props.object.CarcinogenIupacname}</p>
        </div>
        <div className="molecularformula minus-top">
            <h3 className='body-heading'>Molecular Formula:-</h3>
            <p className='body-data'>{props.object.CarcinogenMolecularformula}</p>
        </div>
        <div className="synonyms minus-top">
            <h3 className='body-heading'>Synonyms:-</h3>
            <p className='body-data'>{props.object.CarcinogenSynonyms}</p>
        </div>
        <div className="molecularweight minus-top">
            <h3 className='body-heading'>Molecular Weight:-</h3>
            <p className='body-data'>{props.object.CarcinogenMolecularweight}</p>
        </div>
        <div className="summarychebi minus-top">
            <h3 className='body-heading'>Summary ChEBI:-</h3>
            <p className='body-data'>{props.object.CarcinogenSummarychebi}</p>
        </div>
        <div className="cp minus-top">
            <h3 className='body-heading'>Computed Properties:-</h3>
            <ul className="body-data">
                <li>hydrogen bond donor count - {props.object.CarcinogenCp1}</li>
                <li>hydrogen bond Acceptor count - {props.object.CarcinogenCp2}</li>
                <li>Exact Mass - {props.object.CarcinogenCp3}</li>
                <li>Heavy Atom Count - {props.object.CarcinogenCp4}</li>
            </ul>
        </div>
        <div className="ep minus-top">
            <h3 className='body-heading'>Experimental Properties:-</h3>
            <ul>
                <li className='pd'><h3 className='body-heading'>Physical Description -</h3><p className='body-data'>{props.object.CarcinogenEp1}</p></li>
                <li className='color'><h3 className='body-heading'>Color/Form -</h3><p className='body-data'>{props.object.CarcinogenEp2}</p></li>
                <li className='bp'><h3 className='body-heading'>Boiling Point -</h3><p className='body-data'>{props.object.CarcinogenEp3}</p></li>
                <li className='solubility'><h3 className='body-heading'>Solubility -</h3><p className='body-data'>{props.object.CarcinogenEp4}</p></li>
            </ul>
        </div>
        <div className="references">
            <div className="cross-references">
            <h3 className='body-heading'>Cross References:-</h3>
            <ul>
                <li><a href={props.object.CarcinogenCr1} className='link-references' target="_blank" rel="noopener noreferrer">Pubchem</a></li>
                <li><a href={props.object.CarcinogenCr2} className='link-references' target="_blank" rel="noopener noreferrer">ChemSpider</a></li>
                <li><a href={props.object.CarcinogenCr3} className='link-references' target="_blank" rel="noopener noreferrer">Wikipedia</a></li>
            </ul>
            </div>
            <div className="unichem-cross-references">
            <h3 className='body-heading'>UniChem Cross References:-</h3>
            <ul>
                <li><a href={props.object.CarcinogenUcr1} className='link-references' target="_blank" rel="noopener noreferrer">DrugBank</a></li>
                <li><a href={props.object.CarcinogenUcr2} className='link-references' target="_blank" rel="noopener noreferrer">Atlas</a></li>
                <li><a href={props.object.CarcinogenUcr3} className='link-references' target="_blank" rel="noopener noreferrer">ChEBI</a></li>
            </ul>
            </div>
        </div>
    </div>
  </div>
  )
}

export default EntryContainer