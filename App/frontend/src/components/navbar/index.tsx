import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import IAthlete from 'models/Athlete'
import axios from 'axios'

import Search from 'components/search'

export default function() {

    const [athletes, setAthletes] = useState<IAthlete[]>([] as IAthlete[])
    const [value, setValue] = useState<string>('')
    const [showSearch, setShowSearch] = useState<boolean>(false)

    const fetchData = async () => {

        const result = await axios.get<IAthlete[]>('http://localhost:8080/search/' + value).then((response) => {return response.data})
        
        setAthletes(result)

    }

    const history = useHistory()
    useEffect(() => {

        if (value != '') fetchData()
        
    }, [value])

    const onClick = (id: string) => {

        console.log('[clicked]')
        setValue('')
        setAthletes([] as IAthlete[])
        history.push(`/athletes/${id}`)

    }

    return (
        <>
        {/* <SearchBox athletes={athletes} onClick={onClick} /> */}
        <Navbar bg='light' variant='light' collapseOnSelect expand='lg'>
            <Navbar.Brand as={Link} to='/'>Crossfit</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'>
                    <Nav.Link as={Link} to='/'>Home</Nav.Link>
                    <Nav.Link as={Link} to='/athletes'>Athletes</Nav.Link>
                    <Nav.Link as={Link} to='/competitions'>Competitions</Nav.Link>
                    <Nav.Link as={Link} to='/athlete/new'>Register</Nav.Link>
                </Nav>

                <div>
                    {/* <Dropdown show={showSearch}>
                        <DropdownMenu onSelect={() => {console.log('[hello]')}}>
                            {athletes.map(a => (
                            <DropdownItem key={a.id} href='' onClick={() => onClick(a.id)}>{a.name}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown> */}
                </div>

            </Navbar.Collapse>
        </Navbar>
        </>
    )
}