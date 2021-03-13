import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import ICompetition from 'models/Competition'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import { formatDate } from 'Helper'
import Search from 'components/search'

export default function () {

    const [competitions, setCompetitions] = useState<ICompetition[]>([])
    const [sort, setSort] = useState<string>('id')

    const fetchData = async () => {

        const result = await axios.get<ICompetition[]>(`http://localhost:8080/competitions?sort=${sort}`)

        console.log(result)

        result.data.map((comp: ICompetition) => {
            comp.start_date_time = formatDate(comp.start_date_time)
            comp.end_date_time = formatDate(comp.end_date_time)
        })

        setCompetitions(result.data)

    }

    useEffect(() => {
        fetchData()
    }, [sort])

    const history = useHistory()
    const onCompetitionClick = (id: string) => {

        console.log(`[click]: Competition ${id} clicked`)
        history.push(`/competitions/${id}`)

    }


    // Search thing
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchList, setSearchList] = useState<ICompetition[]>([] as ICompetition[])

    useEffect(() => {
        if (searchValue != '') fetchSearchData()
    }, [searchValue])

    const fetchSearchData = async () => {
        const result = await axios.get<ICompetition[]>(`http://localhost:8080/search/${searchValue}?what=competitions`).then(response => (response.data))
        setSearchList(result)
    }


    return (

        <Container>
            
            <div className='flex flex-row'>
                <DropdownButton variant='outline-info' id="dropdown-button" title={<span className='pr-3'>Sort by {sort}</span>} className='my-5'>
                    <Dropdown.Item as={Button} onClick={() => setSort('id')    }>ID    </Dropdown.Item>
                    <Dropdown.Item as={Button} onClick={() => setSort('name')  }>Name  </Dropdown.Item>
                </DropdownButton>

                <Search.FullSearch
                    className='my-auto ml-auto mr-6'
                    list={searchList}
                    placeholder='Search Competitions'
                    onClick={onCompetitionClick}
                    setValue={setSearchValue}
                    value={searchValue}
                />
            </div>

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
