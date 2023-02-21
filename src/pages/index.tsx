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
         <main>
            <NavBar navTo='search' btnText={<IconUserSearch />} />

            <section className={styles.hero}>
               <div className={styles.content}>
                  <div className={styles.hero_img}>
                     <Image src='/REP-logo.svg' style={{ objectFit: 'contain' }} alt='' fill />
                  </div>

                  <h1 className={styles.hero_title}>Build your very own, custom real estate portfolio.</h1>
               </div>

               <ScrollIndicator />
            </section>

            <section className={styles.feat_section}>
               <div className={styles.image_text_container}>
                  <div className={styles.feature_text}>
                     <h2>Show Off</h2>
                     <br />
                     <p>Build your very own agent&apos;s page to show off all of your listed properties!</p>
                  </div>

                  <div className={styles.feature_img_container}>
                     <Image src='/agent-page.png' alt='' fill />
                  </div>
               </div>

               <div className={styles.image_text_container}>
                  <div className={styles.feature_img_container}>
                     <Image src='/property-page.png' alt='' fill />
                  </div>

                  <div className={styles.feature_text}>
                     <h2>Custom Page</h2>
                     <br />
                     <p>A custom page is generated for each property that you list.</p>
                  </div>
               </div>

               <div className={styles.image_text_container}>
                  <div className={styles.feature_text}>
                     <h2>Search</h2>
                     <br />
                     <p>Search for your favorite real estate agent.</p>
                  </div>
                  <div className={styles.feature_img_container}>
                     <Image src='/search-page.png' alt='' fill />
                  </div>
               </div>
            </section>

            <section className={styles.cta_section}>
               <h1>Find your agent today!</h1>
               <Link className={styles.search_cta} href='/search'>
                  Search
               </Link>
            </section>
         </main>
      </>
   )
}
