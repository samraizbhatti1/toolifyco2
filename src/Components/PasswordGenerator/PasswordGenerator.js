import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Card, Alert } from 'react-bootstrap';
import { FaLock, FaClipboard, FaClipboardCheck, FaDownload } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PasswordGenerator.css';

const generatePassword = (length, options) => {
    const charsetLower = "abcdefghijklmnopqrstuvwxyz";
    const charsetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charsetNumbers = "0123456789";
    const charsetSpecial = "!@#$%^&*()_+[]{}|;:,.<>?";

    let charset = charsetLower;
    if (options.includeUppercase) charset += charsetUpper;
    if (options.includeNumbers) charset += charsetNumbers;
    if (options.includeSpecial) charset += charsetSpecial;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
};

function PasswordGenerator() {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(12);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSpecial, setIncludeSpecial] = useState(true);
    const [copied, setCopied] = useState(false);
    const [showStrength, setShowStrength] = useState(false);

    const handleGenerate = () => {
        setPassword(generatePassword(length, {
            includeUppercase,
            includeNumbers,
            includeSpecial
        }));
        setCopied(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
    };

    const handleDownload = () => {
        const blob = new Blob([password], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'password.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    const getPasswordStrength = () => {
        const lengthCriteria = length >= 12;
        const upperCriteria = includeUppercase;
        const numberCriteria = includeNumbers;
        const specialCriteria = includeSpecial;

        if (lengthCriteria && upperCriteria && numberCriteria && specialCriteria) return 'Strong';
        if (lengthCriteria && (upperCriteria || numberCriteria || specialCriteria)) return 'Moderate';
        return 'Weak';
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="p-4 shadow bg-gradient text-dark">
                        <Card.Title className="text-center mb-4">
                            <FaLock /> <strong>Strong Password Generator</strong>
                        </Card.Title>
                        <Form>
                            <Form.Group controlId="formPasswordLength">
                                <Form.Label>Password Length</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="8"
                                    max="32"
                                    value={length}
                                    onChange={(e) => setLength(Number(e.target.value))}
                                />
                            </Form.Group>

                            <Form.Group controlId="formIncludeUppercase" className="mt-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Include Uppercase Letters"
                                    checked={includeUppercase}
                                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formIncludeNumbers" className="mt-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Include Numbers"
                                    checked={includeNumbers}
                                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formIncludeSpecial" className="mt-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Include Special Characters"
                                    checked={includeSpecial}
                                    onChange={(e) => setIncludeSpecial(e.target.checked)}
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                className="mt-3 w-100"
                                onClick={handleGenerate}
                            >
                                Generate Password
                            </Button>
                            {password && (
                                <div className="mt-3">
                                    <Form.Control
                                        type="text"
                                        value={password}
                                        readOnly
                                        className="password-output"
                                    />
                                    <Button
                                        variant={copied ? "" : "secondary"}
                                        className="mt-2 w-100"
                                        onClick={handleCopy}
                                    >
                                        {copied ? <FaClipboardCheck /> : <FaClipboard />} {copied ? "Copied!" : "Copy to Clipboard"}
                                    </Button>
                                    <Button
                                        variant="success"
                                        className="mt-2 w-100"
                                        onClick={handleDownload}
                                    >
                                        <FaDownload /> Download Password
                                    </Button>
                                    <Alert className="mt-3" variant="info" show={showStrength}>
                                        Password Strength: <strong>{getPasswordStrength()}</strong>
                                    </Alert>
                                </div>
                            )}
                        </Form>
                        <Button
                            variant="info"
                            className="mt-3 w-100"
                            onClick={() => setShowStrength(!showStrength)}
                        >
                            Toggle Password Strength Indicator
                        </Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default PasswordGenerator;

