import Link from 'next/link'

import React from 'react'

function Page() {
   return (
      <div style={{ display: 'flex', height: '100vh', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
         <h2>
            This agent has no page yet <br />
            <br /> If you are the agent: <Link href='/register'>Register Here</Link>
         </h2>
      </div>
   )
}

export default Page
