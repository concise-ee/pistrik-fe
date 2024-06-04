import React, { useState } from 'react';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { Address, CompanySearchResult, DeliveryNote } from '../utils/types';
import CustomAutocompleteAddress from './autocomplete/CustomAutocompleteAddress';
import CustomAutocompleteCompany from './autocomplete/CustomAutocompleteCompany';
import { sendDeliveryNoteSave } from '../utils/delivery-requests';

const DeliveryNotePage = () => {
  const [deliveryNote, setDeliveryNote] = useState<DeliveryNote>({});
  const cannotSave =
    deliveryNote.issuerCode == null ||
    deliveryNote.issuingAddress == null ||
    deliveryNote.delivererCode == null ||
    deliveryNote.receiverCode == null ||
    deliveryNote.receivingAddress == null ||
    deliveryNote.uuid != null;

  const saveDeliveryNote = async () => {
    if (cannotSave) return;
    const savedNote = await sendDeliveryNoteSave(deliveryNote);
    if (savedNote) {
      setDeliveryNote(savedNote);
      toast.success('Saatekiri edukalt salvestatud');
    }
  };

  const showDetailData = () => (
    <Grid item container spacing={1}>
      <Grid item container fontWeight={600}>
        Saatekiri salvestatud, saatekirja UUID: {deliveryNote.uuid}.
      </Grid>
      <Grid item container direction='row' xs={12} spacing={1}>
        <Grid item xs={12}>
          <Typography>
            <strong>Saatja aadress: </strong>
            {deliveryNote.issuingAddressFull}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <strong>Saatja registrikood: </strong>
            {deliveryNote.issuerCode}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <strong>Saatja nimi: </strong>
            {deliveryNote.issuerName}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction='row' xs={12} spacing={1}>
        <Grid item xs={6}>
          <Typography>
            <strong>Vedaja registrikood: </strong>
            {deliveryNote.delivererCode}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <strong>Vedaja nimi: </strong>
            {deliveryNote.delivererName}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction='row' xs={12} spacing={1}>
        <Grid item xs={12}>
          <Typography>
            <strong>Vastuvõtja aadress: </strong>
            {deliveryNote.receivingAddressFull}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <strong>Vastuvõtja registrikood: </strong>
            {deliveryNote.receiverCode}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <strong>Vastuvõtja nimi: </strong>
            {deliveryNote.receiverName}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ pt: 2, height: '100%' }}>
      <Container maxWidth='md' sx={{ display: 'flex' }}>
        <Paper>
          <Grid container spacing={5} padding={3}>
            <Grid item>
              <Typography sx={{ fontSize: 16, fontWeight: 600 }}>Uue saatekirja salvestamine</Typography>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item container direction='column' spacing={2}>
                <Grid item>
                  <Typography>Saatja andmed</Typography>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item lg={6} xs={12}>
                    <CustomAutocompleteCompany
                      onSelect={(company: CompanySearchResult | null) => {
                        if (company && company.reg_code)
                          setDeliveryNote({
                            ...deliveryNote,
                            issuerCode: company.reg_code.toString(),
                            issuerName: company.name.toString(),
                          });
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <CustomAutocompleteAddress
                      onSelect={(newAddress: Address | null) => {
                        if (newAddress) setDeliveryNote({ ...deliveryNote, issuingAddress: newAddress });
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container direction='column' spacing={2}>
                <Grid item>
                  <Typography>Vedaja andmed</Typography>
                </Grid>
                <Grid item xs={6}>
                  <CustomAutocompleteCompany
                    onSelect={(company: CompanySearchResult | null) => {
                      if (company && company.reg_code)
                        setDeliveryNote({
                          ...deliveryNote,
                          delivererCode: company.reg_code.toString(),
                          delivererName: company.name.toString(),
                        });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item container direction='column' spacing={2}>
                <Grid item>
                  <Typography>Vastuvõtja andmed</Typography>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item lg={6} xs={12}>
                    <CustomAutocompleteCompany
                      onSelect={(company: CompanySearchResult | null) => {
                        if (company && company.reg_code)
                          setDeliveryNote({
                            ...deliveryNote,
                            receiverCode: company.reg_code.toString(),
                            receiverName: company.name.toString(),
                          });
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <CustomAutocompleteAddress
                      onSelect={(newAddress: Address | null) => {
                        if (newAddress) setDeliveryNote({ ...deliveryNote, receivingAddress: newAddress });
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container>
              <Button disabled={cannotSave} onClick={saveDeliveryNote}>
                Salvesta
              </Button>
            </Grid>
            {deliveryNote.uuid ? showDetailData() : null}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default DeliveryNotePage;
