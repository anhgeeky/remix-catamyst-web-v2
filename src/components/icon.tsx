import {
  AddIcon,
  ChevronDownIcon as DownIcon,
  ChevronUpIcon as UpIcon,
  PhoneIcon,
  DeleteIcon,
  RepeatIcon as GenerateIcon,
  ArrowBackIcon as BackIcon,
  EditIcon as SaveIcon,
} from '@chakra-ui/icons'
import {
  FaCircle as CircleIcon,
  FaCode as CodeIcon,
  FaCopyright as CopyrightIcon,
  FaDivide as DividerIcon,
  FaExpandAlt as SizeIcon,
  FaExternalLinkAlt as UrlIcon,
  FaEye as MetaIcon,
  FaFont as TextsIcon,
  FaGenderless as CategoryIcon,
  FaHeading as TitleIcon,
  FaImage as ImageIcon,
  FaLink as LinkIcon,
  FaList as ListIcon,
  FaMapSigns as LinksIcon,
  FaPalette as ColorIcon,
  FaQuestionCircle as AltIcon,
  FaQuoteRight as QuoteIcon,
  FaUserAlt as AuthorIcon,
} from 'react-icons/fa'
import { RiRefreshLine as ResetIcon } from 'react-icons/ri'

export function Icon({ name }) {
  switch (name) {
    case 'add':
      return <AddIcon />
    case 'alt':
      return <AltIcon />
    case 'author':
      return <AuthorIcon />
    case 'back':
      return <BackIcon />
    case 'category':
      return <CategoryIcon />
    case 'code':
      return <CodeIcon />
    case 'color':
      return <ColorIcon />
    case 'copyright':
      return <CopyrightIcon />
    case 'delete':
      return <DeleteIcon />
    case 'divider':
      return <DividerIcon />
    case 'down':
      return <DownIcon />
    case 'generate':
      return <GenerateIcon />
    case 'image':
      return <ImageIcon />
    case 'link':
      return <LinkIcon />
    case 'links':
      return <LinksIcon />
    case 'list':
      return <ListIcon />
    case 'meta':
      return <MetaIcon />
    case 'phone':
      return <PhoneIcon />
    case 'quote':
      return <QuoteIcon />
    case 'reset':
      return <ResetIcon />
    case 'save':
      return <SaveIcon />
    case 'size':
      return <SizeIcon />
    case 'texts':
      return <TextsIcon />
    case 'title':
      return <TitleIcon />
    case 'up':
      return <UpIcon />
    case 'url':
      return <UrlIcon />
    default:
      return <CircleIcon />
  }
}
