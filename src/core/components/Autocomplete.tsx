import { Autocomplete } from '@material-ui/core';
import { Paper } from '@material-ui/core';

const CustomAutocomplete = (props: any) => (
  <Autocomplete
    {...props}
    PaperComponent={(paperProps) => (
      <Paper
        {...paperProps}
        elevation={4}
        style={{
          border: '1px solid #ccc',
          boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
        }}
      />
    )}
  />
);

export default CustomAutocomplete;
