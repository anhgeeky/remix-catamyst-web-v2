import {
  AddIcon,
  ArrowBackIcon as BackIcon,
  ArrowDownIcon as DownIcon,
  ArrowUpIcon as UpIcon,
  ViewIcon,
  DeleteIcon,
  PhoneIcon,
  RepeatIcon as GenerateIcon,
} from '@chakra-ui/icons'
import React from 'react'
import {
  // General icons
  FaCircle as CircleIcon,
  FaQuestionCircle as OthersIcon,
  FaMoon as MoonIcon, // Light Icon
  FaSun as SunIcon, // Dark Icon
  FaCode as CodeIcon,
  FaCopyright as CopyrightIcon,
  FaDivide as DividerIcon,
  FaExpandAlt as SizeIcon,
  FaPencilAlt as EditIcon,
  FaPaperPlane as SendIcon,
  FaCheckCircle as CheckIcon,
  FaTimesCircle as CrossIcon,
  FaDownload as ExportIcon,
  FaExternalLinkAlt as ExternalIcon,
  FaEye as MetaIcon,
  FaMagic as InvertIcon,
  FaRoute as SourceIcon,
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
  FaQuoteLeft as QuoteLeftIcon,
  FaQuoteRight as QuoteRightIcon,
  FaSave as SaveIcon,
  FaRocket as PublishIcon,
  FaUserAlt as AuthorIcon,
  FaEnvelope as EmailIcon,
  FaKey as PasswordIcon,
  FaFileInvoiceDollar as BillingIcon,
  FaPaw as BasicIcon,
  FaUserAstronaut as ProIcon,
  FaUserNinja as SuperIcon,
  FaBuilding as BusinessIcon,
  // Navigation and mnu icons
  FaHome as HomeIcon,
  FaBookReader as LearnIcon,
  FaComments as ForumIcon,
  FaMoneyBill as PricingIcon,
  FaQuestionCircle as HelpIcon,
  FaCat as AboutIcon,
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
  FaFileSignature as FormIcon,
  // Dashboard icons
  FaChild as OnboardIcon,
  FaBinoculars as OverviewIcon,
  FaUser as UserIcon,
  FaUsers as UsersIcon,
  FaUsers as ProfilesIcon,
  FaChartLine as StatsIcon,
  FaArrowAltCircleUp as LevelsIcon,
  FaMap as TracksIcon,
  FaBook as TopicsIcon,
  FaCube as LessonsIcon,
  FaShapes as ProjectsIcon,
  FaScroll as PostsIcon,
  FaChalkboardTeacher as MentorsIcon,
  FaBriefcase as JobsIcon,
  FaComments as DiscussionsIcon,
  FaCertificate as CertificatesIcon,
  FaClock as HoursIcon,
  FaCalendarCheck as MonthsIcon,
  // Social icons
  FaGlobe as WebsiteIcon,
  FaTwitter as TwitterIcon,
  FaGithub as GitHubIcon,
  FaLinkedin as LinkedInIcon,
  FaInstagram as InstagramIcon,
  FaFacebook as FacebookIcon,
  FaYoutube as YouTubeIcon,
  // User profile and actions.
  FaKey as KeyIcon,
  FaStar as StarIcon,
  FaCalendar as DateIcon,
  FaMapMarkerAlt as LocationIcon,
  FaBuilding as OrganizationIcon,
  // Tools and technologies
  FaCloud as CloudIcon,
  FaAsterisk as CareerIcon,
  FaPalette as DesignIcon,
  FaApple as AppleIcon,
  FaTerminal as TerminalIcon,
  FaDatabase as DatabaseIcon,
} from 'react-icons/fa'
import { FiMonitor as UIUXIcon } from 'react-icons/fi'
import {
  RiRefreshLine as ResetIcon,
  RiDashboardFill as DashboardIcon,
  RiLogoutBoxLine as SignOutIcon,
  RiLayoutGridLine as GridIcon,
  RiLayoutRowLine as RowIcon,
} from 'react-icons/ri'
import {
  IoTelescope as DiscoverIcon,
  IoAccessibility as AccessibilityIcon,
} from 'react-icons/io5'
import {
  GoVerified as VerifiedIcon,
  GoShield as TrustedIcon,
} from 'react-icons/go'
import {
  SiLinux as LinuxIcon,
  SiWindows as WindowsIcon,
  SiGooglechrome as BrowserIcon,
  SiFigma as DesignToolsIcon,
  SiVisualstudiocode as CodeEditorsIcon,
  SiMarkdown as MarkdownIcon,
  SiGit as GitIcon,
  SiHtml5 as HTMLIcon,
  SiCss3 as CSSIcon,
  SiJavascript as JavaScriptIcon,
  SiTypescript as TypeScriptIcon,
  SiTailwindcss as CSSLFIcon,
  SiStyledComponents as CSSInJSIcon,
  SiDart as DartIcon,
  SiKotlin as KotlinIcon,
  SiSwift as SwiftIcon,
  SiPython as PythonIcon,
  SiRuby as RubyIcon,
  SiJava as JavaIcon,
  SiGo as GoIcon,
  SiPhp as PHPIcon,
  SiC as CIcon,
  SiElm as ProgrammingLanguagesIcon,
  SiNetlify as DeploymentIcon,
  SiNodeDotJs as NodeJSIcon,
  SiDeno as DenoIcon,
  SiNpm as NPMIcon,
  SiReact as ReactIcon,
  SiNextDotJs as NextJSIcon,
  SiVueDotJs as VueJSIcon,
  SiAngular as AngularIcon,
  SiSvelte as JavaScriptLFIcon,
  SiRedux as ReduxIcon,
  SiPostman as RESTAPIIcon,
  SiGraphql as GraphQLIcon,
  SiSocketDotIo as APIIcon,
  SiApollographql as NodeJSLFIcon,
  SiMongodb as MongoDBIcon,
  SiMysql as MySQLIcon,
  SiPostgresql as PostgreSQLIcon,
  SiRedis as RedisIcon,
  SiJsonwebtokens as SecurityIcon,
  SiDocker as DockerIcon,
  SiJest as TestingIcon,
  SiGoogleanalytics as AnalyticsIcon,
  SiSentry as APMIcon,
  SiNginx as InfraIcon,
  SiGooglecloud as GCPIcon,
  SiAmazonaws as AWSIcon,
  SiMicrosoftazure as AzureIcon,
  SiCircleci as CICDIcon,
  SiOculus as ARVRIcon,
  SiTensorflow as AIMLIcon,
  SiUnity as GamesIcon,
  SiBitcoin as BlockchainCryptoIcon,
} from 'react-icons/si'
import {
  GiCycling as LearnerIcon,
  GiStrong as EmployerIcon,
  GiTeacher as TeacherIcon,
  GiInnerSelf as InvestorIcon,
} from 'react-icons/gi'

