import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useTable } from 'react-table';
import { getAllVisits, openDB } from '../indexedDB';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SignInModal from './components2/SignInModal';
import ClinicVisitsCard from './components2/clinicVisitsCard';
import '../css/dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [visits, setVisits] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
