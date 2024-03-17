'use client';

import React from 'react';
import { Button, TextArea } from '@carbon/react';
// Make sure to create this SCSS file

export default function ResultsPage() {
  // State and handlers would go here

  return (
    <div className="signal-integrity-verification">
      <div className="logo-header">
        <img src="/ford-logo.png" alt="Ford Logo" />
        <h1>Signal Integrity Verification</h1>
      </div>

      <div className="results">
        <div className="status-pass">Pass</div>
        <div className="status-description">
          The ECU has passed all testing criteria.
        </div>
      </div>

      <div className="test-details">
        <p>Testing User: hford</p>
        <p>Test Date: June 16, 1903</p>
        <p>VUT: P708N</p>
        <p>Tested ECU: BCM</p>
        <p>
          Waveform:{' '}
          <a href="https://azureford.sharepoint.com/">
            https://azureford.sharepoint.com/
          </a>
        </p>
      </div>

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
