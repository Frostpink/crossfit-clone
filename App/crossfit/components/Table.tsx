import { FunctionComponent } from "react"
import tw, { styled } from 'twin.macro'

const Style = styled.table`
    ${tw`table-auto w-full`}
    thead {
        ${tw`bg-gray-100`}
    }
    th {
        ${tw`text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider relative pr-4 select-none`}
    }
    tbody {
        ${tw`bg-white divide-y divide-gray-200`}
    }
    tbody tr {
        ${tw`hover:bg-gray-300`}
    }
    td {
        ${tw`px-6 py-4 whitespace-nowrap`}
    }
`
export const Table = ({ children }) => {
    return <>
        <div className='shadow border-b overflow-hidden border-gray-50 sm:rounded-lg container mx-auto'>
            <Style>
                {children}
            </Style>
        </div>
    </>
}

export default Table