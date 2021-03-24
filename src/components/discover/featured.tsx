import NextImage from 'next/image'
import {
  LinkBox,
  LinkOverlay,
  Stack,
  Flex,
  Box,
  useColorModeValue,
} from '@chakra-ui/react'

import {
  HeadingStack,
  CollectionProjects,
  CollectionUsers,
  CollectionOrganizations,
} from '@components'

import dataProjects from '@data/projects.json'
import dataUsers from '@data/users.json'
import dataOrganizations from '@data/organizations.json'

export function DiscoverFeatured() {
  return (
    <>
      <Stack spacing={20} width="100%">
        <Flex justify="center" mb="-40px">
          <Box bg={useColorModeValue('white', 'gray.500')} rounded="full">
            <NextImage
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/illustrations/projects.png`}
              alt="Cat reading book with floating shapes"
              width={200}
              height={200}
            />
          </Box>
        </Flex>

        <Stack>
          <HeadingStack>Featured Members</HeadingStack>
          <CollectionUsers users={dataUsers} />
        </Stack>

        <Stack>
          <HeadingStack>Featured Projects</HeadingStack>
          <CollectionProjects projects={dataProjects} />
        </Stack>

        <Stack>
          <HeadingStack>Featured Organizations</HeadingStack>
          <CollectionOrganizations organizations={dataOrganizations} />
        </Stack>
      </Stack>
    </>
  )
}
