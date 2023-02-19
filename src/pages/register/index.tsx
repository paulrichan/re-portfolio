import React, { useState } from 'react'
import styles from '@/styles/RegisterPage.module.css'
import NavBar from '@/components/NavBar'
import { useSession } from 'next-auth/react'
import { api } from '@/utils/strapiApi'
import { useRouter } from 'next/router'

function Page() {
   const router = useRouter()
   const { data: session } = useSession()
   const [name, setName] = useState(session?.user?.name ?? '')
   const [desc, setDesc] = useState('')
   const [submitting, setSubmitting] = useState(false)

   const agentData = JSON.stringify({
      data: {
         name: name,
         desc: desc,
         email: session?.user?.email,
      },
   })

   async function handleCreateAgent() {
      setSubmitting(true)
      try {
         const data = await api.agents.createAgent(agentData)
         const agentId = data.data.id
         if (data) {
            setName('')
            setDesc('')
            router.push(`/agent/${agentId}`)
         }
      } catch (error) {
         console.log(error)
      } finally {
         setSubmitting(false)
      }
   }

   return (
      <>
         <NavBar navTo='' btnText='Home' />
         <main className={styles.page}>
            <div className={styles.container}>
               <h2>Register as Agent</h2>
               <p>This will allow you to post new properties.</p>

               <label className={styles.input_label}>Name</label>
               <input value={name} onChange={(e) => setName(e.currentTarget.value)} type='text' />
               <label className={styles.input_label}>Description</label>
               <textarea
                  onChange={(e) => setDesc(e.currentTarget.value)}
                  placeholder='I am a registered real estate agent in the state of AZ. My id# is 123456. Email me today to find your dream home!'
                  cols={30}
                  rows={10}
               />
               <button disabled={submitting} onClick={() => handleCreateAgent()} className={styles.btn}>
                  {submitting ? 'Submitting...' : 'Register'}
               </button>
            </div>
         </main>
      </>
   )
}

export default Page
