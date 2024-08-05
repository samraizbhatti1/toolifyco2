import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Card, Alert, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaDollarSign, FaCalculator, FaChartLine, FaInfoCircle, FaDownload } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CSVLink } from 'react-csv';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MortgageCalculator.css';

const calculateMortgage = (principal, rate, years, extraPayment, paymentFrequency, prepaymentAmount, prepaymentInterval, interestType) => {
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;
    const paymentsPerYear = paymentFrequency === 'monthly' ? 12 : paymentFrequency === 'biweekly' ? 26 : 52;
    const termInMonths = paymentFrequency === 'monthly' ? years * 12 : (years * paymentsPerYear);
    
    let adjustedRate = interestType === 'variable' ? (monthlyRate + (0.01 * (Math.random() - 0.5))) : monthlyRate;

    const monthlyPayment = (principal * adjustedRate) / (1 - Math.pow(1 + adjustedRate, -termInMonths));
    const totalPayment = monthlyPayment * termInMonths;
    const totalInterest = totalPayment - principal;

    const amortizationSchedule = [];
    let balance = principal;
    let interestPaid = 0;
    let principalPaid = 0;

    for (let i = 0; i < termInMonths; i++) {
        const interest = balance * adjustedRate;
        const principalPayment = monthlyPayment - interest + extraPayment;
        balance -= principalPayment;
        interestPaid += interest;
        principalPaid += principalPayment;

        if (balance < 0) balance = 0;

        amortizationSchedule.push({
            month: i + 1,
            balance: balance.toFixed(2),
            principal: principalPaid.toFixed(2),
            interest: interestPaid.toFixed(2),
        });

        if (balance <= 0) break;

        if (i % prepaymentInterval === 0) {
            balance -= prepaymentAmount;
        }
    }

    return {
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        amortizationSchedule,
        chartData: {
            labels: amortizationSchedule.map(entry => entry.month),
            datasets: [
                {
                    label: 'Remaining Balance',
                    data: amortizationSchedule.map(entry => entry.balance),
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                    borderWidth: 2,
                },
                {
                    label: 'Principal Paid',
                    data: amortizationSchedule.map(entry => entry.principal),
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.2)',
                    borderWidth: 2,
                },
                {
                    label: 'Interest Paid',
                    data: amortizationSchedule.map(entry => entry.interest),
                    borderColor: '#dc3545',
                    backgroundColor: 'rgba(220, 53, 69, 0.2)',
                    borderWidth: 2,
                },
            ],
        },
    };
};

function MortgageCalculator() {
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [years, setYears] = useState('');
    const [extraPayment, setExtraPayment] = useState('');
    const [paymentFrequency, setPaymentFrequency] = useState('monthly');
    const [prepaymentAmount, setPrepaymentAmount] = useState('');
    const [prepaymentInterval, setPrepaymentInterval] = useState(12);
    const [interestType, setInterestType] = useState('fixed');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleCalculate = () => {
        setError('');
        if (!principal || !rate || !years) {
            setError('Please fill in all fields.');
            return;
        }

        const parsedPrincipal = parseFloat(principal);
        const parsedRate = parseFloat(rate);
        const parsedYears = parseFloat(years);
        const parsedExtraPayment = parseFloat(extraPayment || 0);
        const parsedPrepaymentAmount = parseFloat(prepaymentAmount || 0);
        const parsedPrepaymentInterval = parseInt(prepaymentInterval, 10);

        if (isNaN(parsedPrincipal) || isNaN(parsedRate) || isNaN(parsedYears)) {
            setError('Please enter valid numbers.');
            return;
        }

        const calculationResult = calculateMortgage(parsedPrincipal, parsedRate, parsedYears, parsedExtraPayment, paymentFrequency, parsedPrepaymentAmount, parsedPrepaymentInterval, interestType);
        setResult(calculationResult);
    };

    return (
        <Container className="mortgage-calculator-container my-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="p-4 shadow bg-light text-dark">
                        <Card.Title className="text-center mb-4 heading">
                            <FaCalculator /> <strong>Advanced Mortgage Calculator</strong>
                        </Card.Title>
                        <Form>
                            <Form.Group controlId="formPrincipal">
                                <Form.Label>Loan Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={principal}
                                    onChange={(e) => setPrincipal(e.target.value)}
                                    placeholder="200000"
                                />
                            </Form.Group>
                            <Form.Group controlId="formRate" className="mt-3">
                                <Form.Label>Annual Interest Rate (%)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    placeholder="3.5"
                                />
                            </Form.Group>
                            <Form.Group controlId="formYears" className="mt-3">
                                <Form.Label>Loan Term (Years)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={years}
                                    onChange={(e) => setYears(e.target.value)}
                                    placeholder="30"
                                />
                            </Form.Group>
                            <Form.Group controlId="formExtraPayment" className="mt-3">
                                <Form.Label>Additional Monthly Payment</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={extraPayment}
                                    onChange={(e) => setExtraPayment(e.target.value)}
                                    placeholder="0"
                                />
                            </Form.Group>
                            <Form.Group controlId="formPaymentFrequency" className="mt-3">
                                <Form.Label>Payment Frequency</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={paymentFrequency}
                                    onChange={(e) => setPaymentFrequency(e.target.value)}
                                >
                                    <option value="monthly">Monthly</option>
                                    <option value="biweekly">Bi-Weekly</option>
                                    <option value="weekly">Weekly</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formPrepaymentAmount" className="mt-3">
                                <Form.Label>Yearly Prepayment Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={prepaymentAmount}
                                    onChange={(e) => setPrepaymentAmount(e.target.value)}
                                    placeholder="0"
                                />
                            </Form.Group>
                            <Form.Group controlId="formPrepaymentInterval" className="mt-3">
                                <Form.Label>Prepayment Interval (months)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={prepaymentInterval}
                                    onChange={(e) => setPrepaymentInterval(e.target.value)}
                                    placeholder="12"
                                />
                            </Form.Group>
                            <Form.Group controlId="formInterestType" className="mt-3">
                                <Form.Label>Interest Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={interestType}
                                    onChange={(e) => setInterestType(e.target.value)}
                                >
                                    <option value="fixed">Fixed</option>
                                    <option value="variable">Variable</option>
                                </Form.Control>
                            </Form.Group>
                            <Button
                                variant="primary"
                                className="w-100 mt-3 btn-calculate"
                                onClick={handleCalculate}
                            >
                                <FaCalculator /> Calculate
                            </Button>
                        </Form>
                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                        {result && (
                            <div className="mt-4 text-center">
                                <h3 className="result">
                                    <FaChartLine /> <strong>Mortgage Summary</strong>
                                </h3>
                                <p><strong>Monthly Payment:</strong> ${result.monthlyPayment}</p>
                                <p><strong>Total Payment:</strong> ${result.totalPayment}</p>
                                <p><strong>Total Interest Paid:</strong> ${result.totalInterest}</p>
                                <div className="mt-4">
                                    <Line data={result.chartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
                                </div>
                                <Button
                                    variant="success"
                                    className="mt-4 btn-download"
                                    as={CSVLink}
                                    data={result.amortizationSchedule}
                                    filename="amortization_schedule.csv"
                                    target="_blank"
                                >
                                    <FaDownload /> Export to CSV
                                </Button>
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default MortgageCalculator;

