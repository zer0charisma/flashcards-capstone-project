import { Link } from "react-router-dom";

// function for the Nav bar that shows the link to Home and renders any child components 
function Navigation(props) {
    return (
        <nav>
            <ul>
                <li><Link to="/"> Home</Link></li>
                <li>/</li>
                {props.children}
            </ul>
        </nav>
    )
}

export default Navigation;