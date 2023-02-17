import axios from 'axios'
import { Agent } from '@/types/agent'
import { Property } from '@/types/property'

interface GetProps {
   collection: string
   id?: string
}

class Api {
   static async get({ collection, id }: GetProps) {
      const res = await axios.get(process.env.NEXT_PUBLIC_STRAPI_API + `/${collection}${id ? `/${id}` : ''}?populate=*`)
      const data = res.data.data

      return data
   }
}

export class Agents {
   static getAll(): Promise<Agent[]> {
      return Api.get({ collection: 'agents' })
   }
   static getById(id: string): Promise<Agent> {
      return Api.get({ collection: 'agents', id: id })
   }
}

export class Properties {
   static getById(id: string): Promise<Property> {
      return Api.get({ collection: 'properties', id: id })
   }
}
