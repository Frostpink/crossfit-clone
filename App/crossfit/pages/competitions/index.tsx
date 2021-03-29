import useSWR from 'swr'
import Table from '../../components/Table'

const competitionEndpoint = 'api/competition'

const getData = async (req, res) => {
    const response = await fetch(competitionEndpoint)
    return await response.json()
}

export default function Competitions() {

    const { data: competitions } = useSWR(competitionEndpoint, getData)

    const onCompetitionClick = (id: string) => {
        console.log(`[click]: Competition ${id} clicked.`)
    }

    return (<>
        <h1>Athletes</h1>
        <Table data={competitions} />
    </>)
}
