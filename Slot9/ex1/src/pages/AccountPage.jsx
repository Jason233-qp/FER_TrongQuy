import React, { useState } from 'react';
import { Container, ProgressBar, Button, Tab, Tabs } from 'react-bootstrap';
import AboutForm from '../components/Account/AboutForm';
import AccountForm from '../components/Account/AccountForm';
import AddressForm from '../components/Account/AddressForm';

const AccountPage = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handlePrevious = () => setStep((prev) => Math.max(prev - 1, 1));

  const progress = step === 1 ? 33 : step === 2 ? 67 : 100;

  return (
    <Container className="mt-4">
      <h3 className="mb-3">🛠️ Build Your Profile</h3>
      <ProgressBar now={progress} label={`${progress}%`} className="mb-4" />

      <Tabs activeKey={step} onSelect={(k) => setStep(Number(k))} className="mb-3">
        <Tab eventKey={1} title="👤 About">
          <AboutForm />
          <div className="d-flex justify-content-end mt-3">
            <Button disabled>Previous</Button>
            <Button variant="primary" className="ms-2" onClick={handleNext}>
              Next
            </Button>
          </div>
        </Tab>

        <Tab eventKey={2} title="🔒 Account">
          <AccountForm />
          <div className="d-flex justify-content-between mt-3">
            <Button onClick={handlePrevious}>Previous</Button>
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          </div>
        </Tab>

        <Tab eventKey={3} title="📍 Address">
          <AddressForm />
          <div className="d-flex justify-content-between mt-3">
            <Button onClick={handlePrevious}>Previous</Button>
            <Button variant="success">Finish</Button>
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AccountPage;