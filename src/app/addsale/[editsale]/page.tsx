import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import  { getParticularSaleCash } from '@/controller/posauth'
import { getServerSession } from 'next-auth'
import React from 'react'
import Sale from '../component/Sale'


export default async function page({params}:any) {
    console.log(params)
    const {editsale} = params
    const session = await getServerSession(authOptions)
    const res = await getParticularSaleCash(editsale)
    console.log(res)
  
  return (
    <div>
      <Sale res={res?.data} />
    </div>
  )
}
