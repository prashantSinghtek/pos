import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import pos_controller from '@/controller/posauth'
import { getServerSession } from 'next-auth'
import React from 'react'
import Estimate from '../component/Estimate'

export default async function page({params}:any) {
    console.log(params)
    const {editestimate} = params
    const auth = new pos_controller()
    const session = await getServerSession(authOptions)
   
    const token = session?.user?.image
    const res = await auth.GetParticularEstimate(token, editestimate)
    console.log(res)
  return (
    <div>
      <Estimate res={res?.data} />
    </div>
  )
}
