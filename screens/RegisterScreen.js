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
import { register } from "../actions/userActions";

// Local CSS
import "../css/screens/registerscreen.css"

function RegisterScreen({ location, history }) {
  /* STATE */

  const [username, setusername] = useState("");
  const [fullname, setfullname] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  /* SETTING UP REDIRECT */
  const redirect = location.search ? location.search.split("=")[1] : "/";

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const userRegister = useSelector((state) => state.userRegister);

  const { userInfo, loading, error } = userRegister;

  /* REDIRECTING AN ALREADY LOGGED IN USER, AS WE DON'T WANT THEM TO SEE THE LOGIN PAGE */
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  /* HANDLERS */

  const submitHandler = (e) => {
    e.preventDefault();

    /* DISABLE SUBMIT IF PASSWORDS DON'T MATCH */
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      /* FIRING OFF THE ACTION CREATORS USING DISPATCH FOR REGISTER */
      dispatch(register(username,fullname ,email, mobile, password));

    }
  };

  return (
    <FormContainer>
      <h1 className="text-center">Create Account</h1>

      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>


        <Form.Group controlId="username">
          <Form.Label className="text-dark mt-2 fw-bold">Username</Form.Label>
          <Form.Control
            required
            type="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            id="form"
          />
        </Form.Group>

        <Form.Group controlId="fullname">
          <Form.Label className="text-dark mt-2 fw-bold">Fullname</Form.Label>
          <Form.Control
            required
            type="fullname"
            placeholder="Enter Fullname"
            value={fullname}
            onChange={(e) => setfullname(e.target.value)}
            id="form"
          />
        </Form.Group>

        <Form.Group controlId="mobile">
          <Form.Label className="text-dark mt-2 fw-bold">Mobile Number</Form.Label>
          <Form.Control
            required
            type="mobile"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setmobile(e.target.value)}
            id="form"
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label className="text-dark mt-2 fw-bold">Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="form"
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label className="text-dark mt-2 fw-bold">Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            id="form"
          />
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <Form.Label className="text-dark mt-2 fw-bold">Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="form"
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button type="submit" className="mt-3 button text-dark fw-bold">
            Continue
          </Button>
        </div>
      </Form >

      <Row className="py-3">
        <Col>
          Have an Account ?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign In
          </Link>
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          Login OTP?{" "}
          <Link to={redirect ? `/otplogin?redirect=${redirect}` : "/otplogin"}>
            Otp Login
          </Link>
        </Col>
      </Row>
    </FormContainer >
  );
}

export default RegisterScreen;
