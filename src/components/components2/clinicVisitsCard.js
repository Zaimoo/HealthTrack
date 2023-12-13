
import React from 'react';

const ClinicVisitsCard = ({ visits }) => {
  const countStudentsByStrand = (strand) => {
    return visits.filter((visit) => visit.strand === strand).length;
  };

  const stemVisits = countStudentsByStrand('STEM');
  const humssVisits = countStudentsByStrand('HUMSS');
  const abmVisits = countStudentsByStrand('ABM');

  return (
    <div className='cards'>
      <div className="clinic-visits-card">
        <h3>STEM Students</h3>
        <p>Visits: {stemVisits}</p>
      </div>

      <div className="clinic-visits-card">
        <h3>ABM Students</h3>
        <p>Visits: {abmVisits}</p>
      </div>

      <div className="clinic-visits-card">
        <h3>HUMSS Students</h3>
        <p>Visits: {humssVisits}</p>
      </div>
    </div>
  );
};

export default ClinicVisitsCard;
