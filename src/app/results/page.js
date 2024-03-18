'use client';

import React, { useState, useEffect } from 'react';
import { Button, TextArea } from '@carbon/react';
// Make sure to create this SCSS file

export default function ResultsPage(props) {
  // State and handlers would go here

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 3600000); // Update the date every second

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="signal-integrity-verification">
      <div className="logo-header">
        <img src="/ford-logo.png" alt="Ford Logo" />
        <h1>Signal Integrity Verification</h1>
      </div>

      {props.testResponse ? (
        <div>
          <div className="results-pass">
            <div className="status-pass">Pass</div>
            <div className="status-description">
              The ECU has passed all testing criteria.
            </div>
          </div>
          <div className="test-details">
            <p>Testing User: Test User</p>
            <p>Test Date: {currentDateTime.toLocaleString()}</p>
            <p>VUT: P708N</p>
            <p>Tested ECU: {props.engine_id}</p>
            <p>
              Waveform:{' '}
              <a href="https://azureford.sharepoint.com/">
                sharepoint placeholder for testing
              </a>
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="results-fail">
            <div className="status-pass">Fail</div>
            <div className="status-description">
              The ECU has failed some testing criteria.
            </div>
          </div>
          <div className="test-details">
            <p>Testing User: Test User</p>
            <p>Test Date: {currentDateTime.toLocaleString()}</p>
            <p>VUT: P708N</p>
            <p>Tested ECU: {props.engine_id}</p>
            <p>
              Waveform:{' '}
              <a href="https://azureford.sharepoint.com/">
                sharepoint placeholder for testing
              </a>
            </p>
          </div>
        </div>
      )}

      <TextArea
        labelText="Comments"
        placeholder="Enter your comments here"
        id="test-comments"
        className="comments-textarea"
      />

      <div className="buttons">
        <Button kind="primary">Download Log</Button>
        <Button kind="secondary">Abandon Log</Button>
      </div>
    </div>
  );
}
