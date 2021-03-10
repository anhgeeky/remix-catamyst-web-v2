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
          : category === 'fundamental'
          ? 'purple'
          : category === 'specific'
          ? 'pink'
          : category === 'project'
          ? 'cyan'
          : 'gray'
      }
    >
      {category}
    </Badge>
  )
}
