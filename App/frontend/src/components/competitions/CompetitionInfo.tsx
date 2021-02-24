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
import { formatDate } from 'Helper'

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

    const [athletes, setAthletes] = useState<IAthlete[]>([])
    const [competition, setCompetition] = useState<ICompetition>({} as ICompetition)

    const fetchData = async () => {

        const resultAthletes = await axios.get<IAthlete[]>(`http://localhost:8080/participants/${id}`)
        const resultCompetition = await axios.get<ICompetition[]>(`http://localhost:8080/competitions/${id}`)

        let comp = resultCompetition.data[0]
        comp.start_date_time = formatDate(comp.start_date_time)
        comp.end_date_time = formatDate(comp.end_date_time)

        setCompetition(comp)

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
