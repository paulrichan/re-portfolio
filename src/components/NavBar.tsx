import { api } from '@/utils/strapiApi'
import { IconUserCircle, IconUserSearch } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

interface NavBarProps {
   navTo?: string
   btnText?: string | React.ReactNode
}

function NavBar(props: NavBarProps) {
   const { data: session, status } = useSession()
   const isAuthenticated = status === 'authenticated'
   const { data: userData } = useQuery({
      queryKey: ['user'],
      queryFn: () => api.agents.getByEmail(session?.user?.email ?? ''),
      enabled: isAuthenticated,
   })
   const id = userData?.data[0]?.id
   const isAuthenticatedWithNoPage = isAuthenticated && !id

   return (
      <nav>
         <div className='container'>
            <h1>Logo</h1>

            {/* {isAuthenticated && <Link href='/register'>Register as Agent</Link>} */}

            <div style={{ display: 'flex', gap: '1em' }}>
               {isAuthenticated ? (
                  <Link className='nav_link' href={isAuthenticatedWithNoPage ? '/register' : `/agent/${id}`}>
                     <IconUserCircle />
                  </Link>
               ) : (
                  <button className='signin_btn' onClick={() => signIn()}>
                     Sign in
                  </button>
               )}

               <Link className='nav_link' href={`/search`}>
                  <IconUserSearch />
               </Link>
            </div>
         </div>
      </nav>
   )
}

export default NavBar
