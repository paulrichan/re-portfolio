import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import ScrollIndicator from '@/components/ScrollIndicator'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import { IconUserSearch } from '@tabler/icons-react'

export default function Home() {
   return (
      <>
         <Head>
            <title>REP</title>
            <meta name='description' content='Create your very own real estate portfolio!' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel='icon' href='/favicon.ico' />
         </Head>
         <main className={`${styles.main}`}>
            <NavBar navTo='search' btnText={<IconUserSearch />} />

            <section className={styles.hero}>
               <div className={styles.content}>
                  <div className={styles.hero_img}>
                     <Image src='/vercel.svg' alt='' fill />
                  </div>

                  <h1 className={styles.hero_title}>Build your very own, custom real estate portfolio.</h1>
               </div>

               <ScrollIndicator />
            </section>

            <section>How it works</section>
         </main>
      </>
   )
}
