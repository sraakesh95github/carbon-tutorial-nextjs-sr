'use client';

import React, { useEffect, useState } from 'react';
import {
  FileUploader,
  Dropdown,
  Button,
  Grid,
  Column,
  TextArea,
  ProgressBar,
} from '@carbon/react';
// import { useNavigate } from 'react-router-dom';
// import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ResultsPage from '../results/page';

export default function SignalIntegrityVerification() {
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [testResponse, setTestResponse] = useState(false);
  const [ecuOptions, setEcuOptions] = useState([
    { id: 'option-1', label: 'Test' },
    { id: 'option-2', label: 'BCM' },
  ]);
  const [messageOptions, setMessageOptions] = useState([
    { id: 'option-1', label: 'Test Message' },
    { id: 'option-2', label: 'BCM Message' },
  ]);
  const [selectedEngine, setSelectedEngine] = useState('Test Engine');

  const router = useRouter();

  var selectedMessage = '';
  var resultString = 'NOT STARTED';

  const getEngine = (event) => {
    let newMessageOptions = []; // Initialize outside of the forEach loop
    setSelectedEngine(event.selectedItem.label);

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

  const navToHome = () => {
    router.push('/');
    setShowResults(false);
    console.log('navToHom called');
  };

  const goToResultsPage = () => {
    router.push('/results');
    console.log('Tried router push');
  };

  async function triggerAnalysis() {
    sendPICORequest();
  }

  async function sendPICORequest() {
    const request_url = 'http://127.0.0.1:8000/trigger/';

    try {
      console.log('Loading set to true');
      setLoading(true);
      console.log(selectedMessage);

      const response = await fetch(request_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ my_msg: selectedMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        resultString = data.response;
        console.log('Loading set back to false with response ok');

        // goToResultsPage();
        setShowResults(true);
        console.log('showResults set to true');
        console.log('Results string: ' + resultString);

        if (resultString == 'PASSED') {
          console.log('Test response set to true');
          setTestResponse(true);
        } else {
          console.log('Test response set to false');
          setTestResponse(false);
        }

        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      console.log('Loading set back to false with finally');
      setLoading(false); // Stop loading regardless of the outcome
    }
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

    const request_url = 'http://127.0.0.1:8000/upload-csv/';

    const response = await fetch(request_url, {
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
    <div>
      {loading ? (
        <ProgressBar label="Performing test..." size="big" />
      ) : showResults ? (
        <div>
          <ResultsPage engine_id={selectedEngine} testResponse={testResponse} />
          <div className="Buttons">
            <Button onClick={navToHome} kind="primary">
              Back
            </Button>
          </div>
        </div>
      ) : (
        <Grid className="landing-page" fullWidth>
          <Column lg={16} md={8} sm={4} className="landing-page__banner">
            <div className="container">
              <>
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
                  {/* <Link href="/results"> */}
                  <Button onClick={triggerAnalysis}>Begin Analysis</Button>
                  {/* </Link> */}
                </div>
              </>
            </div>{' '}
          </Column>
        </Grid>
      )}
    </div>
  );
}
