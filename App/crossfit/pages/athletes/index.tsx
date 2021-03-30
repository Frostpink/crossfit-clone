import useSWR from 'swr'
import Table from '../../components/Table'

const athletesEndpoint = 'api/athlete'
// const fetcher = url => fetch(url).then(res => res.json())
const getData = async (req, res) => {
    const response = await fetch(athletesEndpoint)
    return await response.json()
}

export default function Athletes() {

    const { data } = useSWR(athletesEndpoint, getData)

    return <>
        <h1>Athletes</h1>
        <Table>
            <thead>
                <th>name</th>
                <th>gender</th>
                <th>age</th>
            </thead>
            <tbody>
                {data && data.map((athlete: { id: number; name: string; gender: string; age: string }) => (
                    <tr key={athlete.id}>
                        <td>{athlete.name}</td>
                        <td>{athlete.gender}</td>
                        <td>{athlete.age}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </>
}
