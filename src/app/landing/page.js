'use client';

import React from 'react';
import { FileUploader, Dropdown, Button, Grid, Column } from '@carbon/react';

function SignalIntegrityVerification() {
  // Define the options for your Dropdown component
  const ecuOptions = [
    { id: 'option-1', label: 'BCM' },
    // Add other ECU options here
  ];

  return (
    <Grid className="landing-page" fullWidth>
      <Column lg={16} md={8} sm={4} className="landing-page__banner">
        <div className="container">
          <header className="header">
            <img src="/ford-logo.png" alt="Ford Logo" />
            <h1>Signal Integrity Verification</h1>
          </header>
          <div className="upload-section">
            <h2>Upload VUT file</h2>
            <p>Max file size is 500kb. Supported file type is .csv</p>
            <FileUploader
              buttonLabel="Upload"
              filenameStatus="edit"
              iconDescription="Clear file"
            />
          </div>
          <div className="ecu-dropdown">
            <Dropdown
              id="ecu-dropdown"
              label="Select ECU"
              titleText="Select ECU"
              helperText=""
              items={ecuOptions}
              itemToString={(item) => (item ? item.label : '')}
            />
          </div>
          <div className="analysis-section">
            <Button>Begin Analysis</Button>
          </div>
        </div>
      </Column>
    </Grid>
  );
}

export default SignalIntegrityVerification;
