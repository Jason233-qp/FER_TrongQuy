import React from 'react';
import { Container, Card } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import PaymentTable from '../components/PaymentTable';
import { PaymentProvider } from '../contexts/PaymentContext';

const DashboardPage = () => {
  return (
    <PaymentProvider>
      <NavigationHeader />
      <Container>
        <FilterBar />
        <Card className="shadow-sm">
          <Card.Header as="h5">Dashboard Overview</Card.Header>
          <Card.Body>
            <PaymentTable />
          </Card.Body>
        </Card>
      </Container>
    </PaymentProvider>
  );
};

export default DashboardPage;
