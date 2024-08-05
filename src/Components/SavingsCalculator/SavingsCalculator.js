import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Table } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import Papa from 'papaparse';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const SavingsCalculator = () => {
    const [initialAmount, setInitialAmount] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const [annualContribution, setAnnualContribution] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [compoundingFrequency, setCompoundingFrequency] = useState('monthly');
    const [years, setYears] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);

    const calculateSavings = () => {
        setError('');
        setResult(null);
        setData([]);

        // Validate inputs
        if (!initialAmount || !monthlyContribution || !annualContribution || !interestRate || !years) {
            setError('Please fill out all fields');
            return;
        }

        const principal = parseFloat(initialAmount);
        const monthly = parseFloat(monthlyContribution);
        const annual = parseFloat(annualContribution);
        const rate = parseFloat(interestRate) / 100;
        const yearsCount = parseFloat(years);
        const periodsPerYear = getCompoundingPeriods(compoundingFrequency);
        
        if (isNaN(principal) || isNaN(monthly) || isNaN(annual) || isNaN(rate) || isNaN(yearsCount)) {
            setError('Please enter valid numbers');
            return;
        }

        // Calculate future value of savings
        const futureValue = calculateFutureValue(principal, monthly, annual, rate, periodsPerYear, yearsCount);
        setResult(futureValue);

        // Calculate data for chart and table
        const calculatedData = calculateData(principal, monthly, annual, rate, periodsPerYear, yearsCount);
        setData(calculatedData);
    };

    const getCompoundingPeriods = (frequency) => {
        switch (frequency) {
            case 'annually': return 1;
            case 'semi-annually': return 2;
            case 'quarterly': return 4;
            case 'monthly': return 12;
            case 'custom': return parseInt(document.getElementById('customFrequency').value) || 12;
            default: return 12;
        }
    };

    const calculateFutureValue = (principal, monthly, annual, rate, periodsPerYear, years) => {
        const totalPeriods = periodsPerYear * years;
        const monthlyRate = rate / periodsPerYear;
        const futureValue = principal * Math.pow(1 + monthlyRate, totalPeriods) +
            monthly * ((Math.pow(1 + monthlyRate, totalPeriods) - 1) / monthlyRate) +
            annual * ((Math.pow(1 + monthlyRate, totalPeriods) - 1) / monthlyRate);

        return futureValue.toFixed(2);
    };

    const calculateData = (principal, monthly, annual, rate, periodsPerYear, years) => {
        const periods = periodsPerYear * years;
        let balance = principal;
        const data = [];
        const labels = [];

        for (let i = 0; i <= periods; i++) {
            const currentYear = Math.floor(i / periodsPerYear);
            labels.push(`Year ${currentYear}`);
            const futureValue = calculateFutureValue(principal, monthly, annual, rate, periodsPerYear, currentYear);
            data.push(futureValue);
        }

        return { labels, data };
    };

    const exportToCSV = () => {
        const csvData = data.labels.map((label, index) => ({
            Year: label,
            Amount: data.data[index]
        }));

        Papa.unparse(csvData, {
            complete: (results) => {
                const csv = results.data.map(row => row.join(',')).join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'savings_calculator_results.csv';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        });
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="p-4 shadow bg-light text-dark">
                        <Card.Title className="text-center mb-4"><strong>Advanced Savings Calculator</strong></Card.Title>
                        <Form>
                            <Form.Group controlId="formInitialAmount">
                                <Form.Label>Initial Amount ($)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={initialAmount}
                                    onChange={(e) => setInitialAmount(e.target.value)}
                                    placeholder="Enter initial amount"
                                />
                            </Form.Group>
                            <Form.Group controlId="formMonthlyContribution" className="mt-3">
                                <Form.Label>Monthly Contribution ($)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={monthlyContribution}
                                    onChange={(e) => setMonthlyContribution(e.target.value)}
                                    placeholder="Enter monthly contribution"
                                />
                            </Form.Group>
                            <Form.Group controlId="formAnnualContribution" className="mt-3">
                                <Form.Label>Annual Contribution ($)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={annualContribution}
                                    onChange={(e) => setAnnualContribution(e.target.value)}
                                    placeholder="Enter annual contribution"
                                />
                            </Form.Group>
                            <Form.Group controlId="formInterestRate" className="mt-3">
                                <Form.Label>Annual Interest Rate (%)</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                    placeholder="Enter interest rate"
                                />
                            </Form.Group>
                            <Form.Group controlId="formYears" className="mt-3">
                                <Form.Label>Number of Years</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={years}
                                    onChange={(e) => setYears(e.target.value)}
                                    placeholder="Enter number of years"
                                />
                            </Form.Group>
                            <Form.Group controlId="formCompoundingFrequency" className="mt-3">
                                <Form.Label>Compounding Frequency</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={compoundingFrequency}
                                    onChange={(e) => setCompoundingFrequency(e.target.value)}
                                >
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="semi-annually">Semi-Annually</option>
                                    <option value="annually">Annually</option>
                                    <option value="custom">Custom (Enter below)</option>
                                </Form.Control>
                                {compoundingFrequency === 'custom' && (
                                    <Form.Control
                                        id="customFrequency"
                                        type="number"
                                        className="mt-2"
                                        placeholder="Custom compounding frequency"
                                    />
                                )}
                            </Form.Group>
                            <Button
                                variant="primary"
                                className="w-100 mt-3"
                                onClick={calculateSavings}
                            >
                                Calculate
                            </Button>
                        </Form>
                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                        {result !== null && (
                            <Card className="mt-4 p-3 text-center">
                                <Card.Title><strong>Future Value of Savings</strong></Card.Title>
                                <Card.Text className="display-4">
                                    ${result}
                                </Card.Text>
                                <Button
                                    variant="success"
                                    onClick={exportToCSV}
                                    className="mt-2"
                                >
                                    Export to CSV
                                </Button>
                            </Card>
                        )}
                        {data.labels && data.data && (
                            <Row className="mt-4">
                                <Col md={12}>
                                    <Card className="p-3">
                                        <Card.Title><strong>Savings Growth Over Time</strong></Card.Title>
                                        <Line
                                            data={{
                                                labels: data.labels,
                                                datasets: [{
                                                    label: 'Future Value',
                                                    data: data.data,
                                                    borderColor: '#007bff',
                                                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                                                    fill: true
                                                }]
                                            }}
                                            options={{
                                                responsive: true,
                                                plugins: {
                                                    legend: { display: true },
                                                    tooltip: { callbacks: { label: (context) => `$${context.raw}` } }
                                                }
                                            }}
                                        />
                                    </Card>
                                </Col>
                            </Row>
                        )}
                        {data.labels && data.data && (
                            <Row className="mt-4">
                                <Col md={12}>
                                    <Card className="p-3">
                                        <Card.Title><strong>Detailed Breakdown</strong></Card.Title>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Year</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.labels.map((label, index) => (
                                                    <tr key={index}>
                                                        <td>{label}</td>
                                                        <td>${data.data[index]}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Card>
                                </Col>
                            </Row>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SavingsCalculator;

