import * as React from 'react';
import 'bulma/css/bulma.css';
import { NavLink } from "react-router-dom";
import './menuItem.css';

interface Item {
    name: string;
    path: string;
}

class MenuItem extends React.Component<Item, {}>{
    render() {
        return (
            <div className="nav-link">
                <NavLink className="inactive" activeClassName="active" to={this.props.path}><span >{this.props.name}</span></NavLink>
            </div>
        );
    }

}

export default MenuItem;