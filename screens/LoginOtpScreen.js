import React, { useState, useEffect } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Row, Col, Button, Form } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { loginotp } from "../actions/userActions";

// Local Css
import '../css/screens/loginscreen.css';

function LoginOtpScreen({ location, history }) {
    /* STATE */
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");

    const dispatch = useDispatch();

    /* SETTING UP REDIRECT */
    const redirect = location.search ? location.search.split("=")[1] : "/";

    /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
    const userLoginOtp = useSelector((state) => state.userLoginOtp);

    const { userInfo, loading, error } = userLoginOtp;

    /* REDIRECTING AN ALREADY LOGGED IN USER, AS WE DON'T WANT THEM TO SEE THE LOGIN PAGE */
    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    /* HANDLERS */

    const submitHandler = (e) => {
        e.preventDefault();

        /* FIRING OFF THE ACTION CREATORS USING DISPATCH FOR LOGIN */
        dispatch(loginotp(mobile, otp));
    };

    return (
        <FormContainer>
            <h1 className="text-center">Login OTP</h1>

            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="mobile">
                    <Form.Label className="my-2 p-2 text-dark fw-bold">Mobile</Form.Label>
                    <Form.Control
                        type="mobile"
                        placeholder="Enter Mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        id="loginform"
                    />
                </Form.Group>

                <Form.Group controlId="otp">
                    <Form.Label className="my-2 p-2 text-dark fw-bold">OTP</Form.Label>
                    <Form.Control
                        type="otp"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        id="loginform"
                    />
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button type="submit" className="mt-3 text-white" style={{ backgroundColor: "#cc33ff" }}>
                        Login OTP
                    </Button>
                </div>
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer ?{" "}
                    <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
                        Register
                    </Link>
                </Col>
            </Row>
            <Row className="py-3">
                <Col>
                    Have an Account ?{" "}
                    <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                        Sign In
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default LoginOtpScreen;
