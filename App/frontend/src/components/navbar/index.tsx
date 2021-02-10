import { Nav, NavBrand, NavItem, NavItemButton, NavItems } from './styles/style'

export default function Navbar() {
    return (
        <Nav>
            <NavBrand to='/'>Crossfit</NavBrand>
            <NavItems>
                <NavItem to='/'>Home</NavItem>
                <NavItem to='/athletes'>Athletes</NavItem>
            </NavItems>
        </Nav>
    )
}