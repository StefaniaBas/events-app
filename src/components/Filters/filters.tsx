import React, { FunctionComponent } from 'react';
import 'bulma/css/bulma.css';
import { Container, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './filters.css';

interface Props {
    handleNameOrCity: any,
    handleIsFree: any,
    handleHour: any
}

export const Filters:FunctionComponent<Props> = ({handleNameOrCity, handleIsFree, handleHour}) =>
    <Container className="filters">
        <Form>
            <Form.Row>
                <Col lg={4} md={4} sm={12}>
                    <Form.Group controlId="formGridCity" >
                        <Form.Control onChange={handleNameOrCity} placeholder="Search by name or city..." type="text" />
                    </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={12}>
                    <Form.Group controlId="formGridState">
                        <Form.Control as="select" onChange={handleIsFree}>
                            <option value="">All (Free and not)</option>
                            <option value="Free">Free</option>
                        </Form.Control>
                    </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={12}>
                    <Form.Group controlId="formGridState">
                        <Form.Control as="select" onChange={handleHour}>
                            <option value="00:00-24:00">All hours</option>
                            <option value="06:00-12:00">morning(6am - 12 pm)</option>
                            <option value="12:00-17:00">afternoon (12pm - 17pm)</option>
                            <option value="17:00-21:00">evening (17pm - 21pm)</option>
                            <option value="21:00-06:00">night (21pm - 6am)</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Form.Row>
        </Form>
    </Container>

