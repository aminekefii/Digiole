import React, { useState } from 'react';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { Container, Flex, Image, Text, Button } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { userLoggedIn } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            // Check if password and confirmPassword match
            if (password !== confirmPassword) {
                setErrorMessage("Passwords do not match.");
                toast.error("Passwords do not match.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
                return; // Exit function if passwords don't match
            }
    
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
                // Show toast notification on successful registration
                toast.success('Account created successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                // Redirect to login page after successful registration
                navigate('/login');
            } catch (error) {
                let errorMessageToShow = error.message; // Default error message
                const weakPasswordRegex = /Password should be at least (\d+) characters/; // Regex to match weak password error
                const weakPasswordMatch = weakPasswordRegex.exec(error.message); // Check if error message contains weak password message
                const emailInUseMessage = 'auth/email-already-in-use'; // Message for email already in use error
                if (weakPasswordMatch && weakPasswordMatch.length > 1) {
                    errorMessageToShow = weakPasswordMatch[0]; // Set error message to the matched weak password message
                } else if (error.code === emailInUseMessage) {
                    errorMessageToShow = 'The email address is already in use.'; // Set error message to email already in use message
                }
                setErrorMessage(errorMessageToShow);
                toast.error(errorMessageToShow, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
            } finally {
                setIsRegistering(false);
            }
        }
    };
    

    return (
        <div style={{ backgroundImage: "url('images/16.png')", backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Container maxW="1268px" w="100%" px="0px" mx="auto" mb="30px" p={{ md: '', base: '20px' }}>
                <Flex justifyContent="space-between" alignItems="center" gap="20px" flexDirection={{ md: 'row', base: 'column' }}>
                    <Flex gap="12px" w={{ md: '10%', base: '100%' }} justifyContent="left" alignItems="center">
                        <Image src="images/img_voyager_icon.svg" h="32px" w="32px" />
                        <Image src="images/img_voyager.svg" h="12px" />
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between" gap="50px">
                        <Text
                            as={Link}
                            to="/landingpage"
                            color="gray.50"
                            letterSpacing="-0.08px"
                            textAlign="center"
                            fontWeight={500}
                            fontSize={{ base: 'sm', sm: 'md' }}
                            _hover={{ textDecoration: 'underline', color: 'white' }}
                            ml="20px"
                        >
                            Home
                        </Text>
                        <Button
                            as={Link}
                            to="/login"
                            size="sm"
                            variant="outline"
                            colorScheme="lime_100"
                            color="white.A700_01"
                            letterSpacing="-0.08px"
                            fontWeight={500}
                            minW={{ base: '50px', md: '70px' }}
                            borderRadius="20px"
                            _hover={{ bg: '#EAF2BB', color: 'black' }}
                            fontSize={{ base: 'xs', md: 'sm' }}
                            ml="20px"
                        >
                            Sign in
                        </Button>
                    </Flex>
                </Flex>
            </Container>
            <main style={{ paddingBottom:'30px', width: '100%', height: '84vh', display: 'flex', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '24rem', color: '#4b5563', marginTop: '1.25rem', padding: '1rem', backgroundColor: '#ffffff', textAlign: 'center', borderRadius: '0.75rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.19)' }}>
                    <div style={{ marginTop: '0.625rem' }}>
                        <h3 style={{ color: '#4b5563', fontSize: '1.25rem', fontWeight: 'bold' }}>Create a New Account</h3>
                    </div>
                    <form onSubmit={onSubmit} style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
                        <div>
                            <label htmlFor="email" style={{ color: '#4b5563', fontSize: '0.875rem', fontWeight: 'bold', float: 'left' }}>Email</label>
                            <input
                                type="email"
                                id="email"
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem', color: '#4b5563', backgroundColor: 'transparent', border: '1px solid #e2e8f0', outline: 'none', borderRadius: '0.375rem', transition: 'border-color 0.3s ease' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" style={{ color: '#4b5563', fontSize: '0.875rem', fontWeight: 'bold', float: 'left', marginTop: '10px' }}>Password</label>
                            <input
                                type="password"
                                id="password"
                                autoComplete='new-password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem', color: '#4b5563', backgroundColor: 'transparent', border: '1px solid #e2e8f0', outline: 'none', borderRadius: '0.375rem', transition: 'border-color 0.3s ease' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" style={{ color: '#4b5563', fontSize: '0.875rem', fontWeight: 'bold', float: 'left', marginTop: '10px' }}>Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                autoComplete='off'
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem', color: '#4b5563', backgroundColor: 'transparent', border: '1px solid #e2e8f0', outline: 'none', borderRadius: '0.375rem', transition: 'border-color 0.3s ease' }}
                            />
                        </div>
                       
                        <button
                            type="submit"
                            disabled={isRegistering}
                            style={{ width: '100%', marginTop: '1.25rem', padding: '0.75rem 1rem', color: '#fff', fontWeight: '500', backgroundColor: isRegistering ? '#cbd5e0' : '#4f46e5', borderRadius: '0.375rem', cursor: isRegistering ? 'not-allowed' : 'pointer', transition: 'background-color 0.3s ease' }}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
                            Already have an account? <Link to={'/login'} style={{ color: '#4b5563', fontWeight: 'bold', textDecoration: 'none', transition: 'color 0.3s ease', marginLeft: '5px' }}>Sign in</Link>
                        </div>
                    </form>
                </div>
            </main>
            <ToastContainer />
        </div>
    );
};

export default Register;
