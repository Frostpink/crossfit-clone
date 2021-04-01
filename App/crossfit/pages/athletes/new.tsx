import useSWR from 'swr'
import Table from '../../components/Table'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

const athletesEndpoint = '/api/athletes'
const getData = async (req, sort) => {
    return await axios.get<{ athlete_id: number; name: string }[]>(req, {
        params: {
            sort
        }
    }).then(res => {
        return res.data
    })
}

export default function Athletes() {

    const router = useRouter()

    const [name, setName] = useState('')

    const postData = async () => {
        await axios.post('/api/athletes', {name})
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        postData()
        event.preventDefault()
    }

    return <>
        <h1>Athlete</h1>
        <form onSubmit={handleSubmit}>
            <input className='border border-gray-500' name='Name' type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
            <input type='submit' value='Submit' />
        </form>
    </>
}
