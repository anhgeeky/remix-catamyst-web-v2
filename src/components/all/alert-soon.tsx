import { Alert, AlertIcon } from '@chakra-ui/react'

export function AlertSoon({ children = 'This lesson is coming soon!' }) {
  return (
    <Alert status="info" rounded="md">
      <AlertIcon />
      {children}
    </Alert>
  )
}
