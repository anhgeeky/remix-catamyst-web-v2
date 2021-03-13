import { Tag } from '@chakra-ui/react'

export default function CategoryBadge({ category }) {
  return (
    <Tag
      variant="solid"
      colorScheme={
        category === 'General'
          ? 'red'
          : category === 'Preparation'
          ? 'blue'
          : category === 'Frontend'
          ? 'yellow'
          : category === 'Backend'
          ? 'green'
          : category === 'Fundamental'
          ? 'purple'
          : category === 'Specific'
          ? 'pink'
          : category === 'Project'
          ? 'cyan'
          : 'gray'
      }
    >
      {category}
    </Tag>
  )
}
