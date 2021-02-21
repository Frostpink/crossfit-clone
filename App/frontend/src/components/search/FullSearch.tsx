import SearchBox from './SearchBox'
import MenuBox from './MenuBox'
import MenuLink from './MenuLink'

import { useState } from 'react'
import { Transition } from '@headlessui/react'

interface SearchValues { id:string, name:string }
interface Props { 
    list: SearchValues[]
    onClick: (id:string) => void
    value: string
    setValue: (id:string) => void
    placeholder: string
    className?: string
}

export const Search: React.FC<Props> = ({ list, onClick, value, setValue, placeholder, className }) => {

    const [showSearch, setShowSearch] = useState<boolean>(false)

    return (
        <div className={className}>
            <SearchBox placeholder={placeholder} type='text' value={value} onChange={e => setValue(e.target.value)} onBlur={() => {setShowSearch(false)}} onFocus={() => {setShowSearch(true)}} />

            <Transition
                show={showSearch}
                enter='transition-opacity duration-200'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
            >
            <MenuBox show={showSearch}>
                {list.map(a => (
                    <MenuLink key={a.id} onClick={() => {onClick(a.id)}}>{a.name}</MenuLink>
                ))}
            </MenuBox>
            </Transition>
        </div>
    )
}

export default Search