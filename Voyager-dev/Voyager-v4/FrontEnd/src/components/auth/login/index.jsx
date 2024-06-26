import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth';
import { useAuth } from '../../contexts/authContext';
import { Container, Flex, Image, Text, Button } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
            } catch (error) {
                setIsSigningIn(false);
                toast.error('invalid credential !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                    });
            }
        }
    };

    const onGoogleSignIn = (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            doSignInWithGoogle().catch(err => {
                setIsSigningIn(false);
            });
        }
    };

    return (
        <div style={{ backgroundImage: "url('images/16.png')", backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', Height: '100%' }}>
            {userLoggedIn && (<Navigate to={'/assistants'} replace={true} />)}
            <Container maxW="1268px" w="100%" px="0px" mx="auto" p={{ md: '', base: '20px' }}>
                <Flex justifyContent="space-between" alignItems="center" gap="20px" flexDirection={{ md: 'row', base: 'row' }}>
                    <Flex gap="12px" w={{ md: '10%', base: '100%' }} justifyContent="left" alignItems="center">
                    <Link to="/landingpage">
  <Image src="images/img_voyager_icon.svg" h="32px" w="32px" />
</Link>
<Link to="/landingpage">   <Image src="images/img_voyager.svg" h="12px" ml="10px"/></Link>
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
                            to="/register"
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
                            Sign up
                        </Button>
                    </Flex>
                </Flex>
            </Container>
            <main style={{ width: '100%', height: '88.5vh', display: 'flex', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '24rem', color: '#4b5563', marginTop: '1.25rem', padding: '1rem', backgroundColor: '#ffffff', textAlign: 'center', borderRadius: '0.75rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.19)' }}>
                    <div style={{ marginTop: '0.625rem' }}>
                        <h3 style={{ color: '#4b5563', fontSize: '1.25rem', fontWeight: 'bold' }}>Welcome Back</h3>
                    </div>
                    <form onSubmit={onSubmit} style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
                        <div>
                            <label htmlFor="email" style={{ color: '#4b5563', fontSize: '0.875rem', fontWeight: 'bold' ,float:'left'}}>Email</label>
                            <input
                                type="email"
                                id="email"
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem', color: '#4b5563', backgroundColor: 'transparent', border: '1px solid #e2e8f0', outline: 'none', borderRadius: '0.375rem', transition: 'border-color 0.3s ease' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" style={{ color: '#4b5563', fontSize: '0.875rem', fontWeight: 'bold' ,float:'left' , marginTop:'10px'}}>Password</label>
                            <input
                                type="password"
                                id="password"
                                autoComplete='current-password'
                                required
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem', color: '#4b5563', backgroundColor: 'transparent', border: '1px solid #e2e8f0', outline: 'none', borderRadius: '0.375rem', transition: 'border-color 0.3s ease' }}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSigningIn}
                            style={{ width: '100%', marginTop: '1.25rem', padding: '0.75rem 1rem', color: '#fff', fontWeight: '500', backgroundColor: isSigningIn ? '#cbd5e0' : '#4f46e5', borderRadius: '0.375rem', cursor: isSigningIn ? 'not-allowed' : 'pointer', transition: 'background-color 0.3s ease' }}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                        <p style={{ textAlign: 'center', fontSize: '0.875rem', fontWeight: 'bold', display: 'inline-block',marginTop:'10px' }}>Don't have an account? <Link to={'/register'} style={{ color: '#4b5563', fontWeight: 'bold', textDecoration: 'none', transition: 'color 0.3s ease', marginLeft: '5px' }}>Sign up</Link></p>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', marginTop:'10px' }}>
                            <div style={{ borderBottom: '2px solid #cbd5e0', marginBottom: '0.625rem', marginRight: '0.5rem', flex: '1' }}></div>
                            <div style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>OR</div>
                            <div style={{ borderBottom: '2px solid #cbd5e0', marginBottom: '0.625rem', marginLeft: '0.5rem', flex: '1' }}></div>
                        </div>
                        <button
                            disabled={isSigningIn}
                            onClick={(e) => { onGoogleSignIn(e) }}
                            style={{ width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.625rem 1rem', border: 'none', borderRadius: '0.375rem', cursor: isSigningIn ? 'not-allowed' : 'pointer', backgroundColor: '#ffffff', transition: 'background-color 0.3s ease'}}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 48 48" fill="#000000" xmlns="http://www.w3.org/2000/svg" width="20px">
                                <g clipPath="url(#clip0_17_40)">
                                    <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4"/>
                                    <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853"/>
                                    <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.005 28.6006Z" fill="#FBBC04"/>
                                    <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_17_40">
                                        <rect width="48" height="48" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                        </button>
                        <ToastContainer />
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Login;
