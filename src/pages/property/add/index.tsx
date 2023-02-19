import NavBar from '@/components/NavBar'
import { api } from '@/utils/strapiApi'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

function Page() {
   const [address, setAddress] = useState('')
   const [desc, setDesc] = useState('')
   const [price, setPrice] = useState(0)
   const [beds, setBeds] = useState(0)
   const [baths, setBaths] = useState(0)
   const [hoa, setHoa] = useState(0)
   const [spots, setSpots] = useState(0)
   const [images, setImages] = useState([''])
   const { data: userData } = useQuery<{ data: Array<{ id: number }> }>({ queryKey: ['user'] })
   const agentId = userData?.data[0]?.id as number

   const data = {
      address: address,
      desc: desc,
      price: price,
      beds: beds,
      baths: baths,
      hoa: hoa,
      spots: spots,
   }

   function handleOnChangeImg(idx: number, value: string) {
      const imagesCopy = [...images]
      imagesCopy[idx] = value

      setImages(imagesCopy)
   }

   function handleDeleteImgInput(idx: number) {
      const imagesCopy = [...images]
      const newImages = imagesCopy.filter((_, index) => index !== idx)
      setImages(newImages)
   }

   const imgInputs = images.map((img, idx) => {
      return (
         <div key={idx} style={{ display: 'flex', gap: '5px' }}>
            <button style={{ width: '50px' }} onClick={() => handleDeleteImgInput(idx)}>
               -
            </button>
            <input type='text' value={img ?? ''} onChange={(e) => handleOnChangeImg(idx, e.currentTarget.value)} />
         </div>
      )
   })

   return (
      <>
         <NavBar />
         <div className='page'>
            <h2>Add a Property</h2>

            <label>Images</label>
            {imgInputs}
            <button onClick={() => setImages((prev) => [...prev, ''])}>Add more</button>

            <label>Address</label>
            <input type='text' onChange={(e) => setAddress(e.currentTarget.value)} />
            <label>Description</label>
            <input type='text' onChange={(e) => setDesc(e.currentTarget.value)} />
            <label>Price</label>
            <input type='number' onChange={(e) => setPrice(Number(e.currentTarget.value))} />
            <label>Beds</label>
            <input type='number' onChange={(e) => setBeds(Number(e.currentTarget.value))} />
            <label>Baths</label>
            <input type='number' onChange={(e) => setBaths(Number(e.currentTarget.value))} />
            <label>HOA</label>
            <input type='number' onChange={(e) => setHoa(Number(e.currentTarget.value))} />
            <label>Covered Spots</label>
            <input type='number' onChange={(e) => setSpots(Number(e.currentTarget.value))} />
            <button onClick={() => api.properties.create(data, images, agentId)}>Submit</button>
         </div>
      </>
   )
}

export default Page
