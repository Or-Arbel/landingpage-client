import React from 'react';
import SideNav from '../components/SideNav/SideNav';
import Data from '../components/Data/Data';

const UpdateData = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexFlow: 'column wrap',
        flexDirection: 'row',
      }}
    >
      <SideNav />
      <Data />
    </div>
  );
};

export default UpdateData;
