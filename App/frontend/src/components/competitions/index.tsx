import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import ICompetition from 'models/Competition'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'

export default function () {

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [competitions, setCompetitions] = useState<ICompetition[]>([])
    const [sort, setSort] = useState<string>('id')

    const fetchData = async (sort='id') => {

        const result = await axios(`http://localhost:8080/competitions?sort=${sort}&get=id,name,venue,start_date_time,end_date_time`)

        result.data.map((comp: ICompetition) => {
            let date = new Date(comp.start_date_time)
            console.log(date)
            let dateFormat = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
            comp.start_date_time = dateFormat
        })
        result.data.map((comp: ICompetition) => {
            let date = new Date(comp.end_date_time)
            console.log(date.getDate())
            let dateFormat = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
            comp.end_date_time = dateFormat
        })


        setCompetitions(result.data)

    }

    useEffect(() => {
        fetchData()
    }, [])

    const history = useHistory()
    const onCompetitionClick = (id: string) => {

        console.log(`[click]: Competition ${id} clicked`)
        // history.push(`/competitions/${id}`)

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
            </DropdownButton>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Venue</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {competitions.map(comp => (
                        <tr key={comp.id} onClick={() => onCompetitionClick(comp.id)}>
                            <td>{comp.id}</td>
                            <td>{comp.name}</td>
                            <td>{comp.venue}</td>
                            <td>{comp.start_date_time}</td>
                            <td>{comp.end_date_time}</td>
                        </tr>
                    ))}
                </tbody>
                
            </Table>

        </Container>

    )

}
