import { useState } from "react";
import { useRouter } from "next/router";
import { COOKIE_TOKEN_KEY } from "@/utils/constants";
import Cookies from "js-cookie";
import { Form, Row, Col, Button, Container, Card } from "react-bootstrap";
import Link from "next/link";
import { loginUser } from "@/api/auth";
import SpinnerComponent from "@/Components/Spinner/Spinner";
import { toast } from "react-toastify";


const LoginContainer = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const loginDetails = await loginUser(credentials);
    if (!loginDetails) {
      toast("Something Went Wrong, Please Try Again", { type: "error" });
      return;
    }
    setIsSubmitting(true);

    Cookies.set(COOKIE_TOKEN_KEY, loginDetails.token);
    router.replace("/");
       

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
            <h4>Login</h4>
            <p>Enter your Credentials to access your account</p>

            <Form onSubmit={submitHandler}>
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
                  marginTop: 10,
                }}
              />
              <Button
                style={{
                  marginTop: 10,
                }}
                type="submit"
                variant="dark"
              >
                Login
              </Button>
            </Form>
            <div
              style={{
                margin: 10,
                textAlign: "end",
              }}
            >
              Don&apos;t have an account? &nbsp;
              <Link
                style={{ color: "purple", fontWeight: "bold" }}
                href="/signup"
              >
                Sign Up
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginContainer;
