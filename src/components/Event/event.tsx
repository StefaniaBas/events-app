import * as React from 'react';
import 'bulma/css/bulma.css';
import Moment from 'react-moment';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import SignUpModal from '../SignUpModal/signUpModal';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import './event.css';

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

interface Props {
    eventsPerDay: Event,
    cities: City[],
    signUp: boolean
}

interface State {
    modalShow: boolean,
    eventId: string,
    signUp: boolean,
    cancel: boolean,
    city: string,
    eventDate: string,
    myevents: string[]
}

class EventComponent extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            modalShow: false,
            eventId: '',
            signUp: this.props.signUp,
            cancel: false,
            city: '',
            eventDate: '',
            myevents: []
        };
    }

    CityById(cityId: string, cities: City[]) {
        var city:string='';
        cities.map(function (item, i) {
            if (cityId === item.id.toString()) {
                city = item.name;
            }
        })
        return city;
    }

    signUpOrCancel(myEventId: number) {
        if (this.state.signUp === false) {
                var myeventsArray:string[] = [];
                var myeventStorage = localStorage.getItem('myevents');
                if(myeventStorage!=null){
                    myeventsArray=JSON.parse(myeventStorage); 
                }
                myeventsArray=myeventsArray.filter(item =>item!== myEventId.toString());
                localStorage.removeItem('myevents');
                localStorage.setItem("myevents",JSON.stringify(myeventsArray));
                window.location.reload();
        } else {
            this.setState({ modalShow: true, eventId: myEventId.toString() })
        }

    }
   
    onMouseHover(cities: City[]){
        if (!this.state.signUp) { 
            this.setState({ cancel: true }) 
        }else{
            this.setState({ 
                city: this.CityById(this.props.eventsPerDay.city.toString(), cities), 
                eventDate: moment.utc(this.props.eventsPerDay.startDate.toString()).format("Do MMMM") 
            }) 
        }
    }
    render() {
        var { eventsPerDay, cities, signUp } = this.props;
        let addModalClose = () => this.setState({ modalShow: false });

        return (
            <div>
                <Container className="Container-style">
                    <ListGroup.Item key={this.props.eventsPerDay.id}>
                        <Row className="justify-content-md-center">
                            <Col lg={1} md={2} sm={2} className="Font-set">
                                <Moment format="HH:mm">
                                    {moment.utc(this.props.eventsPerDay.startDate.toString()).format("LLL")}
                                </Moment>
                            </Col>
                            <Col lg={4} md={3} sm={3}><span className="Font-set">{this.props.eventsPerDay.name}</span></Col>
                            <Col lg={2} md={2} sm={2}><span className="Is-free">{this.props.eventsPerDay.isFree ? 'Free!!!' : ''}</span></Col>
                            <Col lg={4} md={5} sm={5}>
                                <Button variant="primary" className={this.state.cancel ? "float-right Change-color" : "Signup-Button float-right"}
                                    onClick={() => { this.signUpOrCancel(this.props.eventsPerDay.id) }} 
                                    onMouseEnter={() => { this.onMouseHover(cities) }}
                                    onMouseLeave={() => { if (!this.state.signUp) { this.setState({ cancel: false }); } }}
                                     >
                                    {this.state.cancel ? "Cancel" : this.state.signUp ? "Sign up" : "You're in"}
                                </Button>
                            </Col>
                        </Row>
                        <Row >
                            <Col lg={1} md={1} sm={1}></Col>
                            <Col lg={3} md={3} sm={3} className="Sub-header">
                            <span>
                            {this.CityById(this.props.eventsPerDay.city.toString(), cities)} -  {moment(eventsPerDay.endDate).diff(eventsPerDay.startDate, 'hours')} h {moment(eventsPerDay.endDate).diff(eventsPerDay.startDate, 'minutes') % 60} m
                            </span>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </Container>
                <SignUpModal show={this.state.modalShow} onHide={addModalClose} city={this.state.city} eventdate={this.state.eventDate} eventid={this.state.eventId} />
            </div>
        );
    }

}

export default EventComponent;