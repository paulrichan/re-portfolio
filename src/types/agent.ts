import { Property } from './property'

export interface Agent {
   id: number
   attributes: {
      name: string
      email: string
      desc: string
      properties: {
         data: Property[]
      }
   }
}
