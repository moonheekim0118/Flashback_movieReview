import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

interface Props {
  href: string;
  title: string;
}

const Menu = ({ href, title }: Props) => {
  return (
    <Link href={href}>
      <Anchor>{title}</Anchor>
    </Link>
  );
};

const Anchor = styled.a`
  text-decoration: none;
  padding: 20px;
  border-bottom: 1px solid #e0e0d1;
  font-size: 1.5rem;

  transition: 0.2s background-color ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #e0e0d1;
    color: black;
  }
`;

export default Menu;
