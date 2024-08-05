import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Card, Alert } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jsPDF } from "jspdf";
import './ArticleWriter.css';

const ArticleWriter = () => {
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Retrieve article from localStorage on component mount
    const savedArticle = localStorage.getItem('article');
    if (savedArticle) {
      setContent(savedArticle);
      setWordCount(savedArticle.replace(/<\/?[^>]+(>|$)/g, "").split(/\s+/).filter(word => word.length > 0).length);
    }
  }, []);

  const handleContentChange = (value) => {
    setContent(value);
    setWordCount(value.replace(/<\/?[^>]+(>|$)/g, "").split(/\s+/).filter(word => word.length > 0).length);
    setSaved(false);
  };

  const handleSave = () => {
    // Save article to localStorage
    localStorage.setItem('article', content);
    setSaved(true);
  };

  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const plainTextContent = stripHtmlTags(content);
    doc.text(plainTextContent, 10, 10);
    doc.save('article.pdf');
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="p-4 shadow bg-light text-dark">
            <Card.Title className="text-center mb-4 card-title">
              <strong>Article Writing Tool</strong>
            </Card.Title>
            <Form>
              <Form.Group controlId="formContent">
                <ReactQuill
                  value={content}
                  onChange={handleContentChange}
                  placeholder="Write your article here..."
                  modules={{
                    toolbar: [
                      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{ 'align': [] }],
                      ['link', 'image'],
                      ['clean']
                    ],
                  }}
                />
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <span>Word Count: {wordCount}</span>
                <div className="d-flex flex-column w-100">
                  <Button
                    variant="success"
                    className="btn-sm mb-2"
                    onClick={handleSave}
                  >
                    Save Article
                  </Button>
                  <Button
                    variant="primary"
                    className="btn-sm"
                    onClick={downloadPDF}
                  >
                    Download PDF
                  </Button>
                </div>
              </div>
              {saved && <Alert variant="success" className="mt-3">Article saved successfully!</Alert>}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ArticleWriter;

