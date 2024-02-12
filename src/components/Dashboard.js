import React, { useState, useEffect } from 'react';
import { parse } from 'date-fns';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTable } from 'react-table';
import { getAllVisits, openDB } from '../indexedDB';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import SignInModal from './components2/SignInModal';
import ClinicVisitsCard from './components2/clinicVisitsCard';
import '../css/dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [visits, setVisits] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  let numberOfClinicVisits;

  useEffect(() => {
    const fetchVisits = async () => {
      const db = await openDB();
      const visitsData = await getAllVisits(db);
      setVisits(visitsData.reverse());
    };

    fetchVisits();
  }, [visits]);

  const generateSymptomsData = (visits) => {
    const symptomsCount = {};
    visits.forEach((visit) => {
      visit.symptoms.forEach((symptom) => {
        symptomsCount[symptom] = (symptomsCount[symptom] || 0) + 1;
      });
    });

    return Object.keys(symptomsCount).map((symptom) => ({
      name: symptom,
      value: symptomsCount[symptom],
    }));
  };


  const symptomsData = generateSymptomsData(visits);

  const generateSectionsData = (visits, selectedMonth) => {
    const sectionsCount = {};
    
    // List of all sections
    const allSections = [
      "St. Augustine", "St. Dominic", "St. Ignatius of Loyola",
      "St. John Vianney", "St. Matthew", "St. Paul",
      "St. Francis of Assisi", "St. Francis Xavier",
      "St. Thomas Aquinas", "St. Elizabeth", "St. Therese of the Child Jesus",
      "Our Lady of Assumption", "Our Lady of Immaculate Conception", "Our Lady of Fatima",
      "Our Lady of Guadalupe", "Our Lady of Lourdes",
      "St. John", "St. Luke", "St. Lucy", "St. Maria Goretti"
    ];
  
    visits.forEach((visit) => {
      const visitDate = parse(visit.visitDate, "MMMM dd, yyyy 'at' hh:mm:ss a", new Date());
      const visitMonth = visitDate.toLocaleString('en-US', { month: 'long' });
  
      if (!selectedMonth || visitMonth === selectedMonth) {
        const section = visit.section;
        sectionsCount[section] = (sectionsCount[section] || 0) + 1;
      }
    });
  
    // Include all sections in the result, even if they have no visits
    const sectionsData = allSections.map((section) => ({
      name: section,
      value: sectionsCount[section] || 0,
    }));
  
    return sectionsData;
  };
  
  

  const sectionsData = generateSectionsData(visits, selectedMonth);

  numberOfClinicVisits = visits.length;

  const openModal = (id) => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSignIn = () => {
    closeModal();
  };

  const handleDateChange = (month) => {
    setSelectedMonth(month);
  };


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
          return `${row.original.grade} - ${row.original.section}`;
        },
      },
      {
        Header: 'Symptoms',
        accessor: 'symptoms',
        Cell: ({ value }) => {
          return value ? value.join(', ') : '';
        },
      },
      {
        Header: 'Visit Date',
        accessor: 'visitDate',
      },
    ],
    []
  );
  

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: visits });

  return (
    <>
      <div className="dashboard-container">
        <h1>Dashboard</h1>

        <div className="card-graph-container">
        <ClinicVisitsCard visits={visits} />

        
          <div className="symptoms-graph-container">
            <div className="symptoms-graph-header">
              <h2> Symptoms Graph</h2>
            </div>


            <div className="symptoms-graph">
              <ResponsiveContainer width="95%" height={400}>
                <BarChart data={symptomsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" allowDecimals= {false}  />
                  <YAxis dataKey="name" type="category" width={200}  />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="monthly-report-container">
            <div className="monthly-report-header">
              <h2> Monthly Report</h2>
              <div className="filter-dropdown">
                <Dropdown onSelect={(month) => handleDateChange(month)}>
                  <Dropdown.Toggle variant="primary" id="dropdown-date">
                    {selectedMonth? selectedMonth: 'Select Month'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="January">January</Dropdown.Item>
                    <Dropdown.Item eventKey="February">February</Dropdown.Item>
                    <Dropdown.Item eventKey="March">March</Dropdown.Item>
                    <Dropdown.Item eventKey="April">April</Dropdown.Item>
                    <Dropdown.Item eventKey="May">May</Dropdown.Item>
                    <Dropdown.Item eventKey="June">June</Dropdown.Item>
                    <Dropdown.Item eventKey="July">July</Dropdown.Item>
                    <Dropdown.Item eventKey="August">August</Dropdown.Item>
                    <Dropdown.Item eventKey="September">September</Dropdown.Item>
                    <Dropdown.Item eventKey="October">October</Dropdown.Item>
                    <Dropdown.Item eventKey="November">November</Dropdown.Item>
                    <Dropdown.Item eventKey="December">December</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="monthly-report">
              <ResponsiveContainer width="95%" height={400} margin={{ left: 50, right: 50 }}>
              <BarChart width={730} height={250} data={sectionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" type="category" height={100} angle={-30} tick={{fontSize: 13}} textAnchor="end" />
                <YAxis dataKey="value" fill="#8884d8"/>
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill='#8884d8'/>
              </BarChart>
              </ResponsiveContainer>
              </div>
            </div>
          </div>


        <div className="recent-visits-container">
          <div className="recent-visits-header">
            <h2>Recent Visits</h2>
            <Button onClick={() => openModal()}>Sign In</Button>
          </div>
          <div>
          <p>Total Visits: {numberOfClinicVisits}</p>

          </div>
          <div className="table-container">
            <table {...getTableProps()} className="patient-table">
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
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <SignInModal modalIsOpen={modalIsOpen} closeModal={closeModal} submit={handleSignIn} />
      </div>
    </>
  );
};

export default Dashboard;
