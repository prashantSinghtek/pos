import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import  { getParticularEstimate } from '@/controller/posauth'
import { getServerSession } from 'next-auth'
import React from 'react'
import Estimate from '../component/Estimate'

export default async function page({params}:any) {
    console.log(params)
    const {editestimate} = params
    const session = await getServerSession(authOptions)
    const res = await getParticularEstimate(editestimate)
    console.log(res)
  return (
    <div>
      <Estimate res={res?.data} />
    </div>
  )
}
