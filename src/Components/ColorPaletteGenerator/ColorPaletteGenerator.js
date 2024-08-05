import React, { useState } from 'react';
import { Container, Card, InputGroup, FormControl, Button, Modal, ListGroup, Toast } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FaSave, FaTrash, FaDownload } from 'react-icons/fa';
import { SketchPicker } from 'react-color';
import './ColorPaletteGenerator.css';

const ColorPaletteGenerator = () => {
    const [colors, setColors] = useState([]);
    const [color, setColor] = useState('#000000');
    const [showPaletteModal, setShowPaletteModal] = useState(false);
    const [paletteName, setPaletteName] = useState('');
    const [palettes, setPalettes] = useState([]);
    const [showToast, setShowToast] = useState(false);

    const handleAddColor = () => {
        if (!colors.includes(color)) {
            setColors([...colors, color]);
        }
    };

    const handleSavePalette = () => {
        if (paletteName && colors.length) {
            setPalettes([...palettes, { name: paletteName, colors }]);
            setColors([]);
            setPaletteName('');
            setShowPaletteModal(false);
            setShowToast(true);
        }
    };

    const handleDeletePalette = (paletteToDelete) => {
        setPalettes(palettes.filter((palette) => palette !== paletteToDelete));
    };

    const handleExportPalette = (palette) => {
        const blob = new Blob([JSON.stringify(palette, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${palette.name}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <Container className="my-5">
            <Card className="p-4 shadow bg-light text-dark mb-4">
                <Card.Title className="text-center mb-4">Color Palette Generator</Card.Title>
                <InputGroup>
                    <SketchPicker
                        color={color}
                        onChangeComplete={(color) => setColor(color.hex)}
                        className="color-picker"
                    />
                    <Button variant="primary" onClick={handleAddColor}>Add Color</Button>
                </InputGroup>
                <div className="mt-3">
                    <TransitionGroup component="div" className="color-list">
                        {colors.map((color, index) => (
                            <CSSTransition key={index} timeout={500} classNames="fade">
                                <div className="color-box" style={{ backgroundColor: color }}></div>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                <Button
                    variant="success"
                    className="w-100 mt-3"
                    onClick={() => setShowPaletteModal(true)}
                    disabled={colors.length === 0}
                >
                    <FaSave /> Save Palette
                </Button>
            </Card>

            <Modal show={showPaletteModal} onHide={() => setShowPaletteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Save Color Palette</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <FormControl
                            type="text"
                            value={paletteName}
                            onChange={(e) => setPaletteName(e.target.value)}
                            placeholder="Enter palette name"
                        />
                        <Button variant="success" onClick={handleSavePalette}>
                            <FaSave /> Save Palette
                        </Button>
                    </InputGroup>
                </Modal.Body>
            </Modal>

            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide
                className="mt-3"
            >
                <Toast.Body>Palette saved successfully!</Toast.Body>
            </Toast>

            <h5 className="mt-5">Saved Palettes</h5>
            <ListGroup>
                {palettes.map((palette, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                        <span>{palette.name}</span>
                        <div className="d-flex align-items-center">
                            {palette.colors.map((color, colorIndex) => (
                                <span key={colorIndex} className="color-box-sm" style={{ backgroundColor: color }}></span>
                            ))}
                            <Button
                                variant="danger"
                                size="sm"
                                className="ms-2"
                                onClick={() => handleDeletePalette(palette)}
                            >
                                <FaTrash />
                            </Button>
                            <Button
                                variant="info"
                                size="sm"
                                className="ms-2"
                                onClick={() => handleExportPalette(palette)}
                            >
                                <FaDownload />
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default ColorPaletteGenerator;
