import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';
import './Dropcalculator.css';  // Import the custom CSS file

const Dropcalculator = () => {
  const [costPrice, setCostPrice] = useState('');
  const [shippingCost, setShippingCost] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [otherCosts, setOtherCosts] = useState('');
  const [profit, setProfit] = useState(null);
  const [profitMargin, setProfitMargin] = useState(null);
  const [error, setError] = useState('');

  const calculateProfit = () => {
    if (!costPrice || !shippingCost || !sellingPrice || !otherCosts) {
      setError('Please fill in all fields with valid numbers');
      return;
    }

    const totalCost = parseFloat(costPrice) + parseFloat(shippingCost) + parseFloat(otherCosts);
    const profitAmount = parseFloat(sellingPrice) - totalCost;
    const profitMarginPercentage = (profitAmount / parseFloat(sellingPrice)) * 100;

    setProfit(profitAmount);
    setProfitMargin(profitMarginPercentage);
    setError('');
  };

  const resetFields = () => {
    setCostPrice('');
    setShippingCost('');
    setSellingPrice('');
    setOtherCosts('');
    setProfit(null);
    setProfitMargin(null);
    setError('');
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props}
    </Tooltip>
  );

  return (
    <Container className="calculator-container">
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2 className="calculator-title">Dropship Profit Calculator</h2>
          <Form>
            <Form.Group controlId="costPrice">
              <Form.Label>
                Cost Price
                <OverlayTrigger
                  placement="right"
                  overlay={renderTooltip('The cost of the product from the supplier')}
                >
                  <FaInfoCircle className="tooltip-icon" />
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="number"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="shippingCost">
              <Form.Label>
                Shipping Cost
                <OverlayTrigger
                  placement="right"
                  overlay={renderTooltip('The cost of shipping the product to the customer')}
                >
                  <FaInfoCircle className="tooltip-icon" />
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="number"
                value={shippingCost}
                onChange={(e) => setShippingCost(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="sellingPrice">
              <Form.Label>
                Selling Price
                <OverlayTrigger
                  placement="right"
                  overlay={renderTooltip('The price at which you are selling the product')}
                >
                  <FaInfoCircle className="tooltip-icon" />
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="otherCosts">
              <Form.Label>
                Other Costs (e.g., marketing)
                <OverlayTrigger
                  placement="right"
                  overlay={renderTooltip('Other associated costs such as marketing, handling, etc.')}
                >
                  <FaInfoCircle className="tooltip-icon" />
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="number"
                value={otherCosts}
                onChange={(e) => setOtherCosts(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={calculateProfit} className="calculator-button">
              Calculate Profit
            </Button>
            <Button variant="secondary" onClick={resetFields}>
              Reset
            </Button>
          </Form>

          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}

          {profit !== null && (
            <div className="mt-3">
              <div className="output-container bounce">
                <h4>Profit: ${profit.toFixed(2)}</h4>
                <h5>Profit Margin: {profitMargin.toFixed(2)}%</h5>
              </div>
              <div className="cost-breakdown">
                <h5>Cost Breakdown:</h5>
                <ul>
                  <li>Cost Price: ${costPrice}</li>
                  <li>Shipping Cost: ${shippingCost}</li>
                  <li>Other Costs: ${otherCosts}</li>
                  <li>Total Cost: ${(parseFloat(costPrice) + parseFloat(shippingCost) + parseFloat(otherCosts)).toFixed(2)}</li>
                </ul>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Dropcalculator;



