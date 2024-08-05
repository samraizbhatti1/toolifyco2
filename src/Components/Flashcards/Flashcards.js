import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import { Flipper, Flipped } from 'react-flip-toolkit';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Flashcards.css';

const Flashcards = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [term, setTerm] = useState('');
    const [definition, setDefinition] = useState('');
    const [index, setIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const addFlashcard = () => {
        if (editIndex !== null) {
            const updatedFlashcards = flashcards.map((card, i) => i === editIndex ? { term, definition } : card);
            setFlashcards(updatedFlashcards);
            setEditIndex(null);
        } else {
            setFlashcards([...flashcards, { term, definition }]);
        }
        setTerm('');
        setDefinition('');
        setShowModal(false);
    };

    const editFlashcard = (index) => {
        setTerm(flashcards[index].term);
        setDefinition(flashcards[index].definition);
        setEditIndex(index);
        setShowModal(true);
    };

    const deleteFlashcard = (index) => {
        const updatedFlashcards = flashcards.filter((_, i) => i !== index);
        setFlashcards(updatedFlashcards);
        setIndex(0);
    };

    const nextCard = () => {
        setIndex((index + 1) % flashcards.length);
        setShowAnswer(false);
    };

    const prevCard = () => {
        setIndex((index - 1 + flashcards.length) % flashcards.length);
        setShowAnswer(false);
    };

    const shuffleCards = () => {
        setFlashcards(flashcards.sort(() => Math.random() - 0.5));
        setIndex(0);
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="p-4 shadow bg-light text-dark">
                        <Card.Title className="text-center mb-4">
                            <strong>Flashcards</strong>
                        </Card.Title>
                        <Button className="mb-3" onClick={() => setShowModal(true)}>Add Flashcard</Button>
                        <Button className="mb-3 ml-2" onClick={shuffleCards}>Shuffle Cards</Button>
                        <Flipper flipKey={index}>
                            {flashcards.length > 0 && (
                                <Flipped flipId="flashcard">
                                    <div className="mt-4 text-center" onClick={() => setShowAnswer(!showAnswer)}>
                                        <Card className={`p-4 shadow bg-light text-dark ${showAnswer ? 'flip' : ''}`}>
                                            <Card.Body>
                                                <Card.Title>{showAnswer ? flashcards[index].definition : flashcards[index].term}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </Flipped>
                            )}
                        </Flipper>
                        {flashcards.length > 0 && (
                            <div className="mt-4 text-center">
                                <Button variant="primary" onClick={prevCard}>Previous</Button>
                                <Button variant="primary" className="ml-2" onClick={nextCard}>Next</Button>
                                <Button variant="warning" className="ml-2" onClick={() => editFlashcard(index)}>Edit</Button>
                                <Button variant="danger" className="ml-2" onClick={() => deleteFlashcard(index)}>Delete</Button>
                                <div className="mt-3">
                                    <p>Card {index + 1} of {flashcards.length}</p>
                                </div>
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editIndex !== null ? 'Edit Flashcard' : 'Add Flashcard'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTerm">
                            <Form.Label>Term</Form.Label>
                            <Form.Control
                                type="text"
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                                placeholder="Enter term"
                            />
                        </Form.Group>
                        <Form.Group controlId="formDefinition" className="mt-3">
                            <Form.Label>Definition</Form.Label>
                            <Form.Control
                                type="text"
                                value={definition}
                                onChange={(e) => setDefinition(e.target.value)}
                                placeholder="Enter definition"
                            />
                        </Form.Group>
                        <Button className="mt-3" onClick={addFlashcard}>
                            {editIndex !== null ? 'Save Changes' : 'Add Flashcard'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Flashcards;
