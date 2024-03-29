import React, { useState, useEffect } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import Button from 'react-bootstrap/Button';
import AddStudentModal from './components2/AddStudentModal';
import { openDB, getAllStudents, saveStudentToDB } from '../indexedDB';
import { Route, Routes, useNavigate } from 'react-router-dom';
import StudentDetails from './StudentDetails';

import '../css/students.css';
import { GlobalFilter } from './components2/GlobalFilter';

function Students() {
  const [students, setStudents] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID Number',
        accessor: 'idNumber',
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Strand',
        accessor: 'strand',
      },
      {
        Header: 'Grade & Section',
        accessor: 'gradeSection',
        Cell: ({ row }) => {
          return `${row.original.gradeLevel} - ${row.original.section}`;
        },
      },
    ],
    []
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);
  

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddStudent = async (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);

    const db = await openDB();
    await saveStudentToDB(db, newStudent);

    closeModal();
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data: students }, useGlobalFilter);

  const { globalFilter } = state

  const initializeDB = async () => {
    const db = await openDB();
    const students = await getAllStudents(db);
    setStudents(students);
  };

  useEffect(() => {
    initializeDB();
  }, []);

const navigate = useNavigate();

const handleRowClick = (student) => {
  navigate(`/students/${student.idNumber}`, { state: { student } });
};

  return (
      <div className='students-container'>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className='student-list-container'>
        <div className='student-list-header'>
          <h2>Students List</h2>    
          <Button onClick={openModal}>Add Student</Button>
        </div>

        <table {...getTableProps()} className="students-table">
          <thead>
            {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
            ))}
            </thead>

            <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} onClick={() => handleRowClick(row.original)}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        <AddStudentModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          handleAddStudent={handleAddStudent}
        />
      </div>

    </div>
  );
}

export default Students;
