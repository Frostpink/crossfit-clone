import useSWR from 'swr'
import Table from '../../components/Table'
import axios from 'axios'
import { useRouter } from 'next/router'

const getData = async (req) => {
    return await axios.get(req).then(res => {
        return res.data
    })
}

interface Partner {
    id: number
    name: string
    contact_person_id: number
    address_id: string
}
interface Contact {
    id: number
    name: string
}

export default function Partners() {

    const { data: partners } = useSWR<Partner[]>('/api/partners', getData)
    // console.log( partners.map(partner => { 
    //     const { data: contacts } = useSWR<Partner[]>(`/api/contact_persons/${partner.contact_person_id}`, getData)
    //     return contacts
    // }) )


    return <>
        <Table>
            <thead>
                <tr>
                    <th>partner name</th>
                    {/* <th>contact person</th> */}
                    {/* <th>city</th> */}
                </tr>
            </thead>
            <tbody>
                {partners && partners.map(partner => (
                    <tr key={partner.id}>
                        <td>{partner.name}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </>
}
