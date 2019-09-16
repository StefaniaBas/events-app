import React, { FunctionComponent }  from 'react';
import 'bulma/css/bulma.css';
import { NavLink } from "react-router-dom";
import './menuItem.css';

interface Item {
    name: string;
    path: string;
}
 
export const MenuItem:FunctionComponent<Item>  = ({name, path}) => 
<div className="nav-link">
    <NavLink className="inactive" activeClassName="active" to={path}><span >{name}</span></NavLink>
</div>