import { GetServerSideProps } from 'next'
import { connectToDatabase } from '@/lib/mongodb'
import Dashboard from '@/components/Dashboard'
import SEO from '@/components/SEO'

interface HomeProps {
  totalUsers: number
  totalArmadollars: number
}

export default function Home({ totalUsers, totalArmadollars }: HomeProps) {
  return (
    <>
      <SEO 
        title="Welcome"
        description="Andy's Armadollars - Employee Rewards System for Texas Roadhouse #647"
        ogImage="/og-image.png"
      />
      <Dashboard totalUsers={totalUsers} totalArmadollars={totalArmadollars} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { db } = await connectToDatabase()
  
  const totalUsers = await db.collection('users').countDocuments()
  const totalArmadollars = await db.collection('users').aggregate([
    { $group: { _id: null, total: { $sum: "$armadollarBalance" } } }
  ]).toArray()

  return {
    props: {
      totalUsers,
      totalArmadollars: totalArmadollars[0]?.total || 0,
    },
  }
}
