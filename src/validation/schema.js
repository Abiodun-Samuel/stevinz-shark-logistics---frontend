import * as yup from 'yup'

export const loginFormSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

export const registerFormSchema = yup.object({
  first_name: yup
    .string()
    .min(3, 'first name must be at least 3 characters')
    .required('First name is required'),
  last_name: yup
    .string()
    .min(3, 'last name must be at least 3 characters')
    .required('Last name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&#_-]/, 'Password must contain at least one special character (@$!%*?&)')
    .required('Password is required'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
})

export const inventoryFormSchema = yup.object({
  user_id: yup.string().required('staff is required'),
  item: yup.string().min(3, 'item must be at least 3 characters').required('item is required'),
  branch: yup.string().required('branch is required'),
  volume: yup.string().nullable(),
  receiver: yup.string().required('receiver details is required'),
  sender: yup.string().required('sender details is required'),
  location: yup.string().required('location is required'),
  payment_mode: yup
    .string()
    .oneOf(['cash', 'transfer', 'debit'], 'Passwords must match')
    .required('payment mode is required'),
  shipment_number: yup.string().required('shipment number is required'),
})

export const locationFormSchema = yup.object({
  city: yup.string().required('city is required'),
})
