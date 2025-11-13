import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import TotalCard from '../components/TotalCard';
import AddExpense from '../components/AddExpense';
import FilterBar from '../components/FilterBar';
import ExpenseTable from '../components/ExpenseTable';
import Footer from '../components/Footer';
import { ExpenseProvider } from '../contexts/ExpenseContext';

const DashboardPage = () => {
  return (
    <ExpenseProvider>
      <NavigationHeader />
      <Container>
        <Card className="shadow-sm mb-4">
          <Card.Header as="h5">Personal Budget Dashboard</Card.Header>
          <Card.Body>
            <Row className="g-4">
              <Col md={4}>
                <TotalCard />
                <AddExpense />
              </Col>
              <Col md={8}>
                <FilterBar />
                <ExpenseTable />
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Footer />
      </Container>
    </ExpenseProvider>
  );
};

export default DashboardPage;