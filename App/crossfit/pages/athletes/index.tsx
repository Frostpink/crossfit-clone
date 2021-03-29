import useSWR from 'swr'
import Table from '../../components/Table'

const athletesEndpoint = 'api/athlete'
// const fetcher = url => fetch(url).then(res => res.json())
const getData = async (req, res) => {
    const response = await fetch(athletesEndpoint)
    return await response.json()
}

export default function Athletes() {

    const { data: athletes } = useSWR(athletesEndpoint, getData)

    const onAthleteClick = (id: string) => {
        console.log(`[click]: Athlete ${id} clicked.`)
    }

    return (<>
        <h1>Athletes</h1>
        <Table callbackFunction={onAthleteClick} data={athletes} />
    </>)
}
