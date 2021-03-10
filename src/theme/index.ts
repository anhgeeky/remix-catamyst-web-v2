import { extendTheme } from '@chakra-ui/react'

import styles from '@theme/styles'
import colors from '@theme/colors'
import fonts from '@theme/fonts'
import config from '@theme/config'
import { Button, Input, NumberInput, Textarea, Select } from '@theme/components'

const overrides = {
  config,
  styles,
  colors,
  fonts,
  shadows: { outline: '0 0 0 3px #aca' },
  components: {
    Button,
    Input,
    NumberInput,
    Select,
    Textarea,
  },
}

export default extendTheme(overrides)
