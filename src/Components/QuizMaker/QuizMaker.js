import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal, Alert, ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './QuizMaker.css'; // Add custom styles for animations

const QuizMaker = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const addQuiz = () => {
        if (editIndex !== null) {
            const updatedQuizzes = quizzes.map((quiz, i) => i === editIndex ? { question, options, correctAnswer } : quiz);
            setQuizzes(updatedQuizzes);
            setEditIndex(null);
        } else {
            setQuizzes([...quizzes, { question, options, correctAnswer }]);
        }
        setQuestion('');
        setOptions(['', '', '', '']);
        setCorrectAnswer('');
        setShowModal(false);
    };

    const editQuiz = (index) => {
        setQuestion(quizzes[index].question);
        setOptions(quizzes[index].options);
        setCorrectAnswer(quizzes[index].correctAnswer);
        setEditIndex(index);
        setShowModal(true);
    };

    const deleteQuiz = (index) => {
        const updatedQuizzes = quizzes.filter((_, i) => i !== index);
        setQuizzes(updatedQuizzes);
    };

    const startQuiz = () => {
        setCurrentQuiz(0);
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setShowResults(false);
    };

    const submitQuiz = () => {
        setShowResults(true);
        setCurrentQuiz(null);
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const handleAnswerChange = (questionIndex, answerIndex) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[questionIndex] = answerIndex;
        setUserAnswers(updatedAnswers);
    };

    const calculateScore = () => {
        let score = 0;
        quizzes.forEach((quiz, index) => {
            if (quiz.correctAnswer === userAnswers[index]) {
                score += 1;
            }
        });
        return score;
    };

    const nextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const previousQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="p-4 shadow bg-light text-dark">
                        <Card.Title className="text-center mb-4">
                            <strong>Quiz Maker</strong>
                        </Card.Title>
                        <Button className="mb-3" onClick={() => setShowModal(true)}>Add Quiz Question</Button>
                        {quizzes.map((quiz, index) => (
                            <Card key={index} className="mb-3">
                                <Card.Body>
                                    <Card.Title>{quiz.question}</Card.Title>
                                    <ul className={currentQuiz !== null ? 'white-text' : ''}>
                                        {quiz.options.map((option, i) => (
                                            <li key={i}>{option}</li>
                                        ))}
                                    </ul>
                                    <Button variant="warning" className="mr-2" onClick={() => editQuiz(index)}>Edit</Button>
                                    <Button variant="danger" onClick={() => deleteQuiz(index)}>Delete</Button>
                                </Card.Body>
                            </Card>
                        ))}
                        {quizzes.length > 0 && <Button variant="primary" className="mt-3" onClick={startQuiz}>Start Quiz</Button>}
                        {currentQuiz !== null && (
                            <div className="mt-4">
                                <ProgressBar now={(currentQuestionIndex + 1) / quizzes.length * 100} className="mb-3" />
                                <TransitionGroup>
                                    <CSSTransition key={currentQuestionIndex} timeout={300} classNames="fade">
                                        <div>
                                            <h3>{quizzes[currentQuestionIndex].question}</h3>
                                            <Form>
                                                {quizzes[currentQuestionIndex].options.map((option, index) => (
                                                    <Form.Check
                                                        key={index}
                                                        type="radio"
                                                        label={option}
                                                        name="quizOptions"
                                                        onChange={() => handleAnswerChange(currentQuestionIndex, index)}
                                                    />
                                                ))}
                                            </Form>
                                            <div className="d-flex justify-content-between mt-3">
                                                <Button variant="secondary" onClick={previousQuestion} disabled={currentQuestionIndex === 0}>Previous</Button>
                                                {currentQuestionIndex === quizzes.length - 1 ? (
                                                    <Button variant="success" onClick={submitQuiz}>Submit</Button>
                                                ) : (
                                                    <Button variant="primary" onClick={nextQuestion}>Next</Button>
                                                )}
                                            </div>
                                        </div>
                                    </CSSTransition>
                                </TransitionGroup>
                            </div>
                        )}
                        {showResults && (
                            <Alert variant="success" className="mt-3">
                                <h4>Your score is {calculateScore()} out of {quizzes.length}</h4>
                                <h5>Summary:</h5>
                                <ul className={currentQuiz !== null ? 'white-text' : ''}>
                                    {quizzes.map((quiz, index) => (
                                        <li key={index}>
                                            <strong>Q:</strong> {quiz.question}<br />
                                            <strong>Your answer:</strong> {quiz.options[userAnswers[index]]}<br />
                                            <strong>Correct answer:</strong> {quiz.options[quiz.correctAnswer]}
                                        </li>
                                    ))}
                                </ul>
                            </Alert>
                        )}
                    </Card>
                </Col>
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editIndex !== null ? 'Edit Quiz Question' : 'Add Quiz Question'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formQuestion">
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Enter question"
                            />
                        </Form.Group>
                        {options.map((option, index) => (
                            <Form.Group key={index} controlId={`formOption${index}`} className="mt-3">
                                <Form.Label>Option {index + 1}</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    placeholder={`Enter option ${index + 1}`}
                                />
                            </Form.Group>
                        ))}
                        <Form.Group controlId="formCorrectAnswer" className="mt-3">
                            <Form.Label>Correct Answer</Form.Label>
                            <Form.Control
                                as="select"
                                value={correctAnswer}
                                onChange={(e) => setCorrectAnswer(e.target.value)}
                            >
                                <option value="">Select correct answer</option>
                                {options.map((option, index) => (
                                    <option key={index} value={index}>{option}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button className="mt-3" onClick={addQuiz}>
                            {editIndex !== null ? 'Save Changes' : 'Add Quiz Question'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default QuizMaker;

