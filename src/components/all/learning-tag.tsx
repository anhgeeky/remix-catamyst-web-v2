import { chakra, Tag } from '@chakra-ui/react'
import {
  FaLightbulb as FundamentalIcon,
  FaCog as SpecificIcon,
  FaPencilAlt as ProjectIcon,
  FaStar as StarIcon,
} from 'react-icons/fa'

export function LearningTag({ category }) {
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
          : 'gray.400'
      }
    >
      {category === 'Fundamental' ? (
        <FundamentalIcon />
      ) : category === 'Specific' ? (
        <SpecificIcon />
      ) : category === 'Project' ? (
        <ProjectIcon />
      ) : (
        <StarIcon />
      )}
      <chakra.span ml={1}>{category}</chakra.span>
    </Tag>
  )
}
