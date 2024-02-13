import styled from "styled-components";
import { Text } from "@/components/sharedstyles";
import CircularProgress from "./circularProgress";
import { STATUS } from "@/utils/constants";

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Card = styled.div`
  background-color: #403c3c;
  padding: 1.5rem;
  color: inherit;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 400px;
  box-shadow: 1px 1px 1px 1px;
  &:hover,
  :focus,
  :active {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    width: 300px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  gap: 3px;
  flex-direction: column;
  justify-content: center;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  margin-top: 15px;
`;

const MatchState = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const TeamName = styled.p`
  text-align: center;
  font-size: 1.5rem;
  flex: 1;
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

export default function Cards({ ...props }) {
  const { match } = props;
  return (
    <FlexContainer>
      <Card>
        <CardHeader>
          <Text size={1} color="white" weight="normal">
            {match.country.toUpperCase()}
          </Text>
          <Text size={1} color="white" weight="normal">
            {match.competition}
          </Text>
          <Text
            size={1}
            color={
              match.status.type == STATUS.FINISHED
                ? "green"
                : match.status.type == STATUS.IN_PROGRESS
                ? "orange"
                : match.status.type == STATUS.NOT_STARTED
                ? "white"
                : match.status.type == STATUS.CANCELED
                ? "red"
                : ""
            }
            weight="bold"
          >
            {match.status.type.toUpperCase()}
          </Text>
        </CardHeader>
        <CardContent>
          <Text size={2} color="white" weight="normal">
            {match.homeScore.current} - {match.awayScore.current}
          </Text>
          <MatchState>
            <TeamName>{match.homeTeam.name}</TeamName>
            <CircularProgress match={match} />
            <TeamName>{match.awayTeam.name}</TeamName>
          </MatchState>
        </CardContent>
      </Card>
    </FlexContainer>
  );
}
