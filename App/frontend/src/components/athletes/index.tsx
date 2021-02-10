import { useEffect, useState } from 'react'
import IAthlete from 'models/Athlete'
import { Container } from 'components/styled/Container'
import './style.scss'

export default function AthleteList() {

    const [athletes, setAthletes] = useState<IAthlete[]>([])

    const fetchData = async (sort:string='id') => {
         
        const result: IAthlete[] = [
            {
                id:"1",
                name:"name1",
                gender:"male",
                date_of_birth:new Date,
                height:0,
                weight:0
            },
            {
                id:"2",
                name:"name2",
                gender:"female",
                date_of_birth:new Date,
                height:0,
                weight:0
            }
        ]

        setAthletes(result)

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
                    <span className="name">NAME</span>
                </div>
                {athletes.map(athlete => (
                    <a key={athlete.id}>
                        <span className='id'>{athlete.id}</span>
                        <span className='name'>{athlete.name}</span>
                        <span className="gender">{athlete.gender}</span>
                    </a>
                ))}
            </div>

        </Container>

    )

}
