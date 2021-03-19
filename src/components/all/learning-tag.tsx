import { HStack, Tag } from '@chakra-ui/react'
import {
  FaLightbulb as FundamentalIcon,
  FaCog as SpecificIcon,
  FaPencilAlt as ProjectIcon,
} from 'react-icons/fa'

export function LearningTag({ category }) {
  return (
    <Tag
      as={HStack}
      // spacing={2}
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
      {category === 'Fundamental' ? (
        <FundamentalIcon />
      ) : category === 'Specific' ? (
        <SpecificIcon />
      ) : category === 'Project' ? (
        <ProjectIcon />
      ) : null}
      <span>{category}</span>
    </Tag>
  )
}
