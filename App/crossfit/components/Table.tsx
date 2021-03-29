import { FunctionComponent } from "react"

type Athlete = {
    name: string
    id: number
    gender: string
    age: number
}

type Competition = {
    name: string
    id: number
}

type Props = {
    data: readonly Athlete[]|Competition[]
}

const Table: FunctionComponent<Props> = ({ data }) => {
    return <>
        <div className='shadow border-b overflow-hidden border-gray-200 rounded-lg container mx-auto'>
            <table className='table-auto w-full'>
                <thead className='bg-gray-100'>
                    <tr>
                        {data && Object.keys(data[0]).map(header => (
                            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {data && data.map(el => (
                        <tr className='hover:bg-gray-300' key={el.id}>
                            {Object.keys(el).map(key => (
                                <td className='px-6 py-4 whitespace-nowrap'>{ el[key] }</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}

export default Table