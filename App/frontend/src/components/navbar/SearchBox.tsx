import styled from 'styled-components'

export default styled.input`
    padding: 5px 5px 5px 12px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #d1d1d1;
    transform: scale(1);
    transition: transform 200ms ease-in-out;

    &:focus {
        transform: scale(1.05);
    }
`