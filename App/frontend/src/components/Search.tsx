import React from 'react'

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