import useSWR from 'swr'
import Table from '../../components/Table'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

const athletesEndpoint = '/api/athletes'
// const getData = url => fetch(url).then(res => res.json())
const getData = async (req, sort) => {
    // const response = await fetch(req)

    return await axios.get<{ athlete_id: number; name: string }[]>(req, {
        params: {
            sort
        }
    }).then(res => {
        return res.data
    })

    // return await response.json()
}

export default function Athletes() {

    const router = useRouter()

    const [sort, setSort] = useState<string>('name asc')
    const { data } = useSWR([athletesEndpoint, sort], getData)

    const changeSort = (_sort: string) => {

        if (!sort.includes(_sort)) setSort(`${_sort} asc`)

        else if (sort.includes('asc')) setSort(`${_sort} desc`)
        else setSort(`${_sort} asc`)

    }

    return <>
        <h1>Athletes</h1>
        <Table>
            <thead>
                <tr>
                    <th onClick={() => changeSort('name')}>name</th>
                    <th onClick={() => changeSort('gender')}>gender</th>
                    <th>age</th>
                </tr>
            </thead>
            <tbody>
                {data && data.map((athlete: { athlete_id: number; name: string; gender: string; age: string }) => (
                    <tr key={athlete.athlete_id} onClick={() => router.push(`athletes/${athlete.athlete_id}`)}>
                        <td>{athlete.name}</td>
                        <td>{athlete.gender}</td>
                        <td>{athlete.age}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </>
}
