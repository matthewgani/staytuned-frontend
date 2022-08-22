import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link as ReachLink, useNavigate } from 'react-router-dom'

const LoginForm = ({handleNotification, handleLogin}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  const submitLogin = async (event) => {
    event.preventDefault()
    const userObject = {
      username: username,
      password: password
    }



    if (!username||!password) {
      handleNotification('all fields must be filled!', 'error')
    }
    else if (username.length < 3 || password.length < 3) {
      handleNotification('username and password has to be at least 3 characters long!','error')
    }
    else if (username.includes(' ') || password.includes(' ')) {
      handleNotification('username and password may not include spaces!','error')
    }
    else {
      const success =  await handleLogin(userObject, rememberMe)
      if (success) {
        handleNotification('successfully logged in!', 'success')
        setUsername('')
        setPassword('')
        // route to home page after successful login
        navigate('/home')
      }

    }
  }

  const toggleRememberMe = () => {
    const temp = !rememberMe
    setRememberMe(temp)
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Log in to your StayTuned account</Heading>
          <FormControl id="Username">
            <FormLabel>Username</FormLabel>
            <Input 
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              id='username'
            />
          </FormControl>
          <FormControl id="Password">
            <FormLabel>Password</FormLabel>
            <Input 
              type="password" 
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
              id='password' 
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox onChange= {toggleRememberMe}>Remember me</Checkbox>
              <Link as={ReachLink} to='/signup' color={'blue.500'}>Don't have an account?</Link>
            </Stack>
            <Button 
              onClick={submitLogin}
              colorScheme={'blue'} 
              variant={'solid'}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  );
}

export default LoginForm