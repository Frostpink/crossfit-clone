import useSWR from 'swr'
import Table from '../../components/Table'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const getData = async (req, searchValue) => {
    return await axios.get<Address[]>(req, { params: { searchValue } }).then(res => {
        return res.data
    })
}

interface Address {
    id: number
    city: string
}

export default function NewPartner() {

    const router = useRouter()

    const [partnerName, setPartnerName] = useState('')
    const [contactName, setContactName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')

    const { data: addresses } = useSWR<Address[]>(['/api/addresses', address], getData)

    const postData = async () => {
        await axios.post('/api/partners', {
            partnerName, contactName, phone, email, address
        }).then(response => {
            router.push(`/partners/${response.data.competition_id}`)
        }).catch(err => console.log(err))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        postData()
        event.preventDefault()
    }

    useEffect(() => {

        axios.get<Address[]>('/api/addresses', { params: { searchValue: address } }).then(res => {
            console.log(res.data)
        })

    }, [address])

    return <>
        <h1>New Partner</h1>
        <form onSubmit={handleSubmit}>
            <input className='border border-gray-500' name='MeFit Partner Name' type='text' placeholder='Partner Name' value={partnerName} onChange={(e) => setPartnerName(e.target.value)} />
            <input className='border border-gray-500' name='MeFit Contact Name' type='text' placeholder='Contact Name' value={contactName} onChange={(e) => setContactName(e.target.value)} />
            <input className='border border-gray-500' name='MeFit Contact Phone' type='text' placeholder='Contact Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input className='border border-gray-500' name='MeFit Contact Email' type='text' placeholder='Contact Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <div>
                <input className='border border-gray-500' type='text' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                <div className='bg-red-500 absolute'>
                    <p>one</p>
                    <p>one</p>
                    <p>one</p>
                    <p>one</p>
                </div>
            </div>
            <input type='submit' value='Submit' />
        </form>
        {/* {addresses && addresses.map(address => {
            <p key={address.id}>{address.city}</p>
        })} */}
    </>
}
