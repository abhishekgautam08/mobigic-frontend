import { logoutUser } from "@/api/auth";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const NavbarComponent = () => {
  const router = useRouter();

  const logout = () => {
    logoutUser();
    router.replace("/login");
  };

  return (
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" style={{ fontWeight: "bolder" }}>
          MobigicTest
        </Navbar.Brand>
        <Button variant="dark" onClick={logout}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
