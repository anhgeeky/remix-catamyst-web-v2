import { Tag } from '@chakra-ui/react'
import slugify from 'slugify'

export function TagSkill({ skill }) {
  const slug = slugify(skill, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  })

  switch (slug) {
    case 'figma':
      return (
        <Tag
          color="white"
          bgGradient="linear(to-r, red.400, purple.400, blue.400, green.400)"
        >
          {skill}
        </Tag>
      )
    case 'sketch':
      return (
        <Tag color="white" bg="#f96501">
          {skill}
        </Tag>
      )
    case 'linux':
      return (
        <Tag color="yellow" bg="black">
          {skill}
        </Tag>
      )
    case 'git':
      return <Tag colorScheme="orange">{skill}</Tag>
    case 'github':
      return (
        <Tag color="white" bg="black">
          {skill}
        </Tag>
      )
    case 'html':
      return <Tag colorScheme="orange">{skill}</Tag>
    case 'css':
      return <Tag colorScheme="blue">{skill}</Tag>
    case 'javascript':
      return <Tag colorScheme="yellow">{skill}</Tag>
    case 'typescript':
      return <Tag colorScheme="blue">{skill}</Tag>
    case 'node':
      return <Tag colorScheme="green">{skill}</Tag>
    case 'nodejs':
      return <Tag colorScheme="green">{skill}</Tag>
    case 'rest-api':
      return (
        <Tag color="white" bg="gray.500">
          {skill}
        </Tag>
      )
    case 'graphql-api':
      return (
        <Tag color="white" bg="#e00298">
          {skill}
        </Tag>
      )
    case 'react':
      return <Tag colorScheme="cyan">{skill}</Tag>
    case 'reactjs':
      return <Tag colorScheme="cyan">{skill}</Tag>
    case 'angular':
      return <Tag colorScheme="red">{skill}</Tag>
    case 'angularjs':
      return <Tag colorScheme="red">{skill}</Tag>
    case 'vue':
      return <Tag colorScheme="green">{skill}</Tag>
    case 'vuejs':
      return <Tag colorScheme="green">{skill}</Tag>
    case 'redux':
      return <Tag colorScheme="purple">{skill}</Tag>
    case 'redux-thunk':
      return <Tag colorScheme="purple">{skill}</Tag>
    case 'redux-saga':
      return <Tag colorScheme="green">{skill}</Tag>
    case 'chakra-ui':
      return <Tag colorScheme="teal">{skill}</Tag>
    case 'mongodb':
      return <Tag colorScheme="green">{skill}</Tag>
    case 'postgresql':
      return (
        <Tag color="white" bg="#336790">
          {skill}
        </Tag>
      )
    case 'prisma-orm':
      return (
        <Tag color="white" bg="#0e344b">
          {skill}
        </Tag>
      )
    case 'supabase':
      return (
        <Tag color="green.300" bg="black">
          {skill}
        </Tag>
      )
    case 'netlify':
      return (
        <Tag colorScheme="teal" variant="solid">
          {skill}
        </Tag>
      )
    case 'vercel':
      return (
        <Tag color="white" bg="black">
          {skill}
        </Tag>
      )
    case 'railwayapp':
      return (
        <Tag color="purple.300" bg="black">
          {skill}
        </Tag>
      )
    case 'heroku':
      return (
        <Tag color="white" bg="purple.500">
          {skill}
        </Tag>
      )
    case 'cloudflare':
      return (
        <Tag color="white" bg="orange">
          {skill}
        </Tag>
      )
    case 'uniregistry':
      return (
        <Tag color="white" bg="green">
          {skill}
        </Tag>
      )
    case 'google-cloud-platform':
      return (
        <Tag
          color="white"
          bgGradient="linear(to-r, red.400, blue.400, green.400, yellow.400)"
        >
          {skill}
        </Tag>
      )
    case 'amazon-web-services':
      return (
        <Tag color="white" bg="orange.500">
          {skill}
        </Tag>
      )
    case 'android':
      return (
        <Tag color="#093041" bg="#3ddc84">
          {skill}
        </Tag>
      )
    case 'ios':
      return (
        <Tag color="gray.200" bg="gray.500">
          {skill}
        </Tag>
      )
    default:
      return <Tag colorScheme="gray">{skill}</Tag>
  }
}
