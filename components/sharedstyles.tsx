import styled from "styled-components";

const Container = styled.div`
  background-color: black;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  @media (max-width: 300px) {
    width: max-content;
  }
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(400px, 1fr)
  ); /* Adjust the column size as needed */
  gap: 10px;
  padding: 0 0.5rem;
  align-items: flex-start;
  justify-content: space-around;

  @media (max-width: 400px) {
    grid-template-columns: 1fr; /* Change to a single column for small screens */
  }
`;
const Main = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    padding: 2rem 0;
  }
`;

const Text = styled.p<{
  size: number;
  color: number | string;
  weight: number | string;
}>`
  font-size: ${(props) => props.size || 0}rem;
  color: ${(props) => props.color || "white"};
  font-weight: ${(props) => props.weight || "normal"};
  text-align: center;
`;

const Description = styled.p`
  text-align: center;
  font-size: 1.5rem;
`;

export { Container, Board, Main, Text, Description };
