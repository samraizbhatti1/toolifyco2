import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';


function Privacy() {
  return (
    <div>
   
        <Container>
      <Row className="justify-content-center my-5">
        <Col md={10}>
          <h1>Privacy Policy</h1>
          <p><strong>Effective Date: July 21,2024</strong></p>
          <p>
            Welcome to Toolifyco ("we", "our", "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="http://www.toolifyco.com">www.toolifyco.com</a> (the "Site"). Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Site.
          </p>

          <h2>1. Information We Collect</h2>
          
          <h3>1.1. Personal Data</h3>
          <p>
            We may collect personally identifiable information, such as your name, email address, and other contact details that you voluntarily provide when you use our services or contact us for support.
          </p>

          <h3>1.2. Usage Data</h3>
          <p>
            We automatically collect certain information when you visit, use, or navigate the Site. This information may include your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Site.
          </p>

          <h3>1.3. Cookies and Tracking Technologies</h3>
          <p>
            We use cookies and similar tracking technologies to track the activity on our Site and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.
          </p>

          <h2>2. Use of Your Information</h2>
          <p>
            We may use the information we collect from you in the following ways:
          </p>
          <ul>
            <li>To operate, maintain, and improve our Site.</li>
            <li>To understand and analyze how you use our Site.</li>
            <li>To develop new products, services, features.</li>
          </ul>
        </Col>
      </Row>
    </Container>
     
    </div>
  )
}

export default Privacy