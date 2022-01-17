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
import { login } from "../actions/userActions";

// Local Css
import '../css/screens/loginscreen.css';

function LoginScreen({ location, history }) {
  /* STATE */
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();

  /* SETTING UP REDIRECT */
  const redirect = location.search ? location.search.split("=")[1] : "/";

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo, loading, error } = userLogin;

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
    dispatch(login(username, password));
  };

  return (
    <FormContainer>
      <h1 className="text-center">Sign In</h1>

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="username" >
          <Form.Label className="my-2 p-2 text-dark fw-bold">Mobile/Email</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter Mobile or Email"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            id="loginform"
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label className="my-2 p-2 text-dark fw-bold">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            id="loginform"
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button type="submit" className="mt-3 text-white" style={{ backgroundColor: "#ff3300" }}>
            Log In
          </Button>
        </div>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer ?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
          <Link to="#" className="mx-3">
            Forgot Password
          </Link>
        </Col>
      </Row>
      <p className='text-center fw-bold h3 my-3'>or</p>
      <div className="d-grid gap-2">
        <Button type="submit" className="p-4 shadow" style={{ backgroundColor: "#f2f2f2" }}>
          <Link to={redirect ? `/otplogin?redirect=${redirect}` : "/otplogin"} className='linkotp h5'>
            Request OTP
          </Link>
        </Button>
      </div>
    </FormContainer>
  );
}

export default LoginScreen;
