import {
  AddIcon,
  ArrowBackIcon as BackIcon,
  ChevronDownIcon as DownIcon,
  ChevronUpIcon as UpIcon,
  DeleteIcon,
  PhoneIcon,
  RepeatIcon as GenerateIcon,
} from '@chakra-ui/icons'
import React from 'react'
import {
  // General icons
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
  FaSave as SaveIcon,
  FaUserAlt as AuthorIcon,
  // Editor button icons
  FaBold as BoldIcon,
  FaItalic as ItalicIcon,
  FaUnderline as UnderlineIcon,
  FaListOl as ListOrderedIcon,
  FaListUl as ListUnorderedIcon,
  FaAngleRight as BulletIcon,
  FaSearch as SearchIcon,
  FaCog as SettingsIcon,
  FaUser as ProfileIcon,
  FaReceipt as InvoicesIcon,
  // Dashboard icons
  FaBinoculars as OverviewIcon,
  FaChartLine as StatsIcon,
  FaMap as TracksIcon,
  FaCubes as TopicsIcon,
  FaCube as LessonsIcon,
  FaShapes as ProjectsIcon,
  FaScroll as PostsIcon,
  FaChalkboardTeacher as MentorsIcon,
  FaBriefcase as JobsIcon,
  FaComments as DiscussionsIcon,
  FaCertificate as CertificatesIcon,
} from 'react-icons/fa'
import {
  RiRefreshLine as ResetIcon,
  RiDashboardFill as DashboardIcon,
  RiLogoutBoxLine as SignOutIcon,
} from 'react-icons/ri'

export function Icon({ name }) {
  switch (name) {
    /**
     * General icons
     */
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
    case 'dashboard':
      return <DashboardIcon />
    case 'profile':
      return <ProfileIcon />
    case 'settings':
      return <SettingsIcon />
    case 'search':
      return <SearchIcon />
    case 'signout':
      return <SignOutIcon />
    /**
     * Dashboard icons
     */
    case 'overview':
      return <OverviewIcon />
    case 'stats':
      return <StatsIcon />
    case 'tracks':
      return <TracksIcon />
    case 'topics':
      return <TopicsIcon />
    case 'lessons':
      return <LessonsIcon />
    case 'projects':
      return <ProjectsIcon />
    case 'posts':
      return <PostsIcon />
    case 'mentors':
      return <MentorsIcon />
    case 'jobs':
      return <JobsIcon />
    case 'discussions':
      return <DiscussionsIcon />
    case 'certificates':
      return <CertificatesIcon />
    /**
     * Editor button icons
     */
    case 'bold':
      return <BoldIcon />
    case 'italic':
      return <ItalicIcon />
    case 'underlined':
      return <UnderlineIcon />
    case 'heading-one':
      return <span>H1</span>
    case 'heading-two':
      return <span>H2</span>
    case 'heading-three':
      return <span>H3</span>
    case 'block-quote':
      return <QuoteIcon />
    case 'list-ordered':
      return <ListOrderedIcon />
    case 'list-unordered':
      return <ListUnorderedIcon />
    case 'bullet':
      return <BulletIcon />
    /**
     * When nothing found
     */
    default:
      return <CircleIcon />
  }
}
