import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FaDollarSign, FaCalculator, FaInfoCircle } from 'react-icons/fa';
import { BsCurrencyDollar, BsCurrencyEuro, BsCurrencyPound, BsCurrencyYen } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PayPalFeeCalculator.css';

const PayPalFeeCalculator = () => {
    const [amount, setAmount] = useState('');
    const [feeType, setFeeType] = useState('standard');
    const [currency, setCurrency] = useState('USD');
    const [fee, setFee] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (amount !== '') {
            calculateFee();
        } else {
            setFee(null);
        }
    }, [amount, feeType, currency]);

    const calculateFee = () => {
        setError('');
        if (isNaN(amount) || amount <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        let feePercentage = 0.029; // 2.9%
        let fixedFee = 0.30; // $0.30

        if (feeType === 'micro') {
            feePercentage = 0.045; // 4.5%
            fixedFee = 0.05; // $0.05
        } else if (feeType === 'crossborder') {
            feePercentage = 0.039; // 3.9%
            fixedFee = 0.30; // $0.30
        }

        const calculatedFee = (amount * feePercentage) + fixedFee;
        const netAmount = amount - calculatedFee;
        setFee({
            calculatedFee: calculatedFee.toFixed(2),
            netAmount: netAmount.toFixed(2)
        });
    };

    const getCurrencySymbol = (currency) => {
        switch (currency) {
            case 'USD':
                return <BsCurrencyDollar />;
            case 'EUR':
                return <BsCurrencyEuro />;
            case 'GBP':
                return <BsCurrencyPound />;
            case 'JPY':
                return <BsCurrencyYen />;
            default:
                return <BsCurrencyDollar />;
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="p-4 shadow bg-light text-dark">
                        <Card.Title className="text-center mb-4 card-title">
                            <FaCalculator /> <strong>Advanced PayPal Fee Calculator</strong>
                        </Card.Title>
                        <Form>
                            <Form.Group controlId="formAmount">
                                <Form.Label>Enter Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    step="0.01"
                                />
                            </Form.Group>
                            <Form.Group controlId="formCurrency" className="mt-3">
                                <Form.Label>Select Currency</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                >
                                    <option value="USD">USD - United States Dollar</option>
                                    <option value="EUR">EUR - Euro</option>
                                    <option value="GBP">GBP - British Pound</option>
                                    <option value="JPY">JPY - Japanese Yen</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formFeeType" className="mt-3">
                                <Form.Label>Select Fee Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={feeType}
                                    onChange={(e) => setFeeType(e.target.value)}
                                >
                                    <option value="standard">Standard Fee (2.9% + $0.30)</option>
                                    <option value="micro">Micro Payment Fee (4.5% + $0.05)</option>
                                    <option value="crossborder">Cross-Border Fee (3.9% + $0.30)</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                        {fee !== null && !error && (
                            <div className="mt-4 text-center result-container">
                                <h3 className="result">
                                    Total Fee: {getCurrencySymbol(currency)} {fee.calculatedFee}
                                </h3>
                                <h3 className="result">
                                    Net Amount: {getCurrencySymbol(currency)} {fee.netAmount}
                                </h3>
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PayPalFeeCalculator;


