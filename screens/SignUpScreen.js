import React from 'react'

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Row, Col, Button,} from "react-bootstrap";

// Local Css
import '../css/screens/signupscreen.css'

import FormContainer from "../components/FormContainer";

export default function SignUpScreen({ location }) {

    /* SETTING UP REDIRECT */
    const redirect = location.search ? location.search.split("=")[1] : "/";

    return (
        <FormContainer>

            <div className='text-center'>
                <h1 className='text-dark p-2'>Sign Up Now</h1>
                <p className='fw-bold'>Collect Information,payments and signatures with custom online forms</p>
                <div className="d-grid gap-2">
                    <Button type="submit" className="my-3 p-4" style={{ backgroundColor: "#004de6" }}>
                        <Link to="/register" className='link h5'>
                            <i className='fab fa-google fa-2x'></i> Sign up with Google
                        </Link>
                    </Button>
                    <Button type="submit" className="my-3 p-4" style={{ backgroundColor: "#001133" }}>
                        <Link to="#" className='link h5'>
                            <i className='fab fa-facebook fa-2x'></i> Sign up with Facebook
                        </Link>
                    </Button>
                </div>
                <p className='text-center fw-bold h3 my-3'>or</p>
                <div className="d-grid gap-2">
                    <Button type="submit" className="p-4" style={{ backgroundColor: " #ff3300" }}>
                        <Link to="/register" className='link h5'>
                            <i className='fas fa-registered fa-2x'></i> Create New Account
                        </Link>
                    </Button>
                </div>
                <Row className="py-3">
                    <Col>
                        Have an Account ?{" "}
                        <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                            Sign In
                        </Link>
                    </Col>
                </Row>
            </div>
        </FormContainer>
    )
}
