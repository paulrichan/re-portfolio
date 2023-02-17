/* eslint-disable @next/next/no-img-element */
import { Property } from '@/types/property'
import { Properties } from '@/utils/strapiApi'
import { useQuery } from '@tanstack/react-query'
import { NextPageContext } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from './PropertyPage.module.css'

function Page() {
   const {
      query: { id },
   } = useRouter()
   const { data: property, isFetching } = useQuery({
      queryKey: ['agentById'],
      queryFn: () => Properties.getById(id as string),
   })
   const [imgIndex, setImgIndex] = useState(0)

   if (isFetching) {
      return <p>Loading...</p>
   }

   const images = property?.attributes.images?.data?.map((img, idx) => (
      <button onClick={() => setImgIndex(idx)} className={styles.carousel_btn} key={img.id}>
         <img alt='' className={styles.carousel_img} src={img.attributes.src} />
      </button>
   ))

   return (
      <main className={styles.page}>
         <div className={styles.img_container}>
            <div className={styles.property_img}>
               <img
                  className={styles.main_img}
                  src={property?.attributes.images.data[imgIndex].attributes.src ?? ''}
                  alt='main prop img'
               />
            </div>

            <div className={styles.carousel}>{images}</div>
         </div>

         <div className={styles.info}>
            <h3>{property?.attributes.address}</h3>
            <h3>${Number(property?.attributes.price).toLocaleString()}</h3>
         </div>
         <p>{property?.attributes.desc}</p>

         <h4>
            Agent: {property?.attributes.agent.data.attributes.name} -{' '}
            <a href={`mailto:${property?.attributes.agent.data.attributes.email}`}>
               {property?.attributes.agent.data.attributes.email}
            </a>
         </h4>
      </main>
   )
}

export default Page
