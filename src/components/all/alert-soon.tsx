import { Alert, AlertIcon } from '@chakra-ui/react'

export function AlertSoon({ text = 'This lesson is coming soon!' }) {
  return (
    <Alert status="info" rounded="md">
      <AlertIcon />
      {text}
    </Alert>
  )
}
