import { GetServerSideProps } from 'next'
import pool from '@pool'

export default function Home({ id, name }) {
    return <>
        <h1 className='mx-auto text-2xl'>Home</h1>
        {id && name && (
            <h1 className='text-4xl'>Latest competition: {name}</h1>
        )}
    </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    console.log('getServerSideProps')

    const latest_competition = await pool.query(`select * from competitions order by competition_id limit 1`)
        .then(response => response.rows[0]).catch(err => {
            console.log(err)
        })

    if (!latest_competition) {
        return {
            notFound: true,
        }
    }

    return {
        props: { id: latest_competition.competition_id, name: latest_competition.name }, // will be passed to the page component as props
    }
}
