import React from "react";
import styled from "styled-components";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  limit: number;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaginationBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #242435;
  width: fit-content;
  padding: 0.5rem 1.5rem;
  border-radius: 10px;
`;

const PaginationButton = styled.button<{ disabled?: boolean }>`
  color: white; /* Set text color to white */
  display: flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: #242435;
  img {
    filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(175deg)
      brightness(121%) contrast(114%);
  }
  ${(props) => (props.disabled ? disabled : enabled)};
`;

const enabled = `
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #DFB40F;
  }
  &:active {
    background-color: #8F640F;
  }
`;

const disabled = `
  cursor: not-allowed;
  background-color: var(--color-primary-disabled);
`;

const PaginationLabel = styled.label`
  font-size: 1rem;
  color: white;
  margin: 0.5rem 0.5rem;
`;

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  total,
  limit,
}) => {
  const goToFirstPage = () => setPage(1);

  const goToLastPage = () => setPage(getLastPage());

  const incrementPage = () => page < getLastPage() && setPage(page + 1);

  const decrementPage = () => page > 1 && setPage(page - 1);

  const atFirstPage = () => page === 1;

  const atLastPage = () => page === getLastPage();

  const getLastPage = () => Math.ceil(total / limit);

  return (
    <PaginationContainer>
      <PaginationBoard>
        <PaginationButton
          onClick={() => goToFirstPage()}
          disabled={atFirstPage()}
        >
          {`<<`}
        </PaginationButton>
        <PaginationButton
          onClick={() => decrementPage()}
          disabled={atFirstPage()}
        >
          {`<`}
        </PaginationButton>
        <PaginationLabel>{page}</PaginationLabel>
        <PaginationButton onClick={incrementPage} disabled={atLastPage()}>
          {`>`}
        </PaginationButton>
        <PaginationButton onClick={goToLastPage} disabled={atLastPage()}>
          {`>>`}
        </PaginationButton>
      </PaginationBoard>
    </PaginationContainer>
  );
};

export default Pagination;
