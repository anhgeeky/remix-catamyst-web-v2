import { useRouter } from 'next/router'
import {
  Box,
  ButtonGroup,
  Button,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  InputLeftElement,
  VisuallyHidden,
} from '@chakra-ui/react'

import { Icon } from '@components'
import { useToast, useProfile } from '@hooks'
import React from 'react'

export function JobsToolbar() {
  const toast = useToast()
  const router = useRouter()
  const { profile, isAuthenticated } = useProfile()

  const labels = {
    create: 'Post a job',
    search: 'Search for jobs...',
  }

  const handleCreateJob = () => {
    if (isAuthenticated) {
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
      {/* @ts-ignore */}
      {profile && profile?.mode !== 'Learner' && (
        <ButtonGroup>
          <Button
            colorScheme="teal"
            leftIcon={<Icon name="add" />}
            onClick={handleCreateJob}
          >
            {labels.create}
          </Button>
        </ButtonGroup>
      )}

      <Box as="form" width="100%" onSubmit={handleSearchJobs}>
        <VisuallyHidden>
          <FormLabel>{labels.search}</FormLabel>
        </VisuallyHidden>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon name="search" />
          </InputLeftElement>
          <Input type="text" placeholder={labels.search} />
        </InputGroup>
      </Box>
    </Stack>
  )
}
