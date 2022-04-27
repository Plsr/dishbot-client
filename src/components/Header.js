import logo from '../assets/images/dishbot-logo.svg'
import { Content } from '../util/layout';
import { Link } from 'react-router-dom'
import styled from '@emotion/styled';
import { Image } from '@chakra-ui/react'
import { NavLink } from '../components/NavLink';

export default function Header({ loggedIn }) {
  return (
    <Wrapper>
      <Logo to="/home">
        <Image src={logo} alt="logo" boxSize="50px" />
      </Logo>
      { loggedIn && (
        <>
          <NavLink to="/recipes">Recipes</NavLink>
          <NavLink to="/meal-plans">Meal plans</NavLink>
          <SignOutLink to="/signout">Sign Out</SignOutLink>
        </>
      )}
      { !loggedIn && (
        <SignedOutWrapper>
          <NavLink to="/signin">Sign In</NavLink>
          <SignUpLink to="/signup">Sign Up</SignUpLink>
        </SignedOutWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled(Content)`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  padding-bottom: 2rem;
`

const SignedOutWrapper = styled.div`
  margin-left: auto;
`

const Logo = styled(Link)`
  margin-right: 2rem;
`

const SignOutLink = styled(NavLink)`
  background-color: #f5ccc6;
  color: #a83232;
  margin-left: auto;

  &:hover {
    background-color: #fae4e1;
  }
`

const SignUpLink = styled(NavLink)`
  background-color: #63C7B2;
  color: #263D42;

  &:hover {
    background-color: #85e6d0;
  }
`
