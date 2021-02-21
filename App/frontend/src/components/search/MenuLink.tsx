import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default styled.a`
    color: #7a7a7a;
    padding: 3px 15px;
    transition: background-color 200ms ease-in-out;
    
    &:hover {
        text-decoration: none;
        color: #7a7a7a;
        background-color: #eee;
    }
`