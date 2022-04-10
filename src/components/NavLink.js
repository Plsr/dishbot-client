import { Link } from 'react-router-dom'
import styled from '@emotion/styled';

export const NavLink = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: .5s;
  font-weight: 600;
  color: #3b3e4d;
  margin-right: 2rem;

  &:last-of-type {
    margin-right: 0;
  }

  &:hover {
    background-color: #e6e7ed;
  }
`