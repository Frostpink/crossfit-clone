import { useRouter } from 'next/router'
import Table from '@components/Table'
import Th from '@components/Th'
import axios from 'axios'
import useSWR from 'swr'
import tw from 'twin.macro'
import Link from 'next/link'
import { useState } from 'react'

interface Competition {
    competition_id: number
    name: string
    contact_name: string
}
interface Participant {
    athlete_id: number
    athlete_name: string
}
interface Event {
    event_name: string
    id: number
}
interface Leaderboard {
    competition_name: string
    athlete_name: string
    leaderboard_rank: number
    leaderboard_points: number
}
interface Score {
    competition_name: string
    athlete_name: string
    event_name: string
    event_rank: number
    event_points: number
}

const getData = async (req) => {
    return await axios.get
        (req).then(res => {
            return res.data
        })
}

const DataLine = tw.p`py-1 bg-gray-200 px-4 rounded-full text-black self-start my-2 shadow border-gray-500`
function EventInfo({ name }) {
    return <>
        <div className='bg-gray-100 border border-gray-200 shadow h-48 w-60 px-6 py-3 m-5 rounded-2xl'>
            <div>{ name }</div>
        </div>
    </>
}
function AthleteInfo({ id, name, competition_id }) {

    const [open, setOpen] = useState<boolean>(false)

    // const { data: results } = useSWR<{event_name: string; score: string}[]>(`/api/results`, getData)
    const { data: results } = useSWR<{event_name: string; score: string}[]>(`/api/results?athlete_id=${id}&competition_id=${competition_id}`, getData)

    return <>
        <div className='bg-gray-100 border border-gray-200 shadow px-6 py-3 m-1 rounded-2xl hover:bg-gray-50' onClick={() => setOpen(!open)}>
            <div>{ name }</div>
            {open && results.map(result => 
                <div key={result.event_name}>{ result.event_name }: { result.score }</div>
            )}
        </div>
    </>
}

export default function Competition({ id }) {

    const { data } = useSWR<Competition>(`/api/competitions/${id}`, getData)
    const { data: participants } = useSWR<Participant[]>(`/api/competitions/${id}/participants`, getData)
    const { data: events } = useSWR<Event[]>(`/api/competitions/${id}/events`, getData)
    // const { data: workouts } = useSWR(`/api/workouts/${events}`)

    const { data: leaderboard } = useSWR<Leaderboard[]>(`/api/leaderboard?competition=${id}`, getData)
    const { data: scores } = useSWR<Score[]>(`/api/leaderboard/scores`, getData)

    return <>
        <div className='flex flex-col'>
            {data && <>
                <DataLine> COMPETITION ID: {data.competition_id}</DataLine>
                <DataLine> NAME: {data.name} </DataLine>
                <DataLine> CONTACT: {data.contact_name}</DataLine>
            </>}

            {/* ATHLETES REGISTERED */}
            <h3 className='font-medium text-lg ml-6'>Athletes Registered:</h3>
            <div className='flex flex-row justify-center flex-wrap container mx-auto'>
                {participants && participants.map(athlete => (
                    <AthleteInfo key={athlete.athlete_id} id={athlete.athlete_id} name={athlete.athlete_name} competition_id={id} />
                ))}
            </div>

            {/* EVENTS */}
            <h3 className='font-medium text-lg ml-6'>Events:</h3>
            <div className='flex flex-row flex-wrap container mx-auto'>
                {events && events.map(event => (
                    <EventInfo name={event.event_name} />

                ))}
            </div>

            <Link href={`/competitions/${id}/register`}><div className='bg-gray-100 border border-gray-200 shadow px-6 py-3 m-1 rounded-2xl hover:bg-gray-50 focus:outline-none'>REGISTER ATHLETE</div></Link>

            {/* LEADERBOARD */}
            <Table>
                <thead>
                    <tr>
                        <Th onClick={() => {}} sort={'rank asc'} text={'Rank'} />
                        <Th onClick={() => {}} sort={'rank asc'} text={'Athlete'} />
                        <Th onClick={() => {}} sort={'rank asc'} text={'Points'} />
                        {events && events.map(event => (
                            <Th onClick={() => {}} sort={'rank asc'} text={event.event_name} />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {leaderboard && leaderboard.map(row => (
                        <tr key={row.athlete_name}>
                            <td>{ row.leaderboard_rank }</td>
                            <td>{ row.athlete_name }</td>
                            <td>{ row.leaderboard_points }</td>
                            {scores && scores.filter(score => score.athlete_name === row.athlete_name).map(score => (
                                <td>{score.event_rank}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>

        </div>
    </>
}

Competition.getInitialProps = ({ query: { id } }) => {
    return { id }
}
