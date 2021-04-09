/**
 * Form validatiion. Usage:
 * import { yupResolver } from '@hookform/resolvers/yup'
 * https://github.com/react-hook-form/resolvers/issues/71#issuecomment-754623998
 * https://github.com/react-hook-form/resolvers/issues/100
 */
import * as Yup from 'yup'

const max = 100
const maxMessage = 'Max 100 characters'
const urlMessage = 'Must be a valid URL using http:// or https://'

/**
 * Yup validations.
 */
export const yupEmail = Yup.string()
  .email('Email address is invalid.')
  .required('Email is required.')

export const yupPassword = Yup.string()
  .min(10, 'Minimum of 10 characters.')
  .required('Password is required.')

export const yupPasswordAlt = Yup.string().required('Password is required.')

export const yupName = Yup.string()
  .max(50, 'Maximum of 50 characters.')
  .required('Name is required.')

export const yupNickname = Yup.string()
  .max(10, 'Maximum of 10 characters.')
  .matches(/^[a-zA-Z]+$/, 'Can only use alphabets.')

export const yupHandle = Yup.string()
  .min(3, 'Minimum of 3 characters.')
  .max(50, 'Maximum of 50 characters.')
  .required('Username or handle is required.')
  .matches(/^[a-zA-Z0-9_]+$/, 'Can only use alphabets, numbers, underscores.')

export const yupProfileMode = Yup.mixed().oneOf([
  'Learner',
  'Employer',
  'Investor',
])

/**
 * Yup objects.
 */

export const SignUpSchema = Yup.object().shape({
  name: yupName,
  email: yupEmail,
  password: yupPassword,
})

export const SignInSchema = Yup.object().shape({
  email: yupEmail,
  password: yupPasswordAlt,
})

export const SignInMagicSchema = Yup.object().shape({
  email: yupEmail,
})

export const NameNickSchema = Yup.object().shape({
  name: yupName,
  nick: yupNickname,
})

export const HandleSchema = Yup.object().shape({
  handle: yupHandle,
})

export const EmailSchema = Yup.object().shape({
  email: yupEmail,
})

export const PasswordChangeSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: yupPassword,
})

export const ProfileModeSchema = Yup.object().shape({
  mode: yupProfileMode,
})

export const ProfileSchema = Yup.object().shape({
  name: yupName,
  headline: Yup.string().max(max, maxMessage),
  bio: Yup.string().max(1000, 'Max 1000 characters'),
  country: Yup.string(),
  location: Yup.string().max(max),
  organizationUrl: Yup.string().url(urlMessage).max(max, maxMessage),
  organizationName: Yup.string().max(max, maxMessage),
  organizationTitle: Yup.string().max(max, maxMessage),
  websiteUrl: Yup.string().url(urlMessage).max(max, maxMessage),
  websiteName: Yup.string().max(max, maxMessage),
  twitterUrl: Yup.string().url(urlMessage).max(max, maxMessage),
  githubUrl: Yup.string().url(urlMessage).max(max, maxMessage),
  linkedinUrl: Yup.string().url(urlMessage).max(max, maxMessage),
})
