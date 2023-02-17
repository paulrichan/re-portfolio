import { Agent } from '@/types/agent'
import { Agents } from '@/utils/strapiApi'
import { useQuery } from '@tanstack/react-query'
import { NextPageContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from './AgentPage.module.css'

export async function getServerSideProps(ctx: NextPageContext) {
   const agentIP = await Agents.getById(ctx.query.id as string)

   return { props: { agentProp: agentIP } }
}

function Page({ agentIP }: { agentIP: Agent }) {
   const {
      query: { id },
   } = useRouter()
   const { data: agent, isFetching } = useQuery({
      queryKey: ['agentById'],
      queryFn: () => Agents.getById(id as string),
   })

   if (isFetching) {
      return <p>Loading...</p>
   }

   // const agent = agentQuery ?? agentIP

   const tableData = agent?.attributes?.properties?.data.map((property) => {
      const dateAdded = new Date(property.attributes.publishedAt)

      return (
         <tr key={property.id}>
            <td>
               <Link href={`/property/${property.id}`}>{property.attributes.address}</Link>
            </td>
            <td>{property.attributes.desc}</td>
            <td>${Number(property.attributes.price).toLocaleString()}</td>
            <td>{dateAdded.toLocaleDateString()}</td>
         </tr>
      )
   })

   return (
      <main>
         <div className={styles.container}>
            <div className={styles.agent_info}>
               <div className={styles.avatar}>
                  <h1>{agent?.attributes?.name.slice(0, 2)}</h1>
               </div>

               <div>
                  <h1>{agent?.attributes?.name}</h1>
                  <h4>{agent?.attributes?.email}</h4>
               </div>
            </div>

            <table>
               <thead>
                  <tr>
                     <th>Address</th>
                     <th>Description</th>
                     <th>Price</th>
                     <th>Added</th>
                  </tr>
               </thead>
               <tbody>{tableData}</tbody>
            </table>
         </div>
      </main>
   )
}

export default Page
