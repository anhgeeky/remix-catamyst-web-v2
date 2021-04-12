import { Alert, AlertIcon } from '@chakra-ui/react'

export function AlertSoon({ children = 'This lesson is still in progress.' }) {
  return (
    <Alert status="info" rounded="md">
      <AlertIcon />
      {children}
    </Alert>
  )
}
