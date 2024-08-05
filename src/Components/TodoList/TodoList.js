import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaDownload } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TodoList.css'; // Import your CSS file if needed

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedTodo, setEditedTodo] = useState('');
    const [error, setError] = useState('');

    const addTodo = () => {
        if (newTodo.trim() === '') {
            setError('Todo cannot be empty');
            return;
        }
        setTodos([...todos, newTodo]);
        setNewTodo('');
        setError('');
    };

    const editTodo = (index) => {
        setEditingIndex(index);
        setEditedTodo(todos[index]);
    };

    const updateTodo = () => {
        if (editedTodo.trim() === '') {
            setError('Todo cannot be empty');
            return;
        }
        const updatedTodos = todos.map((todo, index) => (index === editingIndex ? editedTodo : todo));
        setTodos(updatedTodos);
        setEditingIndex(null);
        setEditedTodo('');
        setError('');
    };

    const deleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };

    const downloadTodos = () => {
        const blob = new Blob([todos.join('\n')], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'todos.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <div className="text-center mb-4">
                        <h2>Todo List</h2>
                    </div>
                    <Form>
                        <Form.Group controlId="formNewTodo">
                            <Form.Label>Add a new todo</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="Enter new todo"
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            className="w-100 mt-3"
                            onClick={addTodo}
                        >
                            <FaPlus /> Add Todo
                        </Button>
                    </Form>

                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                    <ListGroup className="mt-4">
                        {todos.map((todo, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                {editingIndex === index ? (
                                    <div className="d-flex align-items-center">
                                        <Form.Control
                                            type="text"
                                            value={editedTodo}
                                            onChange={(e) => setEditedTodo(e.target.value)}
                                            placeholder="Edit todo"
                                        />
                                        <Button
                                            variant="success"
                                            className="ms-2"
                                            onClick={updateTodo}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                ) : (
                                    <span>{todo}</span>
                                )}
                                <div>
                                    <Button
                                        variant="warning"
                                        className="ms-2"
                                        onClick={() => editTodo(index)}
                                    >
                                        <FaEdit />
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="ms-2"
                                        onClick={() => deleteTodo(index)}
                                    >
                                        <FaTrash />
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    {todos.length > 0 && (
                        <div className="text-center mt-4">
                            <Button
                                variant="secondary"
                                onClick={downloadTodos}
                            >
                                <FaDownload /> Download Todos
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default TodoList;

