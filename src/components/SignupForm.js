import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormHelperText,
} from '@chakra-ui/react';
import { Link as ReachLink, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import userService from '../services/users'

const SignupForm = ( { handleNotification } ) => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const submitCreateAccount = async (event) => {
    event.preventDefault()
    const userObject = {
      username: username,
      name: name,
      password: password
    }

    if (!username||!password||!name) {
      handleNotification('all fields must be filled!', 'error')
    }
    else if (username.length < 3 || password.length < 3) {
      handleNotification('username and password has to be at least 3 characters long!','error')
    }
    else if (username.includes(' ') || password.includes(' ')) {
      handleNotification('username and password may not include spaces!','error')
    }
    else {
      try {
        await userService.createAccount(userObject)
      } catch (exception) {
        handleNotification(exception.response.data.error, 'error')
        return
      }
  
      handleNotification('successfully created account!', 'success')
      setUsername('')
      setName('')
      setPassword('')
      navigate('/login')
      // route to login page after successful creation

    }
  }


  return (
    <div>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to join StayTuned!
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <Box>
                <FormControl id="Username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    id='username'
                  />
                  <FormHelperText>More than 3 characters and no spaces</FormHelperText>
                </FormControl>
              </Box>
              <FormControl id="Name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  name="name"
                  onChange={({ target }) => setName(target.value)}
                  id='name'
                />
              </FormControl>
              <FormControl id="Password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    name="password"
                    onChange={({ target }) => setPassword(target.value)}
                    id='password' 
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>More than 3 characters and no spaces</FormHelperText>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={submitCreateAccount}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link as={ReachLink} to='/login' color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
}
export default SignupForm