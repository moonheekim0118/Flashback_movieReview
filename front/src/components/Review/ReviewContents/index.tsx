import React from 'react';
import styled from 'styled-components';

interface Props {
  title?: string;
  description: string;
}

const ReviewContents = ({ title = '', description }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      <p>{description}</p>
    </Container>
  );
};

const Container = styled.div`
  padding: 10px 0;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

export default ReviewContents;
