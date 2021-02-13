import { useState } from 'react'
import axios from 'axios'

import IAthlete from 'models/Athlete'

export default function() {

    const [athlete, setAthlete] = useState<IAthlete>({} as IAthlete)

    const postData = async () => {

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
        <>
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={athlete.name} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        </>
    )
}