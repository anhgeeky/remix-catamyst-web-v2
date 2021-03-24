import { Stack, Heading, VStack, Button } from '@chakra-ui/react'

import { Icon } from '@components'
import { useAuth } from '@hooks'

export function NewQuickPanel() {
  const { router, auth, isAuthenticated } = useAuth()

  const handleCreateNewPost = () => {
    if (isAuthenticated) router.push('/dashboard/posts/new')
    else router.push('/signin')
  }

  const handleCreateNewProject = () => {
    if (isAuthenticated) router.push('/dashboard/projects/new')
    else router.push('/signin')
  }

  const handleCreateNewJob = () => {
    if (isAuthenticated) router.push('/dashboard/jobs/new')
    else router.push('/signin')
  }

  return (
    <VStack textAlign="center" mt={10}>
      <Heading
        as="h1"
        size="xl"
        bgClip="text"
        bgGradient="linear(to-r, teal.400, green.400)"
      >
        Create something new
      </Heading>
      <Stack>
        <Button onClick={handleCreateNewPost} leftIcon={<Icon name="posts" />}>
          Write new post
        </Button>
        <Button
          leftIcon={<Icon name="projects" />}
          onClick={handleCreateNewProject}
        >
          Publish new project
        </Button>
        {auth.user.role === 'Employer' && (
          <Button leftIcon={<Icon name="jobs" />} onClick={handleCreateNewJob}>
            Post new job vacancy
          </Button>
        )}
      </Stack>
    </VStack>
  )
}
