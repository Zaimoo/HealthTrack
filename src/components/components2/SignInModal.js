import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { openDB, STORE_NAME, VISITS_STORE_NAME } from '../../indexedDB';

const symptomsOptions = [
  'Headache',
  'Cold',
  'Cough',
  'Tooth Ache',
  'Nausea',
  'Lower Abdomen Cramps',
  'Sprains',
  "Jammed Fingers/Twisted Wrists",
  "Vomit",
  "Cuts/Scrapes"
];

const SignInModal = ({ modalIsOpen, closeModal }) => {
  const [idNumber, setIdNumber] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [treatments, setTreatments] = useState([]); 

  const submit = async () => {
    try {
      const db = await openDB();
      const student = await getStudentByIdNumber(db, idNumber);

      if (student) {
        const visit = {
          idNumber: student.idNumber,
          firstName: student.firstName,
          lastName: student.lastName,
          strand: student.strand,
          grade: student.gradeLevel,
          section: student.section,
          symptoms: symptoms,
          visitDate: new Date(Date.now()).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
          }),
          treatments: treatments,
        };

        await saveVisitToDB(db, visit);
        closeModal();
      } else {
        alert("Student not found!");
      }
    } catch (error) {
      console.error("Error opening or accessing the database:", error);
    }
  };

  return (
    <Modal show={modalIsOpen} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formIdNumber">
            <Form.Label>Enter ID Number:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the ID"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formSymptoms" className="mb-2">
            <Form.Label>Symptoms:</Form.Label>
            {symptoms.map((symptom, index) => (
              <div key={index} className="d-flex mb-2">
                <Form.Control
                  as="select"
                  value={symptom}
                  onChange={(e) => {
                    const updatedSymptoms = [...symptoms];
                    updatedSymptoms[index] = e.target.value;
                    setSymptoms(updatedSymptoms);
                  }}
                >
                  <option value="" disabled>Select a symptom</option>
                  {symptomsOptions.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Control>
                <Button
                  variant="outline-danger"
                  className="ml-2"
                  onClick={() => {
                    const updatedSymptoms = [...symptoms];
                    updatedSymptoms.splice(index, 1);
                    setSymptoms(updatedSymptoms);
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
            <br></br>
            <Button
              variant="outline-primary"
              onClick={() => setSymptoms([...symptoms, ""])}
            >
              Add Symptom
            </Button>
          </Form.Group>

          <Form.Group controlId="formTreatments" className="mb-2">
            <Form.Label>Treatments:</Form.Label>
            {treatments.map((treatment, index) => (
              <div key={index} className="d-flex mb-2">
                <Form.Control
                  type="text"
                  placeholder="Enter the treatment"
                  value={treatment}
                  onChange={(e) => {
                    const updatedTreatments = [...treatments];
                    updatedTreatments[index] = e.target.value;
                    setTreatments(updatedTreatments);
                  }}
                />
                <Button
                  variant="outline-danger"
                  className="ml-2"
                  onClick={() => {
                    const updatedTreatments = [...treatments];
                    updatedTreatments.splice(index, 1);
                    setTreatments(updatedTreatments);
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
            <br />
            <Button
              variant="outline-primary"
              onClick={() => setTreatments([...treatments, ""])}
            >
              Add Treatment
            </Button>
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={submit}>
          Submit
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


  export async function getStudentByIdNumber(db, idNumber) {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.get(idNumber);
  
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        const student = event.target.result;
        console.log('Retrieved student:', student); // Add this line for debugging
        resolve(student || null);
      };
  
      request.onerror = (event) => {
        console.error('Error retrieving student:', event.target.error); // Add this line for debugging
        reject(event.target.error);
      };
    });
  }
  
  
async function saveVisitToDB(db, visit) {
    const transaction = db.transaction(VISITS_STORE_NAME, 'readwrite');
    const objectStore = transaction.objectStore(VISITS_STORE_NAME);
    const request = objectStore.add(visit);
  
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
  
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }



export default SignInModal;