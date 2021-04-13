import { extendTheme } from '@chakra-ui/react'

import fonts from '@theme/fonts'
import styles from '@theme/styles'
import colors from '@theme/colors'
import config from '@theme/config'
import {
  Button,
  FormHelperText,
  FormLabel,
  Input,
  NumberInput,
  Select,
  Textarea,
} from '@theme/components'

const overrides = {
  fonts,
  config,
  styles,
  colors,
  shadows: { outline: '0 0 0 3px #aca' },
  components: {
    Button,
    FormHelperText,
    FormLabel,
    Input,
    NumberInput,
    Select,
    Textarea,
  },
}

export default extendTheme(overrides)
