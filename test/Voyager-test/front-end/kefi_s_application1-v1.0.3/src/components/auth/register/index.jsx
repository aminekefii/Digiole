import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import { Container, Flex, Image, Text, Button } from '@chakra-ui/react';


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
            setIsRegistering(true);
            await doCreateUserWithEmailAndPassword(email, password);
        }
    };

    return (
        <>
            {userLoggedIn && <Navigate to={'/assistants'} replace={true} />}
            <div style={{backgroundImage: "url('images/16.png')", backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '100vh' }}>
            <Container maxW="1268px" w="100%" px="0px" mx="auto" p={{ md: '', base: '20px' }}>
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

            <main style={{backgroundImage: "url('images/16.png')", backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                <div style={{ width: '24rem', color: '#4b5563', marginTop: '1.25rem', padding: '1rem', backgroundColor: '#ffffff', textAlign: 'center', borderRadius: '0.75rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.19)' }}>
                    <div style={{ marginTop: '0.625rem' }}>
                        <h3 style={{ color: '#4b5563', fontSize: '1.25rem', fontWeight: 'bold' }}>Create a New Account</h3>
                    </div>
                    <form onSubmit={onSubmit} style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
                        <div>
                            <label htmlFor="email" style={{ color: '#4b5563', fontSize: '0.875rem', fontWeight: 'bold' }}>Email</label>
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
                            <label htmlFor="password" style={{ color: '#4b5563', fontSize: '0.875rem', fontWeight: 'bold' }}>Password</label>
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
                            <label htmlFor="confirmPassword" style={{ color: '#4b5563', fontSize: '0.875rem', fontWeight: 'bold' }}>Confirm Password</label>
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
                        {errorMessage && <span style={{ color: '#e53e3e', fontWeight: 'bold' }}>{errorMessage}</span>}
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
            </div>
        </>
    );
};

export default Register;
