import  { getParticularEstimate } from '@/controller/posauth'
import React from 'react'
import Estimate from '../component/Estimate'

export default async function page({params}:any) {
    console.log(params)
    const {editestimate} = params
    const res = await getParticularEstimate(editestimate)
    console.log(res)
  return (
    <div>
      <Estimate res={res?.data} />
    </div>
  )
}
