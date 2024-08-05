import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ProgressBar, Modal } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WorkoutPlanner.css';

const WorkoutPlanner = () => {
    const [meals, setMeals] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [mealName, setMealName] = useState('');
    const [calories, setCalories] = useState('');
    const [exerciseName, setExerciseName] = useState('');
    const [exerciseCalories, setExerciseCalories] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentEntry, setCurrentEntry] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [dailyGoal, setDailyGoal] = useState(2000);

    const handleAddMeal = () => {
        if (mealName && calories) {
            setMeals([...meals, { name: mealName, calories: parseInt(calories, 10) }]);
            setMealName('');
            setCalories('');
        }
    };

    const handleAddExercise = () => {
        if (exerciseName && exerciseCalories) {
            setExercises([...exercises, { name: exerciseName, calories: parseInt(exerciseCalories, 10) }]);
            setExerciseName('');
            setExerciseCalories('');
        }
    };

    const handleEditEntry = (entry, type) => {
        setIsEditing(true);
        setCurrentEntry({ ...entry, type });
        setShowModal(true);
    };

    const handleDeleteEntry = (entry, type) => {
        if (type === 'meal') {
            setMeals(meals.filter((meal) => meal !== entry));
        } else {
            setExercises(exercises.filter((exercise) => exercise !== entry));
        }
    };

    const handleSaveEntry = () => {
        if (currentEntry.type === 'meal') {
            setMeals(meals.map((meal) => (meal === currentEntry ? currentEntry : meal)));
        } else {
            setExercises(exercises.map((exercise) => (exercise === currentEntry ? currentEntry : exercise)));
        }
        setIsEditing(false);
        setShowModal(false);
    };

    const totalMealCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);
    const totalExerciseCalories = exercises.reduce((acc, exercise) => acc - exercise.calories, 0);
    const netCalories = totalMealCalories + totalExerciseCalories;

    const chartData = {
        labels: ['Meals', 'Exercises'],
        datasets: [
            {
                label: 'Calories',
                data: [totalMealCalories, Math.abs(totalExerciseCalories)],
                backgroundColor: ['#007bff', '#28a745'],
            },
        ],
    };

    return (
        <Container className="my-5">
            <Row>
                <Col md={6}>
                    <Card className="p-4 shadow bg-light text-dark mb-4">
                        <Card.Title className="text-center mb-4">Meal Log</Card.Title>
                        <Form>
                            <Form.Group controlId="formMealName">
                                <Form.Label>Meal Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={mealName}
                                    onChange={(e) => setMealName(e.target.value)}
                                    placeholder="Enter meal name"
                                />
                            </Form.Group>
                            <Form.Group controlId="formCalories" className="mt-3">
                                <Form.Label>Calories</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={calories}
                                    onChange={(e) => setCalories(e.target.value)}
                                    placeholder="Enter calories"
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                className="w-100 mt-3"
                                onClick={handleAddMeal}
                            >
                                Add Meal
                            </Button>
                        </Form>
                    </Card>
                    <Card className="p-4 shadow bg-light text-dark">
                        <Card.Title className="text-center mb-4">Exercise Log</Card.Title>
                        <Form>
                            <Form.Group controlId="formExerciseName">
                                <Form.Label>Exercise Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={exerciseName}
                                    onChange={(e) => setExerciseName(e.target.value)}
                                    placeholder="Enter exercise name"
                                />
                            </Form.Group>
                            <Form.Group controlId="formExerciseCalories" className="mt-3">
                                <Form.Label>Calories Burned</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={exerciseCalories}
                                    onChange={(e) => setExerciseCalories(e.target.value)}
                                    placeholder="Enter calories burned"
                                />
                            </Form.Group>
                            <Button
                                variant="success"
                                className="w-100 mt-3"
                                onClick={handleAddExercise}
                            >
                                Add Exercise
                            </Button>
                        </Form>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="p-4 shadow bg-light text-dark mb-4">
                        <Card.Title className="text-center mb-4">Daily Totals</Card.Title>
                        <Card.Body>
                            <Card.Text>Daily Goal: {dailyGoal} kcal</Card.Text>
                            <Card.Text>Total Meal Calories: {totalMealCalories} kcal</Card.Text>
                            <Card.Text>Total Exercise Calories: {Math.abs(totalExerciseCalories)} kcal</Card.Text>
                            <Card.Text>Net Calories for the Day: {netCalories} kcal</Card.Text>
                            <ProgressBar now={netCalories} max={dailyGoal} label={`${netCalories} kcal`} />
                            <h5 className="mt-4">Meals</h5>
                            <TransitionGroup component="ul" className="list-group">
                                {meals.map((meal, index) => (
                                    <CSSTransition key={index} timeout={500} classNames="fade">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            {meal.name}: {meal.calories} kcal
                                            <div>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    onClick={() => handleEditEntry(meal, 'meal')}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    className="ms-2"
                                                    onClick={() => handleDeleteEntry(meal, 'meal')}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </li>
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                            <h5 className="mt-4">Exercises</h5>
                            <TransitionGroup component="ul" className="list-group">
                                {exercises.map((exercise, index) => (
                                    <CSSTransition key={index} timeout={500} classNames="fade">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            {exercise.name}: {exercise.calories} kcal
                                            <div>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    onClick={() => handleEditEntry(exercise, 'exercise')}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    className="ms-2"
                                                    onClick={() => handleDeleteEntry(exercise, 'exercise')}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </li>
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                        </Card.Body>
                    </Card>
                    <Card className="p-4 shadow bg-light text-dark">
                        <Card.Title className="text-center mb-4">Calorie Chart</Card.Title>
                        <Line data={chartData} />
                    </Card>
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formEditName">
                            <Form.Label>{currentEntry?.type === 'meal' ? 'Meal Name' : 'Exercise Name'}</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentEntry?.name || ''}
                                onChange={(e) => setCurrentEntry({ ...currentEntry, name: e.target.value })}
                                placeholder={`Enter ${currentEntry?.type === 'meal' ? 'meal' : 'exercise'} name`}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditCalories" className="mt-3">
                            <Form.Label>Calories</Form.Label>
                            <Form.Control
                                type="number"
                                value={currentEntry?.calories || ''}
                                onChange={(e) => setCurrentEntry({ ...currentEntry, calories: parseInt(e.target.value, 10) })}
                                placeholder="Enter calories"
                            />
                        </Form.Group>
                        <Button variant="primary" className="w-100 mt-3" onClick={handleSaveEntry}>
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default WorkoutPlanner;
