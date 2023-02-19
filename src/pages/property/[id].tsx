/* eslint-disable @next/next/no-img-element */
import NavBar from '@/components/NavBar'
import { Property } from '@/types/property'
import { api } from '@/utils/strapiApi'
import { IconBath, IconBed, IconReceipt2, IconCar } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { NextPageContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from '@/styles/PropertyPage.module.css'

const ICON_DETAILS = {
   size: '40',
   opacity: 0.6,
}

function Page() {
   const {
      query: { id },
      isReady,
   } = useRouter()
   const { data: property } = useQuery({
      queryKey: ['agentById'],
      queryFn: () => api.properties.getById(id as string),
      enabled: isReady,
   })
   const [imgIndex, setImgIndex] = useState(0)

   if (!property) {
      return <p>Loading...</p>
   }

   const images = property?.attributes.images?.data.map((img, idx) => (
      <button onClick={() => setImgIndex(idx)} className={styles.carousel_btn} key={img.id}>
         <img alt='' className={styles.carousel_img} src={img.attributes.src} />
      </button>
   ))

   return (
      <>
         <NavBar navTo='search' btnText='Search' />
         <main className='page'>
            <div className={styles.hero_container}>
               <div className={styles.img_container}>
                  <img
                     className={styles.main_img}
                     src={property?.attributes?.images?.data[imgIndex]?.attributes?.src ?? ''}
                     alt='main prop img'
                  />
               </div>
            </div>
            <div className={styles.carousel}>{images}</div>

            <div className={styles.info}>
               <h3>{property?.attributes.address}</h3>
               <h3>${Number(property?.attributes.price).toLocaleString()}</h3>
            </div>
            <p>{property?.attributes.desc}</p>

            <div className={styles.grid}>
               <div>
                  <IconBed size={ICON_DETAILS.size} opacity={ICON_DETAILS.opacity} />
                  <h5>Beds</h5>
                  <h3>{property?.attributes.beds}</h3>
               </div>
               <div>
                  <IconBath size={ICON_DETAILS.size} opacity={ICON_DETAILS.opacity} />
                  <h5>Baths</h5>
                  <h3>{property?.attributes.baths}</h3>
               </div>
               <div>
                  <IconReceipt2 size={ICON_DETAILS.size} opacity={ICON_DETAILS.opacity} />
                  <h5>HOA</h5>
                  <h3>{property?.attributes.hoa ? `$${property?.attributes.hoa} / month` : '-'}</h3>
               </div>
               <div>
                  <IconCar size={ICON_DETAILS.size} opacity={ICON_DETAILS.opacity} />
                  <h5>Covered Spots</h5>
                  <h3>{property?.attributes.spots ?? '-'}</h3>
               </div>
            </div>

            <h4>
               Agent: {property?.attributes.agent?.data.attributes.name} -{' '}
               <a href={`mailto:${property?.attributes.agent?.data.attributes.email}`}>
                  {property?.attributes.agent?.data.attributes.email}
               </a>
            </h4>
         </main>
      </>
   )
}

export default Page
