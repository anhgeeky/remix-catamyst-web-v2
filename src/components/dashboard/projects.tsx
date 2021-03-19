import NextHead from 'next/head'
import NextImage from 'next/image'
import {
  Box,
  Heading,
  Stack,
  Text,
  Button,
  useMediaQuery,
} from '@chakra-ui/react'

import { Card, CardPlaceholder, Content, HeadingStack } from '@components'
import { DashboardHero } from '@components/dashboard'

export function DashboardProjects({ auth }) {
  const [isTablet] = useMediaQuery('(max-width: 768px)')

  return (
    <>
      <NextHead>
        <title>Projects Dashboard · Catamyst</title>
      </NextHead>

      <DashboardHero>
        <Heading as="h1" size="xl">
          Projects
        </Heading>
        <Text>
          You can publish your own or contributed projects. Whether from the
          past, present, or still in development.
        </Text>
      </DashboardHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Published Projects:</HeadingStack>
            <Card>
              <CardPlaceholder>
                <Box>
                  {!isTablet && (
                    <NextImage
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/illustrations/dashboard-projects-none-desktop.png`}
                      alt="No Projects"
                      width={200}
                      height={200}
                    />
                  )}
                  {isTablet && (
                    <NextImage
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/illustrations/dashboard-projects-none-mobile.png`}
                      alt="No Projects"
                      width={200}
                      height={200}
                    />
                  )}
                </Box>
                <Text>
                  Hey {auth.user.name}, you don't have any published projects
                  yet.
                </Text>
                <Button colorScheme="teal">Publish a project</Button>
              </CardPlaceholder>
            </Card>
          </Stack>

          <Stack>
            <HeadingStack>Draft Projects:</HeadingStack>
            <Card>
              <CardPlaceholder>
                <Text>
                  Hey {auth.user.name}, you don't have any draft projects.
                </Text>
                <Button colorScheme="teal">Publish a project</Button>
              </CardPlaceholder>
            </Card>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
