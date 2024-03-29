
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import '../css/studentdetails.css'
import { openDB, getAllVisits } from '../indexedDB';

const StudentDetails = () => {
  const location = useLocation();
  const [visits, setVisits] = useState([]);
  const [filteredVisits, setFilteredVisits] = useState([]);
  const [student, setStudent] = useState(null);
  const [studentType, setStudentType] = useState('')

  useEffect(() => {
    let isMounted = true;

    const fetchVisits = async () => {
        const db = await openDB();
        const visitsData = await getAllVisits(db);

        if (isMounted) {
            setVisits(visitsData.reverse());
        }
    };

    fetchVisits();

    return () => {
        isMounted = false;
    };
}, []);


  useEffect(() => {
    const { state } = location;
    if (state && state.student) {
      setStudent(state.student);
      setStudentType('student');
    } else if (state && state.selectedStudent) {
      setStudent(state.selectedStudent)
      setStudentType('selectedStudent')

    }

}, [location]);

useEffect(() => {
    setFilteredVisits(visits.filter((visit) => visit.idNumber === student.idNumber));
  }, [visits, student]);


  if (!student) {
    return <div>Loading...</div>; 
  }


  return (
    <>
     <div className='details-container'>
        <div className='back-button-container'>
        { studentType === 'selectedStudent'?   <Link to = '/visits'className='back-button'>
                <IoMdArrowRoundBack /> Back to Visits
            </Link> : <Link to = '/students 'className='back-button'>
                <IoMdArrowRoundBack /> Back to Students List
            </Link>}
        </div>

        <div className='details-content'>

            <div className='details-header'>
                <h1>{student.firstName} {student.lastName}'s Profile</h1>
            </div>  

            <div className='details-body'>
                <p><strong>Name:</strong> {student.firstName} {student.lastName}</p>
                <p><strong>ID Number: </strong>{student.idNumber}</p>
                <p><strong>Date of Birth:</strong> {new Date(student.birthDate).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}</p>
                <p><strong>Gender:</strong> {student.gender}</p>
                <p><strong>Strand:</strong> {student.strand}</p>
                <p><strong>Grade Level:</strong> {student.gradeLevel}</p>
                <p><strong>Section:</strong> {student.section}</p>
                <p><strong>Contact Number:</strong> {student.contactNumber}</p>
            </div>  
        </div>

        <div className='visit-history-container'>
          <div className='visit-history-header'>
            <h2>Visit history</h2> 
            </div>
        <div className='visit-history-content'>
          {filteredVisits.map((visit) => {
            return (
                <div className='visit-history'>
                    <h4>{visit.visitDate}</h4>
                    <span>Symptoms: {visit.symptoms.join(', ')}</span>
                    <br></br>
                    <span>Treatments: {visit.treatments.join(', ')}</span>
                </div>
                )
            })}
            </div>
        
          </div>
    </div>

   
            
    </>
  );
};

export default StudentDetails;
