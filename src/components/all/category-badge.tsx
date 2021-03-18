import { Tag } from '@chakra-ui/react'

export function CategoryBadge({ category }) {
  return (
    <Tag
      variant="solid"
      color="white"
      bg={
        category === 'Preparation'
          ? 'black'
          : category === 'General'
          ? 'gray.700'
          : category === 'Frontend'
          ? 'gray.600'
          : category === 'Backend'
          ? 'gray.500'
          : category === 'Fundamental'
          ? 'purple.500'
          : category === 'Specific'
          ? 'pink.500'
          : category === 'Project'
          ? 'cyan.500'
          : 'teal.400'
      }
    >
      {category}
    </Tag>
  )
}
