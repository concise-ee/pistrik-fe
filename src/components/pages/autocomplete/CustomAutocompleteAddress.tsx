import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { Autocomplete, TextField } from '@mui/material';
import { Address } from '../../utils/types';
import { fetchSearchByAddress } from '../../utils/delivery-requests';

interface Props {
  onSelect: (value: Address | null) => void;
}

const CustomAutocompleteAddress = ({ onSelect }: Props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getResults = async (value: string) => {
    const result = await fetchSearchByAddress(value);
    if (result && result.addresses) {
      setOptions(result.addresses);
    }
    setLoading(false);
  };

  const debounceOnChange = useCallback(debounce(getResults, 300), []);

  const handleInputChange = (event: React.SyntheticEvent, newValue: string) => {
    setLoading(true);
    setInputValue(newValue);
    debounceOnChange(newValue);
  };

  const handleValueChange = (event: React.SyntheticEvent, newValue: Address | null) => {
    onSelect(newValue);
  };

  return (
    <Autocomplete
      clearOnBlur={false}
      options={options}
      loading={loading}
      getOptionLabel={(option) => option.taisaadress}
      isOptionEqualToValue={(option, value) => option.tunnus === value.tunnus}
      filterOptions={(filteredOptions: Address[]) => filteredOptions}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleValueChange}
      loadingText='Laadimine'
      noOptionsText='Andmed puuduvad'
      renderInput={(params) => (
        <TextField
          {...params}
          size='small'
          fullWidth
          placeholder='Otsi aadressi'
          InputProps={{
            ...params.InputProps,
          }}
        />
      )}
      sx={{
        '& .MuiAutocomplete-endAdornment': {
          top: '50%',
        },
      }}
    />
  );
};

export default CustomAutocompleteAddress;
