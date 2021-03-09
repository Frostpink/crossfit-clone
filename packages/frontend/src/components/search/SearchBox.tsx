import styled from 'styled-components'
import tw from 'twin.macro'

// padding: 5px 5px 5px 12px;
// border-radius: 5px;
// outline: none;
// border: 1px solid #d1d1d1;
// transform: scale(1);
// transition: transform 200ms ease-in-out;

// &:focus {
//     transform: scale(1.05);
// }

export default tw.input`
    pt-1
    pr-1
    pb-1
    pl-4
    rounded
    outline-none
    border
    border-gray-200
    
    transform scale-100
    transition-transform

    focus:scale-105
`