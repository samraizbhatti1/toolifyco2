import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Card, Modal, ProgressBar } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BudgetPlanner.css';

const BudgetPlanner = () => {
  const [incomeSources, setIncomeSources] = useState([{ description: '', amount: '' }]);
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Miscellaneous');
  const [isRecurring, setIsRecurring] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [savingsGoal, setSavingsGoal] = useState('');
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [balance, setBalance] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleAddIncomeSource = () => {
    setIncomeSources([...incomeSources, { description: '', amount: '' }]);
  };

  const handleIncomeChange = (index, field, value) => {
    const updatedSources = [...incomeSources];
    updatedSources[index][field] = field === 'amount' ? parseFloat(value) : value;
    setIncomeSources(updatedSources);
    calculateTotals(updatedSources, expenses);
  };

  const handleAddExpense = () => {
    const expense = {
      description: expenseDescription,
      amount: parseFloat(expenseAmount),
      category: expenseCategory,
      recurring: isRecurring,
    };

    if (editIndex !== null) {
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = expense;
      setExpenses(updatedExpenses);
      setEditIndex(null);
    } else {
      setExpenses([...expenses, expense]);
    }

    setExpenseDescription('');
    setExpenseAmount('');
    setExpenseCategory('Miscellaneous');
    setIsRecurring(false);
    calculateTotals(incomeSources, [...expenses, expense]);
    setShowModal(false);
  };

  const handleEditExpense = (index) => {
    const expense = expenses[index];
    setExpenseDescription(expense.description);
    setExpenseAmount(expense.amount);
    setExpenseCategory(expense.category);
    setIsRecurring(expense.recurring);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    calculateTotals(incomeSources, updatedExpenses);
  };

  const calculateTotals = (updatedIncomeSources, updatedExpenses) => {
    const totalIncome = updatedIncomeSources.reduce((sum, source) => sum + (source.amount || 0), 0);
    const totalExpenses = updatedExpenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
    setTotalIncome(totalIncome);
    setTotalExpenses(totalExpenses);
    setBalance(totalIncome - totalExpenses);
  };

  const exportData = () => {
    const data = expenses.map(expense => ({
      Description: expense.description,
      Amount: expense.amount,
      Category: expense.category,
      Recurring: expense.recurring ? 'Yes' : 'No',
    }));
    const csvContent = [
      ['Description', 'Amount', 'Category', 'Recurring'],
      ...data.map(row => Object.values(row)),
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'budget_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const data = {
    labels: expenses.map(expense => expense.category),
    datasets: [
      {
        label: 'Expenses by Category',
        data: expenses.map(expense => expense.amount),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
      },
    ],
  };

  return (
    <Container fluid className="my-5">
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="p-4 shadow bg-light text-dark">
            <Card.Title className="text-center mb-4">
              <strong>Advanced Budget Planner</strong>
            </Card.Title>

            <Form>
              <Form.Label>Monthly Income</Form.Label>
              {incomeSources.map((source, index) => (
                <Row key={index}>
                  <Col md={5}>
                    <Form.Group controlId={`incomeDescription-${index}`}>
                      <Form.Control
                        type="text"
                        value={source.description}
                        onChange={(e) => handleIncomeChange(index, 'description', e.target.value)}
                        placeholder="Income Source Description"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={5}>
                    <Form.Group controlId={`incomeAmount-${index}`}>
                      <Form.Control
                        type="number"
                        value={source.amount}
                        onChange={(e) => handleIncomeChange(index, 'amount', e.target.value)}
                        placeholder="Amount"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              ))}
              <Button className="mt-3" onClick={handleAddIncomeSource}>
                Add Income Source
              </Button>

              <Form.Group controlId="formSavingsGoal" className="mt-3">
                <Form.Label>Savings Goal</Form.Label>
                <Form.Control
                  type="number"
                  value={savingsGoal}
                  onChange={(e) => setSavingsGoal(parseFloat(e.target.value) || '')}
                  placeholder="Enter your savings goal"
                />
              </Form.Group>

              <Button className="button-add mt-3" onClick={() => setShowModal(true)}>
                Add Expense
              </Button>
            </Form>

            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Recurring</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={index} className="table-row">
                    <td>{expense.description}</td>
                    <td>${expense.amount.toFixed(2)}</td>
                    <td>{expense.category}</td>
                    <td>{expense.recurring ? 'Yes' : 'No'}</td>
                    <td>
                      <Button variant="warning" className="button-edit" onClick={() => handleEditExpense(index)}>
                        Edit
                      </Button>
                      <Button variant="danger" className="button-delete" onClick={() => handleDeleteExpense(index)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Row className="mt-4">
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Total Income</Card.Title>
                    <Card.Text>${totalIncome.toFixed(2)}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Total Expenses</Card.Title>
                    <Card.Text>${totalExpenses.toFixed(2)}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Balance</Card.Title>
                    <Card.Text>${balance.toFixed(2)}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Savings Goal</Card.Title>
                    <Card.Text>${savingsGoal ? savingsGoal.toFixed(2) : '0.00'}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Savings Achieved</Card.Title>
                    <ProgressBar
                      now={(totalIncome - totalExpenses) / (savingsGoal || 1) * 100}
                      label={`${((totalIncome - totalExpenses) / (savingsGoal || 1) * 100).toFixed(2)}%`}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Expense Categories</Card.Title>
                    <Pie data={data} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Button className="button-export mt-4" onClick={exportData}>
              Export Data as CSV
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Add Expense</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group controlId="formExpenseDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={expenseDescription}
                    onChange={(e) => setExpenseDescription(e.target.value)}
                    placeholder="Enter expense description"
                  />
                </Form.Group>

                <Form.Group controlId="formExpenseAmount" className="mt-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(parseFloat(e.target.value) || '')}
                    placeholder="Enter expense amount"
                  />
                </Form.Group>

                <Form.Group controlId="formExpenseCategory" className="mt-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value)}
                  >
                    <option value="Groceries">Groceries</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Transport">Transport</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formRecurring" className="mt-3">
                  <Form.Check
                    type="checkbox"
                    label="Recurring Expense"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleAddExpense}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BudgetPlanner;



