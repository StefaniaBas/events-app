import * as React from 'react';
import EventsPerDay from '../components/EventsPerDay/eventsPerDay';
import Filters from '../components/Filters/filters';
import moment from 'moment';
import streams from '../apis/streams';

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
    isLoaded: boolean,
    signUp: boolean,
    search: string,
    searchIsFree: string,
    searchStartHour: string,
    searchEndHour: string
}

class AllEvents extends React.Component<{}, State>{
    constructor(props: any) {
        super(props);
        this.state = {
            events: [],
            cities: [],
            isLoaded: false,
            signUp: true, 
            search: '',
            searchIsFree: '',
            searchStartHour: '00:00',
            searchEndHour: '24:00'
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
    }

    CityByName(cityName: string) {
        var city=new Set<Number>([]);

        this.state.cities.map(function (item, i) {
            if (item.name.toLocaleLowerCase().includes(cityName.toLowerCase())) {
                city.add(item.id);
            }
        })
        return Array.from(city);
    }

    handleNameOrCity = (e:React.FormEvent<HTMLInputElement>)=>{
        this.setState({search: e.currentTarget.value})
    }

    handleIsFree = (e2:React.FormEvent<HTMLInputElement>)=>{
        this.setState({searchIsFree: e2.currentTarget.value});
    }
    
    handleHour = (e3:React.FormEvent<HTMLInputElement>)=>{
        this.setState({
            searchStartHour: e3.currentTarget.value.split("-", 2)[0],
        searchEndHour: e3.currentTarget.value.split("-", 2)[1]
            });
            
    }

    isBetweenHours(date:Date){
        var format = 'HH:mm';
        var time = moment(moment.utc(date.toString()).format('HH:mm'), format);
        var  beforeTime = moment(this.state.searchStartHour, format);
        var afterTime = moment(this.state.searchEndHour, format);
        if (beforeTime.hour() >=12 && afterTime.hour() <=12 )
            {
                afterTime.add(1, "days");     
                if (time.hour() <=12) {
                    time.add(1, "days");   
                }
            }
        return time.isBetween(beforeTime,afterTime);
    }

    render() {

        var { events, cities, isLoaded } = this.state;
        return (
            <div >
                <Filters handleNameOrCity={this.handleNameOrCity} handleIsFree={this.handleIsFree} handleHour={this.handleHour} />
                <EventsPerDay signUp={this.state.signUp} events={events.filter(event => 
                    (this.CityByName(this.state.search).find(city => city === event.city)  || event.name.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase())) 
                    && (this.state.searchIsFree==="Free"?event.isFree===true:(event.isFree===true || event.isFree===false))  
                    && this.isBetweenHours(event.startDate) )  } cities={cities} isLoaded={true} />
            </div>
        );

    }

}

export default AllEvents;