import * as React from 'react';
import 'bulma/css/bulma.css';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './signUpModal.css';

interface ModalShow {
    onHide: any,
    show: boolean,
    eventid: string,
    city: string,
    eventdate: string
}

class SignUpModal extends React.Component<ModalShow, {}>{
    signUpMethod(thisEvent: any) {
        /*axios.post(`http://localhost:4000/myevents`, { id: thisEvent.props.eventid })
            .then(res => {
                console.log(res.data);
            })*/
        var myevents: string[] = [];
        var addMyevent = localStorage.getItem('myevents');
        if (addMyevent != null) {
            myevents = JSON.parse(addMyevent);
        }

        var found = myevents.find(function (element) {
            return element === thisEvent.props.eventid;
        });
        if (found !== thisEvent.props.eventid) {
            myevents.push(thisEvent.props.eventid);
        }
        localStorage.setItem("myevents", JSON.stringify(myevents));
        thisEvent.props.onHide();

    }

    render() {
        return (
            <Modal
                {...this.props}
                backdrop={false}
                dialogClassName="modal-50w"
                aria-labelledby="contained-modal-title-vcenter"
                className="Modal-Style"
                centered
            >
                <Modal.Header closeButton className="Modal-Header">
                    <Modal.Title id="contained-modal-title-vcenter" className="Modal-title">
                        Join the event
                </Modal.Title>
                </Modal.Header>
                <Modal.Body className="Modal-body">
                    <p>You're about to sign up for Top Frontend Frameworks. This event takes place the {this.props.eventdate} in {this.props.city}.
                </p>
                    <br />
                    <p>Are you sure?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.onHide}>Cancel</Button>
                    <Button variant="primary" onClick={() => this.signUpMethod(this)}>Join</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default SignUpModal;