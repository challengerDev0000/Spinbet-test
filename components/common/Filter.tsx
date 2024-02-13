import { useCallback, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { FILTER_LIST, STATUS } from "@/utils/constants";
import { SelectOption } from "@/types";

const SelectContainer = styled.div`
  position: relative;
  margin: 0;
`;
const SelectLabelButton = styled.button`
  margin-left: 50px;
  margin-top: 30px;
  padding: 1rem 0.5rem;
  min-width: 300px;
  font-size: 20px;
  font-weight: 700;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  color: #111;
  align-items: center;
  justify-content: space-between;
  border: 1px solid slategrey;
  cursor: pointer;
  box-shadow: 0 1px 4px 0 #ccc;
  transition: 0.3s ease;
  &:hover {
    background-color: #eee;
  }
  @media (max-width: 768px) {
    margin-left: 20px;
    min-width: 200px;
    font-size: 16px;
    font-weight: normal;
  }
`;

const DropdownStyle = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 90px;
  left: 50px;
  max-height: max-content;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: #fafafa;
  border: 1.5px solid slategrey;
  transition: max-height 0.2s ease;
  padding-bottom: 20px;
  z-index: 1000;
  ${(porps) =>
    porps.isVisible !== true &&
    css`
      min-height: 40px;
      visibility: hidden;
    `}
  @media (max-width: 768px) {
    left: 20px;
    min-width: 200px;
    top: 85px;
  }
`;

const DropdownItem = styled.div<{ active: boolean }>`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.3rem 12px;
  margin-top: 4px;
  font-size: 24px;
  font-weight: 400;
  color: #333;
  border-radius: 0.3rem;
  cursor: pointer;
  ${(p) =>
    p.active &&
    css`
      color: #166edc;
      font-weight: 500;
      background-color: #b1b4b9;
    `}
  &:hover, :focus, :focus:hover {
    background-color: #b1b4b9;
    color: #fafafa;
    outline: none;
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Count = styled.span`
  padding: 4px 12px;
  background-color: #1e1e1e;
  min-width: 60px;
  color: white;
  text-align: center;
`;

interface filterPropsType {
  selectHandler: (value: string) => void;
  result: number;
  live: number;
  upcoming: number;
  all: number;
}

export default function Filter(props: filterPropsType) {
  const { result, live, upcoming, selectHandler, all } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [current, setCurrent] = useState<SelectOption>();
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const count = (type: string): number => {
    const temp =
      type === "all"
        ? all
        : type === "result"
        ? result
        : type === "live"
        ? live
        : type === "upcoming"
        ? upcoming
        : 0;

    return temp;
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChange = (value: SelectOption) => {
    selectHandler(value.value);
    setCurrent(value);
    onClose();
  };

  return (
    <SelectContainer>
      <SelectLabelButton onClick={handleOpen}>
        {current
          ? current.label + "  < " + count(current.value) + " >"
          : "Select Filter"}
      </SelectLabelButton>
      <DropdownStyle isVisible={open}>
        {FILTER_LIST.map((item, index) => (
          <DropdownItem
            onClick={() => handleChange(item)}
            active={item.value === current?.value}
            key={index}
          >
            <span>{item.label}</span>
            <Count>{count(item.value)}</Count>
          </DropdownItem>
        ))}
      </DropdownStyle>
    </SelectContainer>
  );
}
