import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: (props) => ({
    heading: {
      lineHeight: 'base',
    },
    body: {
      lineHeight: 'base',
      fontFamily: 'body',
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('white', 'gray.900')(props),
    },
  }),
}

export default styles
