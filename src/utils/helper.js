import { useToast } from 'vue-toast-notification'
import moment from 'moment'

export const toast = useToast()
export const toastSuccess = (message, position = 'top-right', duration = 5000) => {
  if (!message) return
  return toast.success(message, { position, duration })
}

export const toastError = (message, position = 'top-right', duration = 5000) => {
  if (!message) return
  return toast.error(message, { position, duration })
}

export const shipmentNumberGen = (dest, phone) => {
  const now = moment()
  const dateCode = now.format('DD')
  const monthCode = now.format('MM')
  let destCode = dest.substring(0, 3).toUpperCase()
  let phoneCode = phone.slice(-3)
  return `${destCode}-${phoneCode}-${dateCode}${monthCode}`
}

export const formatWithoutTimeStamps = (time) => {
  if (time) {
    let display = moment(time).utc(time).format('DD MMM YYYY')
    return display
  }
}
