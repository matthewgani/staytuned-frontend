import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

const Notification = ({ message, status }) => {
  if (message === null) {
    return null
  }

  // statuses: error, success, warning, info

  return (
  <Alert status={status}>
    <AlertIcon />
    {message}
  </Alert>
  )
}

export default Notification