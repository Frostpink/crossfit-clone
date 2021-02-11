import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import IAthlete from 'models/Athlete'
import axios from 'axios'

export default function Navbarr() {

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [athlete, setAthlete] = useState<IAthlete>({} as IAthlete)
    const [value, setValue] = useState<string>()

    const fetchAthlete = async () => {
        const result = await axios('http://localhost:8080/athlete/search/' + value)

        let athlete = result.data[0]

        const date = new Date(athlete.date_of_birth)
        const dateFormat = `${monthNames[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`

        athlete.date_of_birth = dateFormat

        setAthlete(athlete)

    }

    const search = (searchValue: string) => {

        

    }

    return (
        <Navbar bg='light' variant='light' collapseOnSelect expand='lg'>
            <Navbar.Brand as={Link} to='/'>Crossfit</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'>
                    <Nav.Link as={Link} to='/'>Home</Nav.Link>
                    <Nav.Link as={Link} to='/athletes'>Athletes</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}