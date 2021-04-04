import useSWR from 'swr'
import Table from '../../components/Table'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function NewCompetition() {

    const router = useRouter()

    const [name, setName] = useState('')

    const postData = async () => {
        await axios.post('/api/competitions', {name}).then(response => {
            router.push(`/competitions/${response.data.competition_id}`)
        }).catch(err => console.log(err))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        postData()
        event.preventDefault()
    }

    return <>
        <h1>New Competition</h1>
        <form onSubmit={handleSubmit}>
            <input className='border border-gray-500' name='Name' type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
            <input type='submit' value='Submit' />
        </form>
    </>
}
