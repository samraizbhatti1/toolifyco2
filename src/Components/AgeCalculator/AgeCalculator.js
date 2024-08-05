import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaCalendarAlt, FaClock, FaCalendarDay } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AgeCalculator.css';

function AgeCalculator() {
    const [birthdate, setBirthdate] = useState('');
    const [ageDetails, setAgeDetails] = useState(null);

    const calculateAge = () => {
        const birthDate = new Date(birthdate);
        const today = new Date();
        const years = today.getFullYear() - birthDate.getFullYear();
        const months = today.getMonth() - birthDate.getMonth();
        const days = today.getDate() - birthDate.getDate();

        let ageInYears = years;
        let ageInMonths = months;
        let ageInDays = days;

        if (months < 0 || (months === 0 && days < 0)) {
            ageInYears--;
            ageInMonths += 12;
        }
        if (days < 0) {
            ageInMonths--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
            ageInDays += lastMonth.getDate();
        }

        const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(totalDays / 7);
        const hours = Math.floor(totalDays * 24);
        const seconds = Math.floor((today - birthDate) / 1000);
        const dayOfWeek = birthDate.toLocaleDateString('en-US', { weekday: 'long' });

        setAgeDetails({
            years: ageInYears,
            months: ageInMonths,
            weeks: weeks,
            hours: hours,
            seconds: seconds,
            dayOfWeek: dayOfWeek
        });
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="p-4 shadow bg-dark text-white">
                        <Card.Title className="text-center mb-4">
                            <FaCalendarAlt /> Age Calculator
                        </Card.Title>
                        <Form>
                            <Form.Group controlId="formBasicDate">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={birthdate}
                                    onChange={(e) => setBirthdate(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                className="mt-3 w-100"
                                onClick={calculateAge}
                            >
                                <FaClock /> Calculate Age
                            </Button>
                        </Form>
                        {ageDetails && (
                            <Card.Body className="text-center mt-4">
                                <h4>Your Age Details:</h4>
                                <div className="age-details">
                                    <div className="age-item">
                                        <strong><FaCalendarDay /> Years:</strong> {ageDetails.years}
                                    </div>
                                    <div className="age-item">
                                        <strong>Months:</strong> {ageDetails.months}
                                    </div>
                                    <div className="age-item">
                                        <strong>Weeks:</strong> {ageDetails.weeks}
                                    </div>
                                    <div className="age-item">
                                        <strong>Hours:</strong> {ageDetails.hours}
                                    </div>
                                    <div className="age-item">
                                        <strong>Seconds:</strong> {ageDetails.seconds}
                                    </div>
                                    <div className="age-item">
                                        <strong>Day of Birth:</strong> {ageDetails.dayOfWeek}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-info">Did you know? Your birth date was a {ageDetails.dayOfWeek}!</p>
                                </div>
                            </Card.Body>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AgeCalculator;
