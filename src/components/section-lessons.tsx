import { Box, Heading, Stack, useColorModeValue } from '@chakra-ui/react'

export default function SectionLessons({ data }) {
  const bg = useColorModeValue('white', 'gray.800')

  return (
    <Stack spacing={5}>
      {data.map((section, index) => {
        return (
          <Box
            key={index}
            bg={bg}
            boxShadow="xs"
            data-id="placeholder-image"
            p={5}
            spacing={5}
          >
            <Heading as="h3" size="lg">
              {section.title}
            </Heading>
            <Stack mt={5}>
              {section.lessons.map((lesson, index) => {
                return (
                  <Heading as="h4" size="md">
                    {lesson}
                  </Heading>
                )
              })}
            </Stack>
          </Box>
        )
      })}
    </Stack>
  )
}
