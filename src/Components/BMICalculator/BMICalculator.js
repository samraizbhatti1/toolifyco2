import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, ListGroup } from 'react-bootstrap';
import { FaWeight, FaRuler, FaCalculator, FaInfoCircle, FaHistory } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BMICalculator.css';

const BMICalculator = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [heightInInches, setHeightInInches] = useState('');
    const [weightInPounds, setWeightInPounds] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [unit, setUnit] = useState('metric');
    const [history, setHistory] = useState([]);

    const calculateBMI = () => {
        setError('');
        let heightMeters = 0;
        let weightKg = 0;

        if (unit === 'metric') {
            heightMeters = height / 100; // Convert height to meters
            weightKg = weight;
        } else {
            heightMeters = (heightInInches * 0.0254); // Convert inches to meters
            weightKg = weightInPounds * 0.453592; // Convert pounds to kilograms
        }

        if (isNaN(heightMeters) || isNaN(weightKg) || heightMeters <= 0 || weightKg <= 0) {
            setError('Please enter valid height and weight');
            return;
        }

        const calculatedBMI = (weightKg / (heightMeters * heightMeters)).toFixed(2);

        let bmiCategory = '';
        if (calculatedBMI < 18.5) bmiCategory = 'Underweight';
        else if (calculatedBMI >= 18.5 && calculatedBMI < 24.9) bmiCategory = 'Normal';
        else if (calculatedBMI >= 25 && calculatedBMI < 29.9) bmiCategory = 'Overweight';
        else bmiCategory = 'Obese';

        setBmi(calculatedBMI);
        setCategory(bmiCategory);
        setHistory([...history, { bmi: calculatedBMI, category: bmiCategory }]);
    };

    const toggleUnit = () => {
        setUnit(unit === 'metric' ? 'imperial' : 'metric');
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Underweight':
                return 'bg-info';
            case 'Normal':
                return 'bg-success';
            case 'Overweight':
                return 'bg-warning';
            case 'Obese':
                return 'bg-danger';
            default:
                return 'bg-light';
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="p-4 shadow bg-light text-dark">
                        <Card.Title className="text-center mb-4">
                            <FaCalculator /> <strong>BMI Calculator</strong>
                        </Card.Title>
                        <Button
                            variant="info"
                            className="mb-3"
                            onClick={toggleUnit}
                        >
                            Switch to {unit === 'metric' ? 'Imperial' : 'Metric'}
                        </Button>
                        <Form>
                            {unit === 'metric' ? (
                                <>
                                    <Form.Group controlId="formHeight">
                                        <Form.Label>Height (cm)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            placeholder="Enter height in cm"
                                            min="0"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formWeight" className="mt-3">
                                        <Form.Label>Weight (kg)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            placeholder="Enter weight in kg"
                                            min="0"
                                        />
                                    </Form.Group>
                                </>
                            ) : (
                                <>
                                    <Form.Group controlId="formHeightInInches">
                                        <Form.Label>Height (inches)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={heightInInches}
                                            onChange={(e) => setHeightInInches(e.target.value)}
                                            placeholder="Enter height in inches"
                                            min="0"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formWeightInPounds" className="mt-3">
                                        <Form.Label>Weight (pounds)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={weightInPounds}
                                            onChange={(e) => setWeightInPounds(e.target.value)}
                                            placeholder="Enter weight in pounds"
                                            min="0"
                                        />
                                    </Form.Group>
                                </>
                            )}
                            <Button
                                variant="primary"
                                className="mt-3 w-100"
                                onClick={calculateBMI}
                            >
                                <FaCalculator /> Calculate BMI
                            </Button>
                        </Form>
                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                        {bmi !== null && !error && (
                            <div className="mt-4 text-center">
                                <h3 className={`result ${getCategoryColor(category)}`}>
                                    Your BMI is {bmi} ({category})
                                </h3>
                                <FaInfoCircle className="info-icon" />
                                <div className="bmi-graph mt-3">
                                    <div className={`bar ${getCategoryColor(category)}`}>
                                        {category}
                                    </div>
                                </div>
                            </div>
                        )}
                        {history.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-center">
                                    <FaHistory /> History
                                </h4>
                                <ListGroup>
                                    {history.map((entry, index) => (
                                        <ListGroup.Item key={index} className={getCategoryColor(entry.category)}>
                                            BMI: {entry.bmi} - {entry.category}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BMICalculator;
