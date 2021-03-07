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
          : 'gray'
      }
    >
      {category}
    </Badge>
  )
}
