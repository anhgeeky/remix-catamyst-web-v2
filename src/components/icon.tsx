import {
  ChevronDownIcon as DownIcon,
  ChevronUpIcon as UpIcon,
  PhoneIcon,
  DeleteIcon,
  RepeatIcon as GenerateIcon,
  ArrowBackIcon as BackIcon,
  EditIcon as SaveIcon,
} from '@chakra-ui/icons'
import {
  FaExpandAlt as SizeIcon,
  FaExternalLinkAlt as UrlIcon,
  FaEye as MetaIcon,
  FaHeading as TitleIcon,
  FaLink as LinkIcon,
  FaMapSigns as LinksIcon,
  FaQuestionCircle as AltIcon,
  FaUserAlt as AuthorIcon,
  FaCopyright as CopyrightIcon,
  FaGenderless as CategoryIcon,
  FaPalette as ColorIcon,
} from 'react-icons/fa'
import { RiRefreshLine as ResetIcon } from 'react-icons/ri'

export function Icon({ name }) {
  switch (name) {
    case 'back':
      return <BackIcon />
    case 'save':
      return <SaveIcon />
    case 'reset':
      return <ResetIcon />
    case 'author':
      return <AuthorIcon />
    case 'copyright':
      return <CopyrightIcon />
    case 'generate':
      return <GenerateIcon />
    case 'category':
      return <CategoryIcon />
    case 'color':
      return <ColorIcon />
    case 'delete':
      return <DeleteIcon />
    case 'down':
      return <DownIcon />
    case 'icon':
      return <span>I</span>
    case 'link':
      return <LinkIcon />
    case 'links':
      return <LinksIcon />
    case 'meta':
      return <MetaIcon />
    case 'phone':
      return <PhoneIcon />
    case 'size':
      return <SizeIcon />
    case 'up':
      return <UpIcon />
    case 'title':
      return <TitleIcon />
    case 'alt':
      return <AltIcon />
    case 'url':
      return <UrlIcon />
    default:
      return null
  }
}
