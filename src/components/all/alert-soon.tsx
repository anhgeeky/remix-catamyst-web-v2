import { Alert, AlertIcon } from '@chakra-ui/react'

export function AlertSoon({ text }) {
  return (
    <Alert status="info" rounded="md">
      <AlertIcon />
      {text}
    </Alert>
  )
}
