import { extendTheme } from '@chakra-ui/react'
import styles from '@/theme/styles'
import colors from '@/theme/colors'
import fonts from '@/theme/fonts'
import config from '@/theme/config'

const overrides = {
  config,
  styles,
  colors,
  fonts,
}

export default extendTheme(overrides)
