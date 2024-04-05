import React, { useState } from 'react';
import { Container, Row, Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './stylesheets/SignUpSquare.css';
import axios from 'axios';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const SignupSquare: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({ username: "", email: ""});
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usernameResponse = await axios.get('http://localhost:8080/auth/usernameExists/' + username);
    const emailResponse = await axios.get('http://localhost:8080/auth/emailExists/' + email);

    let newErrors = { username: "", email: ""};

    if (usernameResponse.data.exists) {
        newErrors.username = 'Username already exists.';
    }

    if (emailResponse.data.exists) {
        newErrors.email = 'Email already exists.';
    }

    setErrors(newErrors);

      // If there are any errors, prevent form submission
      if (!Object.values(newErrors).every(val => val === "")) { 
        return;
    }

    const res = await axios.post('http://localhost:8080/auth/signUp', {
      "username": username,
      "email": email,
      "password": password
    })
      .catch(function (error) {
        console.log(error);
      });
    console.log(res)
    navigate("/emailSent");
  };

  return (
    <Container className="signup-square-container">
      <Row className="d-flex flex-column align-items-center justify-content-center">
        <h2>Sign up to create free code reviews</h2>
        <Form className="signup-square-form" onSubmit={handleSubmit}>
          <Form.Group className="signup-square-input">
            <Form.Control
              className='mb-3 bg-body'
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
              required
            />
            <Form.Control
              className='mb-3 bg-body'
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              required
            />
            <InputGroup>
              <Form.Control
                className='mb-3 bg-body'
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                required
              />
              {password && <InputGroup.Text className='mb-3 visibility bg-body' onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
              </InputGroup.Text>}
            </InputGroup>
          </Form.Group>
          <p className='errorText'>{errors.username}</p>
          <p className='errorText'>{errors.email}</p>
          <Button variant="primary" type="submit" className="signup-button">
            Sign Up
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default SignupSquare;
