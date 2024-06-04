import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, Card, Container, Grid, Typography } from '@mui/material';
import { Check } from '@mui/icons-material';
import { Address } from '../utils/types';
import { getHistoricForAddress } from '../utils/delivery-requests';

const AddressDetailView = () => {
  const { id } = useParams();
  const [addressData, setAddressData] = useState<Address[]>([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    if (!id) return;
    const fetchedHistoricData = await getHistoricForAddress(+id);
    if (fetchedHistoricData) {
      setAddressData(fetchedHistoricData);
    }
  };

  const activeAddressView = () => {
    const activeAddresses = addressData.filter((address) => address.active);
    if (!activeAddresses || activeAddresses.length !== 1) return;

    const activeAddress = activeAddresses[0];
    return addressGrid(activeAddress, true);
  };

  const historicAddressViews = () => {
    const historicAddresses = addressData.filter((address) => !address.active);
    if (!historicAddresses) return;

    return historicAddresses.map((address) => addressGrid(address, false));
  };

  const addressGrid = (address: Address, isActive: boolean) => (
    <Grid item>
      <Card sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {isActive ? (
            <Grid item xs={12}>
              <Typography sx={{ alignItems: 'center' }}>
                <Check color='success' />
                <strong>Aktiivne</strong>
              </Typography>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Typography>
              <strong>Täisaadress: </strong>
              {address.taisaadress}
            </Typography>
          </Grid>
          <Grid item container direction='row' xs={12}>
            <Grid item xs={6}>
              <Typography>
                <strong>Maakond: </strong>
                {address.maakond}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Maakonna ehak kood: </strong>
                {address.ehakmk}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction='row' xs={12}>
            <Grid item xs={6}>
              <Typography>
                <strong>Omavalitsus: </strong>
                {address.omavalitsus}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Omavalitsuse ehak kood: </strong>
                {address.ehakov}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction='row' xs={12}>
            <Grid item xs={6}>
              <Typography>
                <strong>Asustusüksus: </strong>
                {address.asustusyksus}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Asustusüksuse ehak kood: </strong>
                {address.ehak}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction='row' xs={12}>
            <Grid item xs={6}>
              <Typography>
                <strong>Aadress: </strong>
                {address.aadresstekst}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Aadressi number: </strong>
                {address.aadress_nr}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction='row' xs={12}>
            <Grid item xs={6}>
              <Typography>
                <strong>Aadressi id: </strong>
                {address.adr_id}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Koodaadress: </strong>
                {address.koodaadress}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction='row' xs={12}>
            <Grid item xs={6}>
              <Typography>
                <strong>Viitepunkt x: </strong>
                {address.viitepunkt_x}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Viitepunkt y: </strong>
                {address.viitepunkt_y}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction='row' xs={12}>
            <Grid item xs={6}>
              <Typography>
                <strong>ADS OID: </strong>
                {address.ads_oid}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>ADOB ID: </strong>
                {address.adob_id}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{ height: 'calc(100vh - 80px)', maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
      <Container maxWidth='md' sx={{ pt: 2, width: '100%', height: '100%' }}>
        <Grid container spacing={2}>
          {activeAddressView()}
          {historicAddressViews()}
        </Grid>
      </Container>
    </Box>
  );
};
export default AddressDetailView;
