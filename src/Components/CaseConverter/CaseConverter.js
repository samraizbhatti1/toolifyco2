import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown, FaClipboard, FaClipboardCheck, FaUndo } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CaseConverter.css';

function CaseConverter() {
    const [text, setText] = useState('');
    const [convertedText, setConvertedText] = useState('');
    const [copied, setCopied] = useState(false);
    const [conversionType, setConversionType] = useState('toUpper');

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleConvert = () => {
        if (conversionType === 'toUpper') {
            setConvertedText(text.toUpperCase());
        } else {
            setConvertedText(text.toLowerCase());
        }
        setCopied(false);
    };

    const handleClear = () => {
        setText('');
        setConvertedText('');
        setCopied(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(convertedText);
        setCopied(true);
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="p-4 shadow bg-gradient text-light">
                        <Card.Title className="text-center mb-4">
                            <strong>Case Converter</strong>
                        </Card.Title>
                        <Form>
                            <Form.Group controlId="formText">
                                <Form.Label>Input Text</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    value={text}
                                    onChange={handleTextChange}
                                    placeholder="Enter text here..."
                                />
                            </Form.Group>
                            <div className="d-flex justify-content-between mt-3">
                                <Button
                                    variant={conversionType === 'toUpper' ? 'primary' : 'secondary'}
                                    onClick={() => setConversionType('toUpper')}
                                >
                                    <FaArrowUp /> Uppercase
                                </Button>
                                <Button
                                    variant={conversionType === 'toLower' ? 'primary' : 'secondary'}
                                    onClick={() => setConversionType('toLower')}
                                >
                                    <FaArrowDown /> Lowercase
                                </Button>
                            </div>
                            <Button
                                variant="info"
                                className="mt-3 w-100"
                                onClick={handleConvert}
                            >
                                Convert Text
                            </Button>
                            {convertedText && (
                                <div className="mt-3">
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        value={convertedText}
                                        readOnly
                                        className="text-output"
                                    />
                                    <div className="d-flex justify-content-between mt-2">
                                        <Button
                                            variant="success"
                                            onClick={handleCopy}
                                        >
                                            {copied ? <FaClipboardCheck /> : <FaClipboard />} {copied ? "Copied!" : "Copy to Clipboard"}
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={handleClear}
                                        >
                                            <FaUndo /> Clear
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CaseConverter;
