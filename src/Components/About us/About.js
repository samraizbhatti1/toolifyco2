import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';


function About() {
  return (
    <div>
         <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10} className="text-center">
          <h1>About Us</h1>
          <p>
            Welcome to Toolifyco! We are dedicated to providing you with a wide range of useful online tools to enhance your productivity and simplify your daily tasks. Our mission is to make high-quality tools accessible to everyone, ensuring they are easy to use and available at your fingertips.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col md={5} className="text-center">
          <Image src="pic1.jpg" rounded fluid className="about-image" />
        </Col>
        <Col md={5} className="d-flex flex-column justify-content-center">
          <h2>Our Vision</h2>
          <p>
            At Toolifyco, our vision is to become the go-to platform for online tools that cater to a variety of needs. We strive to continuously innovate and improve our offerings to meet the ever-evolving demands of our users. We believe that with the right tools, everyone can achieve their goals more efficiently and effectively.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col md={5} className="d-flex flex-column justify-content-center">
          <h2>Our Team</h2>
          <p>
            Our team is composed of passionate individuals with diverse backgrounds in technology, design, and customer service. We are united by our commitment to quality and our desire to create tools that genuinely help people. We work tirelessly to ensure that each tool we offer is reliable, user-friendly, and valuable to our users.
          </p>
        </Col>
        <Col md={5} className="text-center">
          <Image src="pic2.jpg" rounded fluid className="about-image" />
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col md={10} className="text-center">
          <h2>Contact Us</h2>
          <p>
            If you have any questions, feedback, or suggestions, we would love to hear from you. Please feel free to reach out to us at <a href="samraizbhatti06@gmail.com">samraizbhatti06@gmail.com</a>. Your input is invaluable to us as we continue to improve and expand our range of tools.
          </p>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default About