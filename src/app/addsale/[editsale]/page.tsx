import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import pos_controller from '@/controller/posauth'
import { getServerSession } from 'next-auth'
import React from 'react'
import Sale from '../component/Sale'


export default async function page({params}:any) {
    console.log(params)
    const {editsale} = params
    const auth = new pos_controller()
    const session = await getServerSession(authOptions)
   
    const token = session?.user?.image
    const res = await auth.GetParticularsaleCash(token, editsale)
    console.log(res)
  
  return (
    <div>
      <Sale res={res?.data} />
    </div>
  )
}
