import { useEffect, useReducer, useState } from "react";
import Head from "next/head";
import { Container, Board, Main } from "@/components/sharedstyles";
import Cards from "@/components/cards/cards";
import Filter from "@/components/common/Filter";
import sports from "@/mock/sports.json";
import { Match, StateType, Action } from "@/types";
import Pagination from "@/components/common/pagination";
import { PAGE_COUNT, STATUS } from "@/utils/constants";

const reducer = (state: StateType, action: Action) => {
  switch (action.type) {
    case "all":
      return { ...state, filteredItems: state.items };
    case "result":
      return {
        ...state,
        filteredItems: state.items.filter(
          (item) => item.status.type === STATUS.FINISHED
        ),
      };
    case "upcoming":
      return {
        ...state,
        filteredItems: state.items.filter(
          (item) => item.status.type === STATUS.NOT_STARTED
        ),
      };
    case "live":
      return {
        ...state,
        filteredItems: state.items.filter(
          (item) => item.status.type === STATUS.IN_PROGRESS
        ),
      };
    default:
      return { ...state, filteredItems: state.items };
  }
};

export default function Home() {
  const [filter, setFilter] = useState<string>("");
  const [data, setData] = useState<Array<Match>>(sports as Array<Match>);
  const [result, setResult] = useState<number>(0);
  const [live, setLive] = useState<number>(0);
  const [upcoming, setUpcoming] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(sports.length);
  const [showData, setShowData] = useState<Array<Match>>(
    sports as Array<Match>
  );

  useEffect(() => {
    setResult(
      sports.filter((match) => match.status.type === STATUS.FINISHED).length
    );
    setLive(
      sports.filter((match) => match.status.type === STATUS.IN_PROGRESS).length
    );
    setUpcoming(
      sports.filter((match) => match.status.type === STATUS.NOT_STARTED).length
    );
  }, [sports]);

  const [state, dispatch] = useReducer(reducer, {
    items: data,
    filteredItems: data,
  });

  useEffect(() => {
    dispatch({ type: filter });
  }, [filter]);

  useEffect(() => {
    setShowData(
      state.filteredItems.slice(
        (currentPage - 1) * PAGE_COUNT,
        currentPage * PAGE_COUNT
      )
    );
    setTotalCount(state.filteredItems.length);
  }, [currentPage]);

  useEffect(() => {
    setShowData(
      state.filteredItems.slice(
        (currentPage - 1) * PAGE_COUNT,
        currentPage * PAGE_COUNT
      )
    );
    setTotalCount(state.filteredItems.length);
    setCurrentPage(1);
  }, [state.filteredItems]);

  const selectHandler = (value: string) => {
    setFilter(value);
  };

  return (
    <Container>
      <Head>
        <title>Sports Live</title>
        <meta name="description" content="Sports Live" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Filter
        selectHandler={selectHandler}
        all={sports.length}
        result={result}
        live={live}
        upcoming={upcoming}
      />
      <Board>
        {showData?.map((data) => {
          return (
            <Main key={data.id}>
              <Cards match={data} />
            </Main>
          );
        })}
      </Board>
      <Pagination
        page={currentPage}
        total={totalCount}
        limit={PAGE_COUNT}
        setPage={setCurrentPage}
      />
    </Container>
  );
}
