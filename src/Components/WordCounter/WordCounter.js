import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { FaRegFileAlt, FaWordpressSimple } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WordCounter.css';

function WordCounter() {
    const [text, setText] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const charCount = text.length;

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="p-4 shadow bg-gradient text-light">
                        <Card.Title className="text-center mb-4">
                            <FaWordpressSimple /> <strong>Word Counter</strong>
                        </Card.Title>
                        <Form>
                            <Form.Group controlId="formText">
                                <Form.Label>Input Text</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={6}
                                    value={text}
                                    onChange={handleTextChange}
                                    placeholder="Enter text here..."
                                />
                            </Form.Group>
                            <div className="mt-4">
                                <Card className="bg-dark text-light text-center p-3">
                                    <Card.Body>
                                        <h5><FaRegFileAlt /> Words: {wordCount}</h5>
                                        <h5><FaRegFileAlt /> Characters: {charCount}</h5>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default WordCounter;
