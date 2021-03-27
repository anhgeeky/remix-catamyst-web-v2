import { useRouter } from 'next/router'
import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  InputLeftElement,
  VisuallyHidden,
} from '@chakra-ui/react'

import { Icon } from '@components'
import { useToast, useAuth } from '@hooks'

export function JobsToolbar() {
  const toast = useToast()
  const router = useRouter()
  const { isAuthorized } = useAuth()

  const labels = {
    create: 'Post a job',
    search: 'Search for jobs...',
  }

  const handleCreateJob = () => {
    if (isAuthorized) {
      toast({ title: `Let's post a job.` })
    } else {
      router.push('/signin')
    }
  }

  const handleSearchJobs = (event) => {
    event.preventDefault()
    toast({ title: `Searching for jobs...` })
  }

  return (
    <Stack direction="row" mb={5}>
      <Box>
        <Button
          colorScheme="teal"
          leftIcon={<Icon name="add" />}
          onClick={handleCreateJob}
        >
          {labels.create}
        </Button>
      </Box>

      <Box as="form" width="100%" onSubmit={handleSearchJobs}>
        <VisuallyHidden>
          <FormLabel>{labels.search}</FormLabel>
        </VisuallyHidden>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon name="search" />}
          />
          <Input type="text" placeholder={labels.search} />
        </InputGroup>
      </Box>
    </Stack>
  )
}
