import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import IAthlete from 'models/Athlete'

import BContainer from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BCard from 'react-bootstrap/Card'

const CRow = styled.div`
    display: flex;
    flex-direction: row;
`

const CCol = styled.div`
    display: flex;
    flex-direction: column;
`

const Card = styled(BCard)`
    box-shadow: 0 0 30px rgba(189, 189, 189, 0.171);
    margin: 20px;
`

export default function AthleteInfo() {

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [athlete, setAthlete] = useState<IAthlete>({} as IAthlete)

    const fetchData = async () => {

        const result = await axios(`http://localhost:8080/athletes/${id}`)

        let athlete = result.data[0]

        const date = new Date(athlete.date_of_birth)
        const dateFormat = `${monthNames[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`

        athlete.date_of_birth = dateFormat

        setAthlete(athlete)

    }

    useEffect(() => {
        fetchData()
    }, [])

    const { id } = useParams<{ id: string }>()

    return (

        <>
        <BContainer className='mt-md-15'>
            <Row>
                <Col xl={3} lg={4} md={5}>
                    <Card>
                        <Card.Body>
                            <Card.Title className='pb-2'>{athlete.name ? athlete.name : '--'}</Card.Title>
                            <CRow>
                                <CCol className='mr-auto'>
                                    <CRow className='py-1'>ID</CRow>
                                    <CRow className='py-1'>AGE</CRow>
                                    <CRow className='py-1'>HEIGHT</CRow>
                                    <CRow className='py-1'>WEIGHT</CRow>
                                    <CRow className='py-1'>AFFILIATE</CRow>
                                </CCol>
                                <CCol>
                                    <CRow className='py-1'>{athlete.id ? athlete.id : '--'}</CRow>
                                    <CRow className='py-1'>{athlete.id ? athlete.id : '--'}</CRow>
                                    <CRow className='py-1'>{athlete.height ? athlete.height+' cm' : '--'}</CRow>
                                    <CRow className='py-1'>{athlete.weight ? athlete.weight+' kg' : '--'}</CRow>
                                    <CRow className='py-1'>{athlete.id ? athlete.id : '--'}</CRow>
                                </CCol>
                            </CRow>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Default title</Card.Title>
                            <Card.Text>default text</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </BContainer>
        </>

    )

}
