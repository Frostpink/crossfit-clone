import useSWR from 'swr'
import Table from '../../components/Table'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface Contact {
    name: string
    email: string
    phone: string
}
interface Partner {
    id: number
    name: string
}
interface Address {
    street_number: string
    street: string
    city: string
    postal_code: string
    province: string
}
interface Competition {
    name: string
    start_date: string
    end_date: string
}

const getData = async (req) => {
    return await axios.get
        (req).then(res => {
            return res.data
        })
}

// router.push(`/competitions/${response.data.competition_id}`)
export default function NewCompetition() {
    const router = useRouter()

    const [errorName, setErrorName] = useState('')

    const { data: partners } = useSWR<Partner[]>(`/api/partners`, getData)
    const [showPartners, setShowPartners] = useState(false)

    const [competition, setCompetition] = useState<Competition>({} as Competition)
    const [contact, setContact] = useState<Contact>({} as Contact)
    const [partner, setPartner] = useState<Partner>({} as Partner)
    const [address, setAddress] = useState<Address>({} as Address)

    const postData = async () => {
        try {
            const contact_id = await axios
                .get('/api/contacts', { params: contact })
                .then(async response => {
                    console.log(response)
                    if (response.data.length > 0) return response.data[0].id
                    console.log('contact does not exist')
                    return await axios.post('/api/contacts', contact).then(res => {
                        if (res.data.code) throw Error(res.data.message)
                        return res.data[0].id
                    })
                })

            const address_id = await axios
                .get('/api/addresses', { params: address })
                .then(async response => {
                    console.log(response)
                    if (response.data.length > 0) return response.data[0].id
                    console.log('address does not exist')
                    return await axios.post('/api/addresses', address).then(res => {
                        if (res.data.code) throw Error(res.data.message)
                        return res.data[0].id
                    })
                })

            const competition_id = await axios.post('/api/competitions', { competition: { ...competition, contact_id: contact_id, address_id: address_id, partner_id: partner.id} }).then(res => {
                if (res.data.code) throw Error(res.data.message)
                console.log(res)
                return res.data[0].competition_id
            })
            
            console.log(competition_id)
        } catch (err) {
            console.log(err)
            setErrorName(err.message)
        }

    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setErrorName('')
        postData()
        event.preventDefault()
    }

    return (
        <>
            <h1>New Competition</h1>
            {errorName && <div className='text-red-500'>{errorName}</div>}
            <form onSubmit={handleSubmit}>
                <input className='border border-gray-500' name='MeFit Name' type='text' placeholder='Competition Name' value={competition.name || ''} onChange={e => setCompetition({ ...competition, name: e.target.value })} />
                <input className='border border-gray-500' type='text' placeholder='Start Date' value={competition.start_date || ''} onChange={e => setCompetition({ ...competition, start_date: e.target.value })} />
                <input className='border border-gray-500' type='text' placeholder='End Date' value={competition.end_date || ''} onChange={e => setCompetition({ ...competition, end_date: e.target.value })} />

                {/* PARTNER */}
                <div>
                    <button type='button' className='border border-gray-500' onClick={() => setShowPartners(!showPartners)}>{partner.name || 'Select a partner'}</button>
                    {showPartners && partners.map(partner => (
                        <button type='button' key={partner.id} onClick={() => { setPartner(partner); setShowPartners(false) }}>{partner.name}</button>
                    ))}
                </div>

                {/* CONTACT PERSON */}
                <input className='border border-gray-500' type='text' placeholder='Name' value={contact.name || ''} onChange={e => setContact({ ...contact, name: e.target.value })} />
                <input className='border border-gray-500' type='text' placeholder='Email' value={contact.email || ''} onChange={e => setContact({ ...contact, email: e.target.value })} />
                <input className='border border-gray-500' type='text' placeholder='Phone' value={contact.phone || ''} onChange={e => setContact({ ...contact, phone: e.target.value })} />

                {/* ADDRESS */}
                <input className='border border-gray-500' type='text' placeholder='Street Number' value={address.street_number || ''} onChange={(e) => setAddress({ ...address, street_number: e.target.value })} />
                <input className='border border-gray-500' type='text' placeholder='Street' value={address.street || ''} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
                <input className='border border-gray-500' type='text' placeholder='City' value={address.city || ''} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                <input className='border border-gray-500' type='text' placeholder='Postal Code' value={address.postal_code || ''} onChange={(e) => setAddress({ ...address, postal_code: e.target.value })} />
                <input className='border border-gray-500' type='text' placeholder='Province' value={address.province || ''} onChange={(e) => setAddress({ ...address, province: e.target.value })} />

                <input type='submit' value='Submit' />
            </form>
        </>
    )
}
