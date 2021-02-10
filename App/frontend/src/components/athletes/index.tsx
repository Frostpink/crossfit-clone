import { useEffect, useState } from 'react'
import IAthlete from 'models/Athlete'
import { Container } from 'components/styled/Container'
import './style.scss'
import axios from 'axios'

export default function AthleteList() {

    const [athletes, setAthletes] = useState<IAthlete[]>([])

    const fetchData = async (sort:string='id') => {

        const result = await axios(`http://localhost:8080/athletes`)
        // const result = await axios(`http://localhost:8080/athletes?sort=${sort}&get=id,name,gender`)

        setAthletes(result.data)

    }

    useEffect(() => {
        fetchData()
    }, [])

    return (

        <Container>
            Here are all the athletes

            <div className='container'>
                <div className="header">
                    <span className="id">ID</span>
                    <span className="name">Name</span>
                    <span className="gender">Gender</span>
                </div>
                <div className='rows'>
                    {athletes.map(athlete => (
                        <a key={athlete.id}>
                            <span className='id'>{athlete.id}</span>
                            <span className='name'>{athlete.name}</span>
                            <span className="gender">{athlete.gender}</span>
                        </a>
                    ))}
                </div>
                
            </div>

        </Container>

    )

}
