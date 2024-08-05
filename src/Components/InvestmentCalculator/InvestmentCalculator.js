import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Card, Alert, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaDollarSign, FaCalculator, FaChartLine, FaInfoCircle } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import './InvestmentCalculator.css';

const calculateInvestment = (principal, rate, years, contributions, compoundingFrequency, contributionFrequency) => {
    const r = rate / 100;
    const n = compoundingFrequency === 'monthly' ? 12 : compoundingFrequency === 'quarterly' ? 4 : 1;
    const c = contributionFrequency === 'monthly' ? 12 : contributionFrequency === 'quarterly' ? 4 : 1;

    const periods = years * n;
    const A = principal * Math.pow(1 + r / n, periods);
    const FV = A + contributions * ((Math.pow(1 + r / n, periods) - 1) / (r / n));
    
    return {
        futureValue: FV.toFixed(2),
        totalContributions: (principal + contributions * c * years).toFixed(2),
        totalInterest: (FV - (principal + contributions * c * years)).toFixed(2),
        chartData: {
            labels: Array.from({ length: periods }, (_, i) => i + 1),
            datasets: [
                {
                    label: 'Investment Growth',
                    data: Array.from({ length: periods }, (_, i) => 
                        (principal * Math.pow(1 + r / n, i + 1) + contributions * ((Math.pow(1 + r / n, i + 1) - 1) / (r / n)))
                    ).map(v => v.toFixed(2)),
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                    borderWidth: 2,
                },
            ],
        },
    };
};

function InvestmentCalculator() {
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [years, setYears] = useState('');
    const [contributions, setContributions] = useState('');
    const [compoundingFrequency, setCompoundingFrequency] = useState('annually');
    const [contributionFrequency, setContributionFrequency] = useState('monthly');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleCalculate = () => {
        setError('');
        if (!principal || !rate || !years || !contributions) {
            setError('Please fill in all fields.');
            return;
        }

        const parsedPrincipal = parseFloat(principal);
        const parsedRate = parseFloat(rate);
        const parsedYears = parseFloat(years);
        const parsedContributions = parseFloat(contributions);

        if (isNaN(parsedPrincipal) || isNaN(parsedRate) || isNaN(parsedYears) || isNaN(parsedContributions)) {
            setError('Please enter valid numbers.');
            return;
        }

        const calculationResult = calculateInvestment(parsedPrincipal, parsedRate, parsedYears, parsedContributions, compoundingFrequency, contributionFrequency);
        setResult(calculationResult);
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Provides a graphical representation of your investment growth over time.
        </Tooltip>
    );

    return (
        <Container className="investment-calculator-container my-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="p-4 shadow bg-light text-dark">
                        <Card.Title className="text-center mb-4">
                            <FaCalculator /> <strong>Advanced Investment Calculator</strong>
                        </Card.Title>
                        <Form>
                            <Form.Group controlId="formPrincipal">
                                <Form.Label>Initial Investment Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={principal}
                                    onChange={(e) => setPrincipal(e.target.value)}
                                    placeholder="1000"
                                />
                            </Form.Group>
                            <Form.Group controlId="formRate" className="mt-3">
                                <Form.Label>Annual Interest Rate (%)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    placeholder="5"
                                />
                            </Form.Group>
                            <Form.Group controlId="formYears" className="mt-3">
                                <Form.Label>Investment Period (Years)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={years}
                                    onChange={(e) => setYears(e.target.value)}
                                    placeholder="10"
                                />
                            </Form.Group>
                            <Form.Group controlId="formContributions" className="mt-3">
                                <Form.Label>Additional Contributions (Yearly)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={contributions}
                                    onChange={(e) => setContributions(e.target.value)}
                                    placeholder="100"
                                />
                            </Form.Group>
                            <Form.Group controlId="formCompounding" className="mt-3">
                                <Form.Label>Compounding Frequency</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={compoundingFrequency}
                                    onChange={(e) => setCompoundingFrequency(e.target.value)}
                                >
                                    <option value="annually">Annually</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="monthly">Monthly</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formContributionFrequency" className="mt-3">
                                <Form.Label>Contribution Frequency</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={contributionFrequency}
                                    onChange={(e) => setContributionFrequency(e.target.value)}
                                >
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="annually">Annually</option>
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
                                    <FaChartLine /> <strong>Investment Summary</strong>
                                </h3>
                                <p><strong>Future Value:</strong> ${result.futureValue}</p>
                                <p><strong>Total Contributions:</strong> ${result.totalContributions}</p>
                                <p><strong>Total Interest Earned:</strong> ${result.totalInterest}</p>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={renderTooltip}
                                >
                                    <Button variant="info" className="mt-3">
                                        <FaInfoCircle /> View Growth Chart
                                    </Button>
                                </OverlayTrigger>
                                <div className="mt-4">
                                    <Line data={result.chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                                </div>
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default InvestmentCalculator;


