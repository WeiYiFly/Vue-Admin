import { Message } from 'view-design'
import i18n from '@/i18n'
export const frontMsg = 'msgCode.'
export const Msginfo = (msgcode) => {
  Message.info({
    background: true,
    content: i18n.tc(frontMsg + msgcode)
  })
}
export const Msgsuccess = (msgcode) => {
  Message.success({
    background: true,
    content: i18n.tc(frontMsg + msgcode)
  })
}
export const Msgwarning = (msgcode) => {
  Message.warning({
    background: true,
    content: i18n.tc(frontMsg + msgcode)
  })
}
export const Msgerror = (msgcode) => {
  Message.error({
    background: true,
    content: i18n.tc(frontMsg + msgcode)
  })
}
