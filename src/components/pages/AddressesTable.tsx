import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, ButtonBase, Container, Grid, LabelDisplayedRowsArgs, Paper, styled, Tooltip } from '@mui/material';
import { Edit, History } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Address } from '../utils/types';
import { getAllActiveAddresses, updateAddress } from '../utils/delivery-requests';

const columns = (onClickUpdate: (id: number) => void, onClickView: (id: number) => void): GridColDef[] => [
  {
    field: 'taisaadress',
    headerName: 'Täisaadress',
    flex: 6,
    minWidth: 120,
  },
  {
    field: '',
    headerName: '',
    flex: 1,
    minWidth: 60,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Grid container spacing={1}>
        <Grid item>
          <Tooltip title='Kuva aadressi ajalugu'>
            <ButtonBase>
              <History color='primary' onClick={() => onClickView(params.row.id)} />
            </ButtonBase>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title='Uuenda aadressi ADS-ist'>
            <ButtonBase>
              <Edit color='primary' onClick={() => onClickUpdate(params.row.id)} />
            </ButtonBase>
          </Tooltip>
        </Grid>
      </Grid>
    ),
  },
];
const StyledDataGridPaper = styled(Paper)({
  height: '100%',
  width: '100%',
  '& .MuiDataGrid-root': {
    border: 'none',
  },
  '& > .MuiDataGrid-columnSeparator': {
    visibility: 'hidden',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 600,
  },
  backgroundColor: 'rgba(0,0,0,0)',
});

const AddressesTable = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    const fetchedAddresses = await getAllActiveAddresses();
    if (fetchedAddresses) {
      setAddresses(fetchedAddresses);
    }
  };
  const onClickView = (id: number) => {
    navigate(`/addresses/${id}`);
  };

  const onClickUpdate = async (id: number) => {
    const newAddress = await updateAddress(id);
    if (newAddress === false) {
      toast.error('Viga uuendamisel.');
      return;
    }
    if (newAddress) {
      const filteredAddresses = addresses.filter((existingAddress) => existingAddress.id !== id);
      filteredAddresses.push(newAddress);
      filteredAddresses.sort((a, b) => {
        if (a.taisaadress < b.taisaadress) {
          return -1;
        }
        if (a.taisaadress > b.taisaadress) {
          return 1;
        }
        return 0;
      });
      setAddresses(filteredAddresses);
      toast.success('Uuendatud!');
      return;
    }
    toast.success('Andmed pole muutunud.');
  };

  return (
    <Box sx={{ height: 'calc(100vh - 80px)', maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
      <Container maxWidth='md' sx={{ pt: 2, width: '100%', height: '100%' }}>
        <Paper sx={{ width: '100%', height: '100%' }}>
          <StyledDataGridPaper>
            <DataGrid
              disableRowSelectionOnClick
              getRowId={(address: Address) => address.id}
              rows={addresses}
              columns={columns(onClickUpdate, onClickView)}
              slotProps={{
                pagination: {
                  labelRowsPerPage: 'Ridu lehel',
                  labelDisplayedRows: (paginationInfo: LabelDisplayedRowsArgs) =>
                    `näidatavad read tabelis: ${paginationInfo.from}-${paginationInfo.to} ridu kokku: ${paginationInfo.count}`,
                },
              }}
              localeText={{
                noRowsLabel: 'Andmed puuduvad',
              }}
            />
          </StyledDataGridPaper>
        </Paper>
      </Container>
    </Box>
  );
};
export default AddressesTable;
