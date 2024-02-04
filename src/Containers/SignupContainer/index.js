import SpinnerComponent from '@/Components/Spinner/Spinner';
import { signUpUser } from '@/api/auth';
import { COOKIE_TOKEN_KEY } from '@/utils/constants';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

const SignupContainer = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [credentials, setCredentials] = useState({
    name:"",
    email: "",
    password: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    const signupDetails = await signUpUser(credentials);
    if (!signupDetails) {
      toast("Something Went Wrong, Please Try Again", { type: "error" });
      return;
    }
    setIsSubmitting(true);

    Cookies.set(COOKIE_TOKEN_KEY, signupDetails.token);
    router.replace("/login");
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  if (isSubmitting) {
    return <SpinnerComponent />;
  }
  return (
    <Container>
      <Row>
        <Col>
          <Card
            style={{
              marginTop: 100,
              padding: 40,
              textAlign: "center",
            }}
          >
            <h4>Signup</h4>
            <p>Enter your Details to Create a account</p>

            <Form onSubmit={submitHandler}>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={credentials.name}
                onChange={onChange}
                name="name"
                required
                style={{
                  marginBottom: 15,
                }}
              />
              <Form.Control
                type="text"
                placeholder="Enter Email"
                value={credentials.email}
                onChange={onChange}
                name="email"
                required
              />
              <Form.Control
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={onChange}
                name="password"
                autoComplete="off"
                required
                style={{
                  marginTop: 15,
                }}
              />
              <Button
                style={{
                  marginTop: 15,
                }}
                type="submit"
                variant="dark"
              >
                Create Account
              </Button>
            </Form>
            <div
              style={{
                margin: 10,
                textAlign: "end",
              }}
            >
              Already have an account? &nbsp;
              <Link
                href="/login"
                style={{ color: "purple", fontWeight: "bold" }}
              >
                Log In
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignupContainer