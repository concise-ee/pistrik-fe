import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { Autocomplete, TextField } from '@mui/material';
import { CompanySearchResult } from '../../utils/types';
import { fetchSearchByCompanyQuery } from '../../utils/delivery-requests';

interface Props {
  onSelect: (value: CompanySearchResult | null) => void;
}

const CustomAutocompleteCompany = ({ onSelect }: Props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<CompanySearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getResults = async (value: string) => {
    const result = await fetchSearchByCompanyQuery(value);
    if (result) {
      setOptions(result);
    }
    setLoading(false);
  };

  const debounceOnChange = useCallback(debounce(getResults, 300), []);

  const handleInputChange = (event: React.SyntheticEvent, newValue: string) => {
    setLoading(true);
    setInputValue(newValue);
    debounceOnChange(newValue);
  };

  const handleValueChange = (event: React.SyntheticEvent, newValue: CompanySearchResult | null) => {
    onSelect(newValue);
  };

  return (
    <Autocomplete
      clearOnBlur={false}
      options={options}
      loading={loading}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.reg_code === value.reg_code}
      filterOptions={(filteredOptions: CompanySearchResult[]) => filteredOptions}
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
          placeholder='Otsi juriidilist isikut'
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

export default CustomAutocompleteCompany;
