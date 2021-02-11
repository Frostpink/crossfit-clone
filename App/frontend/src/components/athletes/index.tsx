import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import IAthlete from 'models/Athlete'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import { getAge } from 'Helper'

export default function AthleteList() {

    const [athletes, setAthletes] = useState<IAthlete[]>([])
    const [sort, setSort] = useState<string>('id')

    const fetchData = async (sort='id') => {

        const result = await axios.get<IAthlete[]>(`http://localhost:8080/athletes?sort=${sort}&get=id,name,gender,height,weight,date_of_birth`).then((response => {

            response.data.map((athlete: IAthlete) => {

                athlete.age = getAge(athlete.date_of_birth)

            })

            return response

        }))

        setAthletes(result.data)

    }

    useEffect(() => {
        fetchData()
    }, [])

    const history = useHistory()
    const onAthleteClick = (id: string) => {

        console.log(`[click]: Athlete ${id} clicked`)
        history.push(`/athletes/${id}`)

    }

    const newSort = (sort: string) => {
        setSort(sort)
        fetchData(sort)
    }

    return (

        <Container>
            
            <DropdownButton variant='outline-info' id="dropdown-button" title={<span className='pr-3'>Sort by {sort}</span>} className='my-5'>
                <Dropdown.Item as={Button} onClick={() => newSort('id')    }>ID    </Dropdown.Item>
                <Dropdown.Item as={Button} onClick={() => newSort('name')  }>Name  </Dropdown.Item>
                <Dropdown.Item as={Button} onClick={() => newSort('height')}>Height</Dropdown.Item>
            </DropdownButton>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Height (cm)</th>
                        <th>Weight (kg)</th>
                        <th>Date Of Birth</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {athletes.map(athlete => (
                        <tr key={athlete.id} onClick={() => onAthleteClick(athlete.id)}>
                            <td>{athlete.id}</td>
                            <td>{athlete.name}</td>
                            <td>{athlete.gender}</td>
                            <td>{athlete.height}</td>
                            <td>{athlete.weight}</td>
                            <td>{athlete.date_of_birth}</td>
                            <td>{athlete.age}</td>
                        </tr>
                    ))}
                </tbody>
                
            </Table>

        </Container>

    )

}
