import axios from 'axios'
import { Agent } from '@/types/agent'
import { Property } from '@/types/property'

interface GetProps {
   collection: string
   id?: string
}

const http = axios.create({
   baseURL: process.env.NEXT_PUBLIC_STRAPI_API,
   headers: { 'Content-Type': 'application/json' },
})

const fetchApi = async ({ collection, id }: GetProps) => {
   const res = await http.get(`/${collection}${id ? `/${id}` : ''}?populate=*`)
   const data = await res.data.data

   return data
}

const postApi = async ({ collection, data }: { collection: string; data: any }) => {
   const res = await http.post(`/${collection}`, data)
   return res.data
}

class AgentsApi {
   getAll(): Promise<Agent[]> {
      return fetchApi({ collection: 'agents' })
   }
   getById(id: string): Promise<Agent> {
      return fetchApi({ collection: 'agents', id: id })
   }
   async getByEmail(email: string): Promise<{ data: Omit<Agent[], 'properties'> }> {
      const res = await http.get(`/agents?filters[email][$eq]=${email}`)
      const data = await res.data
      return data
   }
   async createAgent(data: any) {
      const res = await postApi({ collection: 'agents', data })
      return res
   }
}

class PropertiesApi {
   getById(id: string): Promise<Property> {
      return fetchApi({ collection: 'properties', id: id })
   }
   async create(data: any, images: string[], agentId: number) {
      let relationIds: number[] = []
      // Loops through images, adds to db, grabs ids in array for relationships with properties
      for (let i = 0; i < images.length; i++) {
         const res = await postApi({ collection: 'images', data: { data: { src: images[i] } } })
         if (res.data.id) {
            relationIds.push(res.data.id)
         }
      }
      const dataWithRelations = { data: { images: { connect: relationIds }, agent: { connect: [agentId] }, ...data } }

      const res = await postApi({ collection: 'properties', data: dataWithRelations })

      return res.data
   }
   async delete(id: number) {
      const res = await http.delete('/properties/' + id)
      const status = res.status
      return status
   }
}

export const api = {
   agents: new AgentsApi(),
   properties: new PropertiesApi(),
}
