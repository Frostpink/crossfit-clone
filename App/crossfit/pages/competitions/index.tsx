import useSWR from 'swr'
import Table from '../../components/Table'

const competitionEndpoint = 'api/competition'

const getData = async (req, res) => {
    const response = await fetch(competitionEndpoint)
    return await response.json()
}

export default function Competitions() {

    const { data } = useSWR(competitionEndpoint, getData)

    return <>
        <h1>Athletes</h1>
        <Table>
            <thead>
                <th>name</th>
            </thead>
            <tbody>
                {data && data.map((competition: { id: number; name: string; gender: string; age: string }) => (
                    <tr key={competition.id}>
                        <td>{competition.name}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </>
}
