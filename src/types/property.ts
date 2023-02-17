import { Agent } from './agent'
import { Image } from './image'

export type Property = {
   id: number
   attributes: {
      address: string
      price: string
      desc: string
      publishedAt: string
      agent: {
         data: Agent
      }
      images: {
         data: Image[]
      }
   }
}
