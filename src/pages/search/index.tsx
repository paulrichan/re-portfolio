import NavBar from '@/components/NavBar'
import { api } from '@/utils/strapiApi'
import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'
import styles from '@/styles/SearchPage.module.css'

function Page() {
   const [name, setName] = useState('')
   const { data: allAgents } = useQuery({
      queryKey: ['agents'],
      queryFn: async () => await api.agents.getAll(),
   })
   const tableData = allAgents
      ?.filter((agent) => agent.attributes.name.toLowerCase().includes(name.toLowerCase()))
      ?.map((agent) => (
         <tr key={agent.id}>
            <td>
               <Link href={`/agent/${agent.id}`}>{agent.attributes.name}</Link>
            </td>
            <td>
               <a className={styles.email_link} href={`mailto:${agent.attributes.email}`}>
                  Send Email
               </a>
            </td>
            <td style={{ width: '40%' }}>{agent.attributes.desc}</td>
            <td>{agent.attributes.properties.data.length}</td>
         </tr>
      ))

   const handleNameSearch = (e: React.FormEvent<HTMLInputElement>) => {
      const name = e.currentTarget.value
      setName(name)
   }

   return (
      <>
         <Head>
            <title>REP - Search</title>
            <meta name='description' content='Search for an agent.' />
         </Head>

         <NavBar navTo='' btnText='Home' />

         <main className='page'>
            <div className={styles.search}>
               <h3>Search by name</h3>
               <input value={name} onChange={handleNameSearch} />
            </div>
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
