import { useRouter } from 'next/router'
import Table from '../../components/Table'
import axios from 'axios'
import useSWR from 'swr'
import tw from 'twin.macro'

type athlete = {
    athlete_id: number
    name: string
    gender: string
    date_of_birth: Date
    height: number
    weight: number
    nationality: string
}

const athletesEndpoint = '/api/athletes'
const getData = async (req) => {
    console.log(req)
    return await axios.get<athlete>
        (req).then(res => {
            console.log(res.data)
            return res.data
        })
}

const DataLine = tw.p`py-1 bg-gray-200 px-4 rounded-full text-black self-start my-2 shadow border-gray-500`

export default function Athlete() {

    const router = useRouter()
    const { id } = router.query

    const { data } = useSWR(`${athletesEndpoint}/${id}`, getData)

    return <>
        <h1>Athlete with id of {id}</h1>
        <div className='flex flex-col'>
            {data && <>
                <DataLine> ID: {data.athlete_id}</DataLine>
                <DataLine> NAME: {data.name} </DataLine>
                <DataLine> GENDER: {data.gender} </DataLine>
                <DataLine> DATE OF BIRTH: {data.date_of_birth}</DataLine>
                <DataLine> HEIGHT: {data.height}</DataLine>
                <DataLine> WEIGHT: {data.weight}</DataLine>
                <DataLine> NATIONALITY: {data.nationality}</DataLine>
            </>}
        </div>
    </>
}
