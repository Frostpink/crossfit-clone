import React from 'react'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownMenu from 'react-bootstrap/DropdownMenu'
import DropdownToggle from 'react-bootstrap/DropdownToggle'
import DropdownItem from 'react-bootstrap/DropdownItem'
import FormControl from 'react-bootstrap/FormControl'

interface SearchValues { id:string, name:string }
interface Props { athletes:SearchValues[], onClick:(id:string) => void }

export const Search: React.FC<Props> = ({ athletes, onClick, ...restProps }) => {

    return (
        // <Dropdown.Menu show={true}>
        //     {athletes.map(athlete => (
        //         <Dropdown.Item onClick={() => onClick(athlete.id)} key={athlete.id}>{athlete.name}</Dropdown.Item>
        //     ))}
        // </Dropdown.Menu>
        <div></div>
    )
}

export default Search