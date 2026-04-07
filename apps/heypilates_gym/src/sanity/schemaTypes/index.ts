import home from './homeType'
import { founderType } from './founderType'
import classType from './classType'
import privateTraining from './privateTrainingType'
import ChatbotType from './ChatbotType'
import classScheduleType from './classScheduleType'
import pricingType from './pricingType'
import { contactType } from './contactType'
import teacherType from './teacherType'
import contactMessageType from './contactMessageType'
import eventType from './eventType'

export const schema = {
  types: [
    home,
    founderType,
    classType,
    classScheduleType,
    pricingType,
    privateTraining,
    ChatbotType,
    contactType,
    teacherType,
    contactMessageType,
    eventType,
  ],
}
