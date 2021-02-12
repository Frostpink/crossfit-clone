import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import IAthlete from 'models/Athlete'

import BContainer from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BCard from 'react-bootstrap/Card'

import { formatDate, getAge } from 'Helper'

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

export default function({ ...props }) {

    const [athlete, setAthlete] = useState<IAthlete>({} as IAthlete)

    const fetchData = async () => {

        const result = await axios.get<IAthlete[]>(`http://localhost:8080/athletes/${id}`)

        let athlete = result.data[0]

        athlete.age = getAge(athlete.date_of_birth)
        athlete.date_of_birth = formatDate(athlete.date_of_birth)

        setAthlete(athlete)

    }

    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        fetchData()
    }, [props.match.params.id])

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
                                    <CRow className='py-1'>GENDER</CRow>
                                    <CRow className='py-1'>HEIGHT</CRow>
                                    <CRow className='py-1'>WEIGHT</CRow>
                                    <CRow className='py-1'>AFFILIATE</CRow>
                                </CCol>
                                <CCol>
                                    <CRow className='py-1'>{athlete.id ? athlete.id : '--'}</CRow>
                                    <CRow className='py-1'>{athlete.age ? athlete.age : '--'}</CRow>
                                    <CRow className='py-1'>{athlete.gender ? athlete.gender : '--'}</CRow>
                                    <CRow className='py-1'>{athlete.height ? athlete.height+' cm' : '--'}</CRow>
                                    <CRow className='py-1'>{athlete.weight ? athlete.weight+' kg' : '--'}</CRow>
                                    <CRow className='py-1'>{athlete.affiliate ? athlete.affiliate : '--'}</CRow>
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
