import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Dummy login details
        const adminUsername = 'admin';
        const adminPassword = 'password';

        if (username === adminUsername && password === adminPassword) {
            // Store a flag in localStorage to indicate that the user is logged in
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/home', { replace: true });
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div style={styles.container}>
           
            <h2>Admin</h2>
            <Form onSubmit={handleSubmit} style={styles.form}>
                <Form.Group style={styles.inputGroup} controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Enter username"
                    />
                </Form.Group>
                <Form.Group style={styles.inputGroup} controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter password"
                    />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button type="submit" style={styles.button}>
                    Login
                </Button>
            </Form>
        </div>
    );
};

const styles = {
    container: {
        width: '300px',
        margin: '100px auto',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
        textAlign: 'center',
        backgroundColor: '#f5f5dc', // Cream white color
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputGroup: {
        marginBottom: '15px',
        textAlign: 'left',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#007BFF',
        color: '#FFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Login;
