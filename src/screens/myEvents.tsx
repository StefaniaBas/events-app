import * as React from 'react';
import EventsPerDay from '../components/EventsPerDay/eventsPerDay';
import { Row, Col } from 'react-bootstrap';
import streams from '../apis/streams';
import './styles.css';

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
export interface MyEvent {
    id: number;
}

interface State {
    events: Event[],
    cities: City[],
    isLoaded: boolean,
    signUp: boolean,
    myevents: MyEvent[]
}

class MyEvents extends React.Component<{}, State>{
    constructor(props: any) {
        super(props);
        this.state = {
            events: [],
            cities: [],
            isLoaded: false,
            signUp: false,
            myevents: [],
        };
    }

    componentDidMount() {
        streams.get(`/events`)
            .then(res => res.data)
            .then(json => {
                this.setState({
                    events: json,
                    isLoaded: true
                })
            })
        streams.get(`/cities`)
            .then(res => res.data)
            .then(json => {
                this.setState({
                    cities: json,
                    isLoaded: true
                })
            })
        var myeventsarray = localStorage.getItem('myevents');
        if (myeventsarray != null) {
            this.setState({ myevents: JSON.parse(myeventsarray) });
        } else {
            this.setState({ myevents: [] });
        }
    }

    render() {
        var { events, cities, isLoaded, myevents } = this.state;

        return (
            <div >
                <div>
                    <Row>
                        <Col>
                            <h1 className="Myevents-title" >My next tech events</h1>
                        </Col>
                    </Row>
                    <EventsPerDay signUp={this.state.signUp} events={events.filter(event =>
                        myevents.find(myevent => myevent.toString() === event.id.toString()))} cities={cities} isLoaded={true} />
                </div>
            </div>
        );

    }

}

export default MyEvents;