import useSWR from 'swr'
import Table from '@components/Table'
import Th from '@components/Th'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import tw, { styled } from 'twin.macro'

const athletesEndpoint = '/api/athletes'
const getData = async (req, sort) => {
    return await axios.get<{ athlete_id: number; name: string }[]>(req, {
        params: {
            sort
        }
    }).then(res => {
        console.log(res.data)
        return res.data
    })
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

    if (!data) return <div>LOADING</div>

    return <>
        <h1>Athletes</h1>
        <Table>
            <thead>
                <tr>
                    <Th sort={sort} onClick={() => changeSort('name')} text={'name'} />
                    <Th sort={sort} onClick={() => changeSort('gender')} text={'gender'} />
                    <th>age</th>
                </tr>
            </thead>
            <tbody>
                {data.map((athlete: { athlete_id: number; name: string; gender: string; age: string }) => (
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
