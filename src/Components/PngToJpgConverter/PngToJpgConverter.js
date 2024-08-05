import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { FaUpload, FaDownload, FaImage, FaSlidersH, FaRulerCombined } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PngToJpgConverter.css';

const PngToJpgConverter = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [convertedFile, setConvertedFile] = useState(null);
    const [quality, setQuality] = useState(1);
    const [resizeWidth, setResizeWidth] = useState('');
    const [resizeHeight, setResizeHeight] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setConvertedFile(null); // Reset the converted file when a new file is selected
    };

    const convertToJpg = () => {
        setError('');
        if (!selectedFile) {
            setError('Please select a file to convert.');
            return;
        }

        setLoading(true);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (resizeWidth && resizeHeight) {
                width = parseInt(resizeWidth);
                height = parseInt(resizeHeight);
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                setConvertedFile(url);
                setLoading(false);
            }, 'image/jpeg', quality);
        };

        img.src = URL.createObjectURL(selectedFile);
    };

    const downloadFile = () => {
        const a = document.createElement('a');
        a.href = convertedFile;
        a.download = 'converted.jpg';
        a.click();
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="p-4 shadow bg-light text-dark">
                        <Card.Title className="text-center mb-4 card-title">
                            <FaImage /> <strong>PNG to JPG Converter</strong>
                        </Card.Title>
                        <Form>
                            <Form.Group>
                                <Form.Label>Upload PNG File</Form.Label>
                                <Form.Control type="file" accept=".png" onChange={handleFileChange} />
                            </Form.Group>
                            {selectedFile && (
                                <div className="mt-3 text-center">
                                    <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="preview-img" />
                                </div>
                            )}
                            <Form.Group className="mt-3">
                                <Form.Label>
                                    <FaSlidersH /> Select Quality (1 to 100)
                                </Form.Label>
                                <Form.Control
                                    type="range"
                                    min="1"
                                    max="100"
                                    value={quality * 100}
                                    onChange={(e) => setQuality(e.target.value / 100)}
                                />
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>
                                    <FaRulerCombined /> Resize Image (Optional)
                                </Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Control
                                            type="number"
                                            placeholder="Width"
                                            value={resizeWidth}
                                            onChange={(e) => setResizeWidth(e.target.value)}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="number"
                                            placeholder="Height"
                                            value={resizeHeight}
                                            onChange={(e) => setResizeHeight(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Button
                                variant="primary"
                                className="w-100 mt-3"
                                onClick={convertToJpg}
                                disabled={!selectedFile || loading}
                            >
                                {loading ? <Spinner animation="border" size="sm" /> : <FaUpload />} Convert to JPG
                            </Button>
                        </Form>
                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                        {convertedFile && (
                            <div className="mt-4 text-center result-container">
                                <img src={convertedFile} alt="Converted" className="converted-img" />
                                <Button variant="success" className="w-100 mt-3" onClick={downloadFile}>
                                    <FaDownload /> Download JPG
                                </Button>
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PngToJpgConverter;
