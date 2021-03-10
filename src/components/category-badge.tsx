import { Badge } from '@chakra-ui/react'

export default function CategoryBadge({ category }) {
  return (
    <Badge
      variant="solid"
      colorScheme={
        category === 'general'
          ? 'red'
          : category === 'preparation'
          ? 'blue'
          : category === 'frontend'
          ? 'yellow'
          : category === 'backend'
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
    </Badge>
  )
}
