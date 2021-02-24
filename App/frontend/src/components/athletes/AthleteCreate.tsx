import { useContext, useDebugValue, useReducer, useState } from 'react'
import axios from 'axios'

import IAthlete from 'models/Athlete'

import SearchBox from 'components/search/SearchBox'

interface InputProps {
    label: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    name: string
}
const Input: React.FunctionComponent<InputProps> = (props: InputProps) => {

    return (
        <label className='self-end'>
            {props.label}
            <SearchBox className='ml-5 md:w-72' type="text" name={props.name} value={props.value} onChange={props.onChange} />
        </label>
    )
}

export default function() {

    const [athlete, setAthlete] = useState<IAthlete>({name: '', gender: ''} as IAthlete)
    const [athleteHeight, setAthleteHeight] = useState<string>('')

    const postData = async () => {

        console.log(athlete)
        await axios.post('http://localhost:8080/athlete', athlete).then((res) => console.log(res)).catch((err) => console.log(err))

    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        postData()
        event.preventDefault()
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setAthlete( {...athlete, [e.target.name]: e.target.value} )
    }

    return (
        <form onSubmit={handleSubmit} className='m-auto flex flex-col'>

            <h1 className='text-4xl mb-14'>Create a new athlete</h1>

            <Input name='name' label={'Name:'} value={athlete.name} onChange={handleChange} />
            <Input name='gender' label={'Gender:'} value={athlete.gender} onChange={handleChange} />

            <input className='px-6 py-3 mt-10 shadow-sm rounded-xl outline-none self-center' type="submit" value="Submit" />

        </form>
    )
}
