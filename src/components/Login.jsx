import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    // Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast
  } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
  
  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const Auth = async(e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:5000/login', {
            email: email,
            password: password
        });
        toast({
          title: 'Login Berhasil',
          status: 'success',
          duration: 3000,
          isClosable: false,
          position:"top"
        })
        navigate("/navbar");
      } catch (error) {
        if(error.response){
          toast({
            title: 'Email atau password tidak cocok',
            status: 'error',
            duration: 3000,
            isClosable: false,
            position:"top"
          });
        }
      }
    }
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <form onSubmit={Auth}>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email or Username</FormLabel>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </FormControl>
                <Stack spacing={10}>
                  {/* <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    <Link color={'blue.400'}>Forgot password?</Link>
                  </Stack> */}
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }} type='submit'>
                    Sign In
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Flex>
    );
  }

  export default Login;