// AddStudentModal.js

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddStudentModal = ({ modalIsOpen, closeModal, handleAddStudent }) => {
  const [idNumber, setIdNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setbirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [strand, setStrand] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [section, setSection] = useState('');

  const handleSubmit = async () => {
    const newStudent = {
      idNumber,
      firstName,
      lastName,
      birthDate,
      gender,
      gradeLevel,
      strand,
      section,
      contactNumber,
    };

    handleAddStudent(newStudent);

  };

  return (
    <Modal show={modalIsOpen} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formIdNumber'>
            <Form.Label>ID Number</Form.Label>
            <Form.Control
              className='mb-2'
              type='text'
              placeholder='Enter the ID Number'
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='formFirstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              className='mb-2'
              type='text'
              placeholder='Enter the First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='formLastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              className='mb-2'
              type='text'
              placeholder='Enter the Last Name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='formBirth'>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              className='mb-2'
              type='date'
              placeholder='Enter your date of birth'
              value={birthDate}
              onChange={(e) => setbirthDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='formGender'>
            <Form.Label>Gender</Form.Label>
            <Form.Select
              className='mb-2'
              onChange={(e) => setGender(e.target.value)}>
                <option>Select a Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </Form.Select>

          <Form.Group controlId='gradeLevel'>
          <Form.Label>Grade-Level</Form.Label>
          <Form.Control
              className='mb-2'
              type='text'
              placeholder='Enter your grade level'
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
            />
          </Form.Group>
          </Form.Group>
          <Form.Group controlId='formStrand'>
          <Form.Label>Strand</Form.Label>
          <Form.Select
            className='mb-2'
            value={strand}
            onChange={(e) => setStrand(e.target.value)}>
            <option>Select a Strand</option>
            <option value="STEM">STEM</option>
            <option value="HUMSS">HUMSS</option>
            <option value="ABM">ABM</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId='formSection'>
          <Form.Label>Section</Form.Label>
          <Form.Select
                className='mb-2'
                value={section}
                onChange={(e) => setSection(e.target.value)}>
                <option>Select a Section</option>
                <optgroup label="Grade 11 STEM">
                  <option value="St. Augustine">St. Augustine</option>
                  <option value="St. Dominic">St. Dominic</option>
                  <option value="St. Ignatius of Loyola">St. Ignatius of Loyola</option>
                  <option value="St. John Vianney">St. John Vianney</option>
                  <option value="St. Matthew">St. Matthew</option>
                  <option value="St. Paul">St. Paul</option>
                </optgroup>
                <optgroup label="Grade 11 HUMSS">
                  <option value="St. Francis of Assisi">St. Francis of Assisi</option>
                  <option value="St. Francis Xavier">St. Francis Xavier</option>
                </optgroup>
                <optgroup label="Grade 11 ABM">
                  <option value="St. Thomas Aquinas">St. Thomas Aquinas</option>
                  <option value="St. Elizabeth">St. Elizabeth</option>
                  <option value="St. Therese of the Child Jesus">St. Therese of the Child Jesus</option>
                </optgroup>
                <optgroup label="Grade 12 STEM">
                  <option value="Our Lady of Assumption">Our Lady of Assumption</option>
                  <option value="Our Lady of Immaculate Conception">Our Lady of Immaculate Conception</option>
                  <option value="Our Lady of Fatima">Our Lady of Fatima</option>
                  <option value="Our Lady of Guadalupe">Our Lady of Guadalupe</option>
                  <option value="Our Lady of Lourdes">Our Lady of Lourdes</option>
                </optgroup>
                <optgroup label="Grade 12 HUMSS">
                  <option value="St. John">St. John</option>
                  <option value="St. Luke">St. Luke</option>
                </optgroup>
                <optgroup label="Grade 12 ABM">
                  <option value="St. Lucy">St. Lucy</option>
                  <option value="St. Maria Goretti">St. Maria Goretti</option>
                </optgroup>
              </Form.Select>
            </Form.Group>

          <Form.Group controlId='formContactNumber'>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              className='mb-2'
              type='text'
              placeholder='Enter the Contact Number'
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant='secondary' onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddStudentModal;
