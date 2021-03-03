import { Alert, AlertIcon } from '@chakra-ui/react'

export default function AlertSoon({ text }) {
  return (
    <Alert status="info" rounded="md">
      <AlertIcon />
      {text}
    </Alert>
  )
}
