import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Checkbox,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast 
  } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
  
  const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const toast = useToast();
    
    const Registers = async(e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:5000/users', {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        });
        toast({
          title: 'Register Berhasil',
          status: 'success',
          duration: 3000,
          isClosable: false,
          position:"top"
        })
        navigate("/login");
      } catch (error) {
        if(error.response){
          toast({
            title: 'Password and confirm password tidak cocok',
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
          <form onSubmit={Registers}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input type="text" placeholder='Your name' value={name} onChange={(e) => setName(e.target.value)}/>
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder='Your email'value={email} onChange={(e) => setEmail(e.target.value)}/>
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" placeholder='Your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Confirm Password</FormLabel>
                  <Input type="password" placeholder='Confirm your password'value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    <Link color={'blue.400'}>Forgot password?</Link>
                  </Stack>
                  <Button colorScheme='green' type='submit'>
                    Register
                  </Button>
                </Stack>
            </Stack>
          </Box>
          </form>
        </Stack>
      </Flex>
    );
  }

  export default Register;