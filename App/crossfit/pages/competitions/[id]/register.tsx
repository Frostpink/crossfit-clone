import useSWR from 'swr'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'

interface Competition {
    name: string
    start_date: string
    end_date: string
}
interface Athlete {
    name: string
    athlete_id: number
}

const getData = async (req) => {
    return await axios.get
        (req).then(res => {
            return res.data
        })
}

export default function Register({ id }) {

    const router = useRouter()

    const [errorName, setErrorName] = useState('')

    const [searchValue, setSearchValue] = useState<string>('')
    const { data: athletes } = useSWR<Athlete[]>(`/api/athletes/filter?searchValue=${searchValue}`, getData)
    const [athlete, setAthlete] = useState({} as Athlete)
    const [showAthletes, setShowAthletes] = useState(false)

    const postData = async () => {

        console.log('competition ', id, 'athlete ', athlete.name)

        await axios.post('/api/register', { athlete_id: athlete.athlete_id, competition_id: id }).then(response => {
            router.push(`/competitions/${id}`)
        }).catch(err => console.log(err))

    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setErrorName('')
        postData()
        event.preventDefault()
    }

    return (
        <>
            {errorName && <div className='text-red-500'>{errorName}</div>}
            <form onSubmit={handleSubmit}>
                {/* PARTNER */}
                <div>
                    <button type='button' className='border border-gray-500' onClick={() => setShowAthletes(!showAthletes)}>{athlete.name || 'Select an athlete'}</button>
                    <input type='text' placeholder='search' value={searchValue} onChange={e => setSearchValue(e.target.value)} />
                    {showAthletes && athletes && athletes.map(athlete => (
                        <button className='bg-gray-100 border border-gray-200 shadow px-6 py-3 m-1 rounded-2xl hover:bg-gray-50' type='button' key={athlete.athlete_id} onClick={() => { setAthlete(athlete); setShowAthletes(false) }}>{athlete.name}</button>
                    ))}
                </div>

                <input type='submit' value='Submit' />
            </form>
        </>
    )
}

Register.getInitialProps = ({ query: { id } }) => {
    return { id }
}
