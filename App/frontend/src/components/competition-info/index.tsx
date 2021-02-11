import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import IAthlete from 'models/Athlete'
import ICompetition from 'models/Competition'

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

export default function () {

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [athletes, setAthletes] = useState<IAthlete[]>([])
    const [competition, setCompetition] = useState<ICompetition>({} as ICompetition)

    const fetchData = async () => {

        const resultAthletes = await axios(`http://localhost:8080/participants/${id}`)
        const resultCompetition = await axios(`http://localhost:8080/competitions/${id}`)

        let date, dateFormat

        // format dates on competition
        const competition: ICompetition = resultCompetition.data[0]
        date = new Date(competition.start_date_time)
        dateFormat = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
        competition.start_date_time = dateFormat

        date = new Date(competition.end_date_time)
        dateFormat = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
        competition.end_date_time = dateFormat

        setCompetition(competition)

        setAthletes(resultAthletes.data)

    }

    useEffect(() => {
        fetchData()
    }, [])

    const { id } = useParams<{ id: string }>()

    const history = useHistory()
    const gotoAthleteInfo = (id: string) => {
        history.push(`/athletes/${id}`)
    }

    return (

        <>
        <BContainer className='mt-md-15'>
            <Row>
                <Col xl={4} lg={5} md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title className='pb-2'>{competition.name ? competition.name : '--'}</Card.Title>
                            <CRow>
                                <CCol className='mr-auto'>
                                    <CRow className='py-1'>ID</CRow>
                                    <CRow className='py-1'>NAME</CRow>
                                    <CRow className='py-1'>VENUE</CRow>
                                    <CRow className='py-1'>START</CRow>
                                    <CRow className='py-1'>END</CRow>
                                </CCol>
                                <CCol>
                                    <CRow className='py-1'>{competition.id ?     competition.id : '--'}</CRow>
                                    <CRow className='py-1'>{competition.name ?     competition.name : '--'}</CRow>
                                    <CRow className='py-1'>{competition.venue ? competition.venue : '--'}</CRow>
                                    <CRow className='py-1'>{competition.start_date_time ? competition.start_date_time : '--'}</CRow>
                                    <CRow className='py-1'>{competition.end_date_time ?     competition.end_date_time : '--'}</CRow>
                                </CCol>
                            </CRow>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Participants</Card.Title>
                            
                            {athletes.map((athlete: IAthlete) => 
                                <CRow onClick={() => gotoAthleteInfo(athlete.id)}>{athlete.name}</CRow>
                            )}

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </BContainer>
        </>

    )

}
