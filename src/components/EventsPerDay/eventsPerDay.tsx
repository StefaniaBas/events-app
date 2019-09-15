import * as React from 'react';
import 'bulma/css/bulma.css';
import EventComponent from '../Event/event';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import './eventsPerDay.css';
import moment from 'moment';

export interface City {
    id: number;
    name: string;
}

export interface Event {
    id: number;
    isFree: boolean;
    name: string;
    city: number;
    startDate: Date;
    endDate: Date;
}

interface State {
    events: Event[],
    cities: City[],
    isLoaded: boolean
}

interface Props {
    events: Event[],
    cities: City[],
    isLoaded: boolean,
    signUp: boolean
}

class EventsPerDay extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            events: [],
            cities: [],
            isLoaded: false,
        };
    }

    render() {
        var { events, cities, isLoaded, signUp } = this.props;
        const dates=new Set<String>([]);
        {events.map(item => (dates.add(moment.utc(item.startDate.toString()).format("dddd Do MMMM"))) )};
        
        if (!isLoaded) {
            return <div> Loading... </div>
        } else {
            return (
                <Container className="Container-style" >
                    {Array.from(dates)
                    .map((thedate , i)=> (
                        <div key={i}>
                        <Container className="ContainerDate-style">
                            <Row className="Date-row">
                                <Col lg={5} md={12}>
                                    <div className="Date-style float-left" >
                                        {thedate}</div>
                                </Col>
                            </Row>
                        </Container>
                            <ListGroup>
                                {events
                                    .filter(event => moment.utc(event.startDate).format("dddd Do MMMM") === thedate)
                                    .map(eventsPerDay => (
                                        <div key={eventsPerDay.id}>
                                        <EventComponent eventsPerDay={eventsPerDay} cities={this.props.cities} signUp={this.props.signUp} /></div>
                                    ))}
                            </ListGroup>
                            <br />
                        </div>
                    ))}
                </Container>
            );
        }
    }

}

export default EventsPerDay;