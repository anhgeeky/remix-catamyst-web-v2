import { extendTheme } from '@chakra-ui/react'
import styles from '@theme/styles'
import colors from '@theme/colors'
import fonts from '@theme/fonts'
import config from '@theme/config'

import Button from '@theme/components/button'
import Input from '@theme/components/input'
import NumberInput from '@theme/components/number-input'
import Textarea from '@theme/components/textarea'

const overrides = {
  config,
  styles,
  colors,
  fonts,
  shadows: {
    outline: '0 0 0 3px #aca',
  },
  components: {
    Button,
    Input,
    NumberInput,
    Textarea,
  },
}

export default extendTheme(overrides)
