import { Agents } from '@/utils/strapiApi'
import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styles from './SearchPage.module.css'

function Page() {
   const { data: allAgents, isFetching } = useQuery({
      queryKey: ['agents'],
      queryFn: () => Agents.getAll(),
   })
   const tableData = allAgents?.map((agent) => (
      <tr key={agent.id}>
         <td>
            <Link href={`/agent/${agent.id}`}>{agent.attributes.name}</Link>
         </td>
         <td>{agent.attributes.email}</td>
         <td>{agent.attributes.desc}</td>
         <td>{agent.attributes.properties.data.length}</td>
      </tr>
   ))

   return (
      <>
         <Head>
            <title>REP - Search</title>
            <meta name='description' content='Search for an agent.' />
         </Head>

         <main className={styles.page}>
            <h2>Search by name</h2>
            <input />
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Desc</th>
                     <th>Properties</th>
                  </tr>
               </thead>
               <tbody>{tableData}</tbody>
            </table>
         </main>
      </>
   )
}

export default Page
