import { useState, useEffect, useContext } from 'react'
import authContext from '../../context/auth/authContext'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import './Header.css'
import '../../styles/colors-palette.css'
import { Container, Col, Row } from 'react-bootstrap'
import logoclaro from "./../../images/logorecortadoclaro.png"
import logooscuro from "./../../images/logorecortado.png"
import SearchBar from '../SearchBar/SearchBar'
import UserMenu from '../UserMenu/UserMenu'
import LoginForm from '../LoginForm/LoginForm';


const Header = ({ dayHour }) => {
    const {user}=useContext(authContext);
    const [show, setShow] = useState(false);
    let dayClassContainer = '';
    let dayClassLink = '';
    let logo = '';
    let tema = '';

    if (dayHour >= 7 && dayHour < 19) {
        dayClassContainer = 'bg-color1 navbar-container';
        dayClassLink = 'navbar-link-claro color4';
        tema='claro'
        logo = logooscuro;
    } else {
        dayClassContainer = 'bg-color4 navbar-container';
        dayClassLink = 'navbar-link-oscuro color2';
        tema='oscuro'
        logo = logoclaro;
    }

    if (!user) {
        return (
            <>
                <LoginForm show={show} handleClose={setShow} />
                <Container fluid className={dayClassContainer}>
                    <Row>
                        <Col xs={6} md={9}>
                            <Navbar sticky="top" className="py-0">
                                <Navbar.Brand href="/" className="py-0" >
                                    <img
                                        alt="Logo"
                                        src={logo}
                                        height="60"
                                        className="d-inline-block align-top"
                                    />
                                </Navbar.Brand>
                            </Navbar>
                        </Col>
                        <Col xs={6} md={3} className="container-login-button">
                        <div className="modalLoginApp">
                            <button className={`login-button-${tema}`} onClick={() => setShow(true)}> Log In </button>
                        </div>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
    else {
        return (
            <>
                <Container fluid className={dayClassContainer}>
                    <Row>
                        <Col md={4}>
                            <Navbar sticky="top" className="py-0">
                                <Navbar.Brand href="/" className="py-0" >
                                    <img
                                        alt="Logo"
                                        src={logo}
                                        height="60"
                                        className="d-inline-block align-top"
                                    />
                                </Navbar.Brand>
                            </Navbar>
                        </Col>
                        <Col md={4} className="py-0">
                            <SearchBar dayHour={dayHour} />
                        </Col>
                        <Col md={4}>
                            <UserMenu dayHour={dayHour} user={user} />
                        </Col>
                    </Row>
                    <Row className="justify-content-center"> {/*usar new Date().getHours() para tema oscuro*/}
                        <Link className={dayClassLink} to="/home">Home</Link>
                        <Link className={dayClassLink} to="/">Featured</Link>
                        <Link className={dayClassLink} to="/">Categories</Link>
                        <Link className={dayClassLink} to="/">Contact</Link>
                        <Link className={dayClassLink} to="/">Help</Link>
                    </Row>
                </Container>
            </>
        );
    }
}
export default Header