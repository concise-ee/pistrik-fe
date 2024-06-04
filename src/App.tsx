import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { styled } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import DeliveryNotePage from './components/pages/DeliveryNotePage';
import AddressesTable from './components/pages/AddressesTable';
import AddressDetailView from './components/pages/AddressDetailView';
import { ADDRESSES, NEW_WASTE_NOTE } from './components/configs/path-config';
import HeaderNavigationContainer from './components/header/HeaderNavigationContainer';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { darkGrey } from './muiTheme';
import 'react-toastify/dist/ReactToastify.css';

const StyledDivider = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main
        style={{
          height: '100%',
          display: 'flex',
        }}
      >
        <ToastContainer />
        <HeaderNavigationContainer />
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <StyledDivider />
          <div style={{ height: '100%', backgroundColor: darkGrey }}>
            <Routes>
              <Route path={NEW_WASTE_NOTE} element={<DeliveryNotePage />} />
              <Route path={ADDRESSES} element={<AddressesTable />} />
              <Route path={`${ADDRESSES}/:id`} element={<AddressDetailView />} />
            </Routes>
          </div>
        </div>
      </main>
    </Suspense>
  );
}

export default App;
