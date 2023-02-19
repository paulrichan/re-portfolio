import { Agent } from './agent'
import { Image } from './image'

export type Property = {
   id: number
   attributes: {
      address: string
      price: string
      desc: string
      beds: number
      baths: number
      hoa: number
      spots: number
      publishedAt: string
      agent: {
         data: Agent
      }
      images: {
         data: Image[]
      }
   }
}