export function Icon({ name }) {
  switch (name) {
    /**
     * General icons
     */
    case 'circle':
      return <CircleIcon />
    case 'sun':
      return <SunIcon />
    case 'moon':
      return <MoonIcon />
    case 'others':
      return <OthersIcon />
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
    case 'export':
      return <ExportIcon />
    case 'view':
      return <ViewIcon />
    case 'delete':
      return <DeleteIcon />
    case 'edit':
      return <EditIcon />
    case 'send':
      return <SendIcon />
    case 'check':
      return <CheckIcon />
    case 'cross':
      return <CrossIcon />
    case 'divider':
      return <DividerIcon />
    case 'up':
      return <UpIcon />
    case 'down':
      return <DownIcon />
    case 'generate':
      return <GenerateIcon />
    case 'image':
      return <ImageIcon />
    case 'external':
      return <ExternalIcon />
    case 'url':
      return <LinkIcon />
    case 'link':
      return <LinkIcon />
    case 'links':
      return <LinksIcon />
    case 'list':
      return <ListIcon />
    case 'source':
      return <SourceIcon />
    case 'meta':
      return <MetaIcon />
    case 'invert':
      return <InvertIcon />
    case 'phone':
      return <PhoneIcon />
    case 'quote':
      return <QuoteIcon />
    case 'quote-left':
      return <QuoteLeftIcon />
    case 'quote-right':
      return <QuoteRightIcon />
    case 'reset':
      return <ResetIcon />
    case 'save':
      return <SaveIcon />
    case 'publish':
      return <PublishIcon />
    case 'size':
      return <SizeIcon />
    case 'texts':
      return <TextsIcon />
    case 'title':
      return <TitleIcon />
    case 'onboard':
      return <OnboardIcon />
    case 'dashboard':
      return <DashboardIcon />
    case 'profile':
      return <ProfileIcon />
    case 'invoices':
      return <InvoicesIcon />
    case 'form':
      return <FormIcon />
    case 'settings':
      return <SettingsIcon />
    case 'search':
      return <SearchIcon />
    case 'signout':
      return <SignOutIcon />
    case 'email':
      return <EmailIcon />
    case 'password':
      return <PasswordIcon />
    case 'billing':
      return <BillingIcon />
    case 'basic':
      return <BasicIcon />
    case 'pro':
      return <ProIcon />
    case 'super':
      return <SuperIcon />
    case 'grid':
      return <GridIcon />
    case 'row':
      return <RowIcon />
    case 'cloud':
      return <CloudIcon />
    case 'career':
      return <CareerIcon />
    case 'business':
      return <BusinessIcon />
    case 'uiux':
      return <UIUXIcon />
    case 'web':
      return <span>W</span>
    case 'web-app':
      return <span>WA</span>
    /**
     * Navigation and menu icons.
     */
    case 'home':
      return <HomeIcon />
    case 'learn':
      return <LearnIcon />
    case 'discover':
      return <DiscoverIcon />
    case 'forum':
      return <ForumIcon />
    case 'pricing':
      return <PricingIcon />
    case 'help':
      return <HelpIcon />
    case 'about':
      return <AboutIcon />
    /**
     * Dashboard icons.
     */
    case 'overview':
      return <OverviewIcon />
    case 'stats':
      return <StatsIcon />
    case 'user':
      return <UserIcon />
    case 'users':
      return <UsersIcon />
    case 'profiles':
      return <ProfilesIcon />
    case 'levels':
      return <LevelsIcon />
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
    case 'hours':
      return <HoursIcon />
    case 'months':
      return <MonthsIcon />
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
     * Social link icons.
     */
    case 'website':
      return <WebsiteIcon />
    case 'twitter':
      return <TwitterIcon />
    case 'github':
      return <GitHubIcon />
    case 'linkedin':
      return <LinkedInIcon />
    case 'instagram':
      return <InstagramIcon />
    case 'facebook':
      return <FacebookIcon />
    case 'youtube':
      return <YouTubeIcon />
    /**
     * User profile and actions.
     */
    case 'key':
      return <KeyIcon />
    case 'star':
      return <StarIcon />
    case 'date':
      return <DateIcon />
    case 'location':
      return <LocationIcon />
    case 'organization':
      return <OrganizationIcon />
    case 'verified':
      return <VerifiedIcon />
    case 'trusted':
      return <TrustedIcon />
    /**
     * Tools and technologies
     */
    case 'graphic-design':
      return <DesignIcon />
    case 'apple':
      return <AppleIcon />
    case 'linux':
      return <LinuxIcon />
    case 'windows':
      return <WindowsIcon />
    case 'browser':
      return <BrowserIcon />
    case 'design-tool':
      return <DesignToolsIcon />
    case 'code-editor':
      return <CodeEditorsIcon />
    case 'markdown':
      return <MarkdownIcon />
    case 'terminal':
      return <TerminalIcon />
    case 'git':
      return <GitIcon />
    case 'html':
      return <HTMLIcon />
    case 'css':
      return <CSSIcon />
    case 'javascript':
      return <JavaScriptIcon />
    case 'typescript':
      return <TypeScriptIcon />
    case 'css-lf':
      return <CSSLFIcon />
    case 'css-in-js':
      return <CSSInJSIcon />
    case 'swift':
      return <SwiftIcon />
    case 'dart':
      return <DartIcon />
    case 'kotlin':
      return <KotlinIcon />
    case 'python':
      return <PythonIcon />
    case 'ruby':
      return <RubyIcon />
    case 'java':
      return <JavaIcon />
    case 'go':
      return <GoIcon />
    case 'php':
      return <PHPIcon />
    case 'c':
      return <CIcon />
    case 'programming-languages':
      return <ProgrammingLanguagesIcon />
    case 'deployment':
      return <DeploymentIcon />
    case 'nodejs':
      return <NodeJSIcon />
    case 'deno':
      return <DenoIcon />
    case 'packages':
      return <NPMIcon />
    case 'react':
      return <ReactIcon />
    case 'nextjs':
      return <NextJSIcon />
    case 'vue':
      return <VueJSIcon />
    case 'angular':
      return <AngularIcon />
    case 'javascript-lf':
      return <JavaScriptLFIcon />
    case 'redux':
      return <ReduxIcon />
    case 'rest-api':
      return <RESTAPIIcon />
    case 'graphql':
      return <GraphQLIcon />
    case 'api':
      return <APIIcon />
    case 'expressjs':
      return <span>E</span>
    case 'nodejs-lf':
      return <NodeJSLFIcon />
    case 'database':
      return <DatabaseIcon />
    case 'mongodb':
      return <MongoDBIcon />
    case 'mysql':
      return <MySQLIcon />
    case 'postgresql':
      return <PostgreSQLIcon />
    case 'redis':
      return <RedisIcon />
    case 'security':
      return <SecurityIcon />
    case 'docker':
      return <DockerIcon />
    case 'testing':
      return <TestingIcon />
    case 'analytics':
      return <AnalyticsIcon />
    case 'apm':
      return <APMIcon />
    case 'infra':
      return <InfraIcon />
    case 'gcp':
      return <GCPIcon />
    case 'aws':
      return <AWSIcon />
    case 'azure':
      return <AzureIcon />
    case 'cicd':
      return <CICDIcon />
    case 'accessibility':
      return <AccessibilityIcon />
    case 'ar-vr':
      return <ARVRIcon />
    case 'ai-ml':
      return <AIMLIcon />
    case 'games':
      return <GamesIcon />
    case 'blockchain-crypto':
      return <BlockchainCryptoIcon />
    /**
     * Mode or profession
     */
    case 'learner':
      return <LearnerIcon />
    case 'teacher':
      return <TeacherIcon />
    case 'employer':
      return <EmployerIcon />
    case 'investor':
      return <InvestorIcon />
    /**
     * When nothing found
     */
    default:
      return <CircleIcon />
  }
}
