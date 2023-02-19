import NavBar from '@/components/NavBar'
import { api } from '@/utils/strapiApi'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '@/styles/AgentPage.module.css'
import { signOut, useSession } from 'next-auth/react'

function Page() {
   const {
      query: { id },
      isReady,
   } = useRouter()
   const { data: agent } = useQuery({
      queryKey: ['agentById'],
      queryFn: () => api.agents.getById(id as string),
      enabled: isReady,
   })
   const { data: userData } = useSession()
   const userEmail = userData?.user?.email
   const agentEmail = agent?.attributes.email
   const isSignedInUserProfile = userEmail === agentEmail

   if (!agent) {
      return <p>Loading...</p>
   }
   const hasNoProperties = agent?.attributes?.properties?.data?.length === 0

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
      <>
         <NavBar navTo='search' btnText='Search' />
         <main className='page'>
            <div className={styles.container}>
               {isSignedInUserProfile && (
                  <div className={styles.controls}>
                     <button onClick={() => signOut()}>Sign out</button>
                     <Link href='/property/add'>Add Property</Link>
                  </div>
               )}

               <div className={styles.agent_info}>
                  <div className={styles.avatar}>
                     <h1>{agent?.attributes?.name?.slice(0, 2)}</h1>
                  </div>

                  <div className={styles.name_email}>
                     <h1>{agent?.attributes?.name}</h1>
                     <a className={styles.email} href={`mailto:${agent?.attributes?.email}`}>
                        Email
                     </a>
                  </div>
               </div>

               {hasNoProperties ? (
                  <p>No properties yet!</p>
               ) : (
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
               )}
            </div>
         </main>
      </>
   )
}

export default Page
