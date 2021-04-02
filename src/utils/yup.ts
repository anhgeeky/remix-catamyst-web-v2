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
  .email('Email address is invalid')
  .required('Email is required')

export const yupPassword = Yup.string()
  .min(10, 'Must be at least 10 characters')
  .required('Password is required')

export const yupPasswordAlt = Yup.string().required('Password is required')

export const yupName = Yup.string()
  .max(50, 'Must be 50 characters or less')
  .required('Full name is required')

export const yupHandle = Yup.string()
  .min(4, 'Must be at least 4 characters')
  .max(50, 'Must be less than 50 characters')
  .required('Username/handle is required')
  .matches(/^[a-z0-9A-Z]+$/, 'Can only use alphabet and numbers')

/**
 * Yup objects.
 */

export const SignUpSchema = Yup.object().shape({
  email: yupEmail,
  password: yupPassword,
  // name: yupName,
  // handle: yupHandle,
})

export const SignInSchema = Yup.object().shape({
  email: yupEmail,
  password: yupPasswordAlt,
})

export const SignInPasswordlessSchema = Yup.object().shape({
  email: yupEmail,
})

export const UserNameHandleSchema = Yup.object().shape({
  name: yupName,
  handle: yupHandle,
})

export const UserHandleSchema = Yup.object().shape({
  handle: yupHandle,
})

export const UserEmailSchema = Yup.object().shape({
  email: yupEmail,
})

export const UserPasswordChangeSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: yupPassword,
})

export const UserProfileSchema = Yup.object().shape({
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
