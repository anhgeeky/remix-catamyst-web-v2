import NextHead from 'next/head'
import NextImage from 'next/image'
import { Box, Heading, Stack, Text, useMediaQuery } from '@chakra-ui/react'

import { Card, Content, HeadingStack } from '@components'
import { DashboardHero } from '@components/dashboard'

export default function DashboardProjects({ auth }) {
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
        <Text>Your published and draft projects</Text>
      </DashboardHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Published Projects:</HeadingStack>
            <Card>
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
                )}{' '}
              </Box>
              <Text>
                Hey {auth.user.name}, you don't have any published projects yet.
              </Text>
            </Card>
          </Stack>
          <Stack>
            <HeadingStack>Draft Projects:</HeadingStack>
            <Card>
              Hey {auth.user.name}, you don't have any draft projects yet.
            </Card>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
