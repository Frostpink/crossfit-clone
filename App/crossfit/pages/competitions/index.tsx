import useSWR from 'swr'
import Table from '../../components/Table'
import axios from 'axios'
import { useRouter } from 'next/router'

const competitionEndpoint = '/api/competitions'

const getData = async (req, sort) => {
    return await axios.get<{ competition_id: number; name: string }[]>(req, {
        params: {
            sort
        }
    }).then(res => {
        return res.data
    })
}

export default function Competitions() {

    const router = useRouter()
    const { data } = useSWR(competitionEndpoint, getData)

    return <>
        <h1>Athletes</h1>
        <Table>
            <thead>
                <tr><th>name</th></tr>
            </thead>
            <tbody>
                {data && data.map((competition: { competition_id: number; name: string }) => (
                    <tr key={competition.competition_id} onClick={() => router.push(`competitions/${competition.competition_id}`)}>
                        <td>{competition.name}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </>
}
