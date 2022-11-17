import React, {useState, useEffect} from 'react'
import  Chart  from "react-apexcharts";
import './DataAnalysis.css'
import back from '../pictures/back.svg'
import { Link } from 'react-router-dom';
const DataAnalysis = () => {
   const [stdudentSubject, setStudentsubject]= useState([]);
   const [studentMarks, setStudentMarks]= useState([]);

    return(
            <div className="dataanalysis-body">
                <div className="about-container1">
      <div className="header-login">
            <div className="heading-analysis">CCDB.</div>
            <Link className='Link' to='/'><button className="button"><img src={back} alt="back" className="back"/><h2 className='back-title'>Back</h2></button></Link>
        </div>
      </div>
            <div className="container-fluid">
                <h3 className='analysis-heading'>Piechart for the data present in CCDB </h3>
                <Chart className="options"
                type="pie"
                width={1349}
                height={550}
                series={[30,16,25,29,14,8,8,4]}     
                            
                options={{
                    height: 180,
                    width: "100%",
                    dataLabels: {
                         enabled: true,
                         style: {
                           fontSize: "26px",
                           fontFamily: "Poppins",
                           fontWeight: "bold"
                         }
                       },plotOptions: {
                        pie: {
                          dataLabels: {
                            offset: -50,
                          }, 
                        }
                      },
                       legend: {
                        fontSize: "26px",
                        labels: {
                            colors: "white",
                            
                        }
                      },
                    labels:["Lung Cancer","Blood Cancer", "Liver Cancer", "Skin Cancer", "Kidney and Urinary Bladder Cancer","Oral Cancer","Ovarian and Breast Cancer","Others"]                  

                 }}
                
                >
                </Chart>
            </div>
            </div>
    );
}


export default DataAnalysis