import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { FaYoutube, FaDownload, FaImage } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './YouTubeThumbnailDownloader.css';

const YouTubeThumbnail = () => {
    const [url, setUrl] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [size, setSize] = useState('maxresdefault'); // Default to full HD

    const getThumbnail = () => {
        setIsLoading(true);
        setError('');

        const videoId = extractVideoId(url);

        if (videoId) {
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${size}.jpg`;
            setThumbnail(thumbnailUrl);
        } else {
            setError('Invalid YouTube URL');
        }

        setIsLoading(false);
    };

    const extractVideoId = (url) => {
        const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const downloadImage = () => {
        if (thumbnail) {
            const link = document.createElement('a');
            link.href = thumbnail;
            link.download = 'thumbnail.jpg'; // Specify the file name and format
            document.body.appendChild(link); // Append the link to the body
            link.click(); // Simulate a click to start the download
            document.body.removeChild(link); // Remove the link from the body
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="p-4 shadow bg-light text-dark">
                        <Card.Title className="text-center mb-4">
                            <FaYoutube /> <strong>YouTube Thumbnail Downloader</strong>
                        </Card.Title>
                        <Form>
                            <Form.Group controlId="formUrl">
                                <Form.Label>Enter YouTube Video URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=abcdefghijk"
                                />
                            </Form.Group>
                            <Form.Group controlId="formSize" className="mt-3">
                                <Form.Label>Select Thumbnail Size</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                >
                                    <option value="default">Default (Small)</option>
                                    <option value="mqdefault">Medium</option>
                                    <option value="hqdefault">High Quality</option>
                                    <option value="maxresdefault">Full HD</option>
                                </Form.Control>
                            </Form.Group>
                            <Button
                                variant="primary"
                                className="w-100 mt-3"
                                onClick={getThumbnail}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Fetching...' : <FaImage />} Fetch Thumbnail
                            </Button>
                        </Form>
                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                        {thumbnail && (
                            <div className="mt-4 text-center">
                                <img src={thumbnail} alt="YouTube Thumbnail" className="thumbnail-image" />
                                <div className="mt-3">
                                    <Button
                                        variant="success"
                                        onClick={downloadImage}
                                    >
                                        <FaDownload /> Download Thumbnail
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default YouTubeThumbnail;
