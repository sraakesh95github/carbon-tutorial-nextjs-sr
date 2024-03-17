'use client';

import React, { useEffect, useState } from 'react';
import { FileUploader, Dropdown, Button, Grid, Column } from '@carbon/react';
// import { useNavigate } from 'react-router-dom';
import Link from 'next/link';
// import { useRouter } from 'next/router';

export default function SignalIntegrityVerification() {
  // Define the options for your Dropdown component
  //   var ecuOptions = [
  //     { id: 'option-1', label: 'BCM' },
  //     // Add other ECU options here
  //   ];

  const [selectedEngine, setSelectedEngine] = useState('Test Engine');

  const [ecuOptions, setEcuOptions] = useState([
    { id: 'option-1', label: 'Test' },
    { id: 'option-2', label: 'BCM' },
  ]);

  const [messageOptions, setMessageOptions] = useState([
    { id: 'option-1', label: 'Test Message' },
    { id: 'option-2', label: 'BCM Message' },
  ]);

  var selectedMessage = '';

  // const navigate = useNavigate();

  // const beginAnalysis = () => {
  //   const router = useRouter();
  //   router.push('/results');
  //   // Navigate to ResultsPage after analysis
  //   // navigate('/results');
  // };

  const getEngine = (event) => {
    setSelectedEngine(event.selectedItem.label);

    let newMessageOptions = []; // Initialize outside of the forEach loop

    ecuOptions.forEach((item) => {
      if (item.label === event.selectedItem.label) {
        newMessageOptions = item.message_ids.map((message, index) => ({
          id: `option-${index}`,
          label: message,
        }));
      }
    });

    setMessageOptions(newMessageOptions);
  };

  async function messageDropdown(event) {
    selectedMessage = event.selectedItem.label;
  }

  async function handleUpload(event) {
    const file = event.target.files[0]; // Get the file from the event
    if (file) {
      // Call your upload function
      uploadFile(file).catch(console.error);
    }
  }

  async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://127.0.0.1:8000/upload-csv/', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      const newEcuOptions = data.response.map((engine_details, index) => ({
        id: `option-${index}`,
        label: engine_details.engine_id,
        message_ids: engine_details.message_ids,
      }));

      setEcuOptions(newEcuOptions);

      console.log(data);
      console.log(ecuOptions);
    }
  }

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
              onChange={handleUpload}
              accept={['.csv']}
            />
          </div>
          <div className="ecu-dropdown">
            <Dropdown
              id="ecu-dropdown"
              label="Select ECU"
              titleText="Select ECU"
              helperText=""
              items={ecuOptions}
              onChange={getEngine}
              itemToString={(item) => (item ? item.label : '')}
            />
          </div>

          <div className="ecu-dropdown">
            <Dropdown
              id="message-dropdown"
              label="Select trigger message"
              titleText="Select Message"
              helperText=""
              onChange={messageDropdown}
              items={messageOptions}
              itemToString={(item) => (item ? item.label : '')}
            />
          </div>

          <div className="analysis-section">
            <Link href="/results">
              <Button
              // onClick={beginAnalysis}
              >
                Begin Analysis
              </Button>
            </Link>
          </div>
        </div>
      </Column>
    </Grid>
  );
}
