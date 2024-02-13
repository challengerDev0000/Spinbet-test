import styled from "styled-components";
import { Match } from "@/types";
import { STATUS } from "@/utils/constants";

const CircularProgressWrapper = styled.div`
  transform: rotate(-90deg);
  position: relative;
  flex: 1;
  width: 150px;
  height: 150px;
  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

const CircularProgressSVG = styled.svg`
  width: 100%;
  height: 100%;
`;

const CircularProgressCircleBackground = styled.circle`
  fill: none;
  stroke: #f0f0f0;
  stroke-width: 10;
`;

const CircularProgressCircle = styled.circle`
  fill: none;
  stroke: green;
  stroke-width: 10;
  stroke-linecap: round;
`;

const CircularProgressText = styled.text`
  transform: rotate(90deg);
  transform-origin: center;
  font-size: 40px;
  fill: green;
  dominant-baseline: middle;
  text-anchor: middle;
`;

interface propsType {
  match: Match;
}

export default function CircularProgress(props: propsType) {
  let offset = 0;
  const { match } = props;
  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  if (match.status.type === STATUS.FINISHED) {
    offset = 0;
  } else if (
    match.status.type === STATUS.NOT_STARTED ||
    match.status.type === STATUS.CANCELED
  ) {
    offset = circumference;
  } else if (match.status.type === STATUS.IN_PROGRESS) {
    if (match.liveStatus == "HT") {
      offset = 0.5 * circumference;
    } else {
      offset = ((90 - parseInt(match.liveStatus)) / 90) * circumference;
    }
  }

  return (
    <CircularProgressWrapper>
      <CircularProgressSVG viewBox="0 0 200 200">
        <CircularProgressCircleBackground cx="100" cy="100" r={radius} />
        <CircularProgressCircle
          cx="100"
          cy="100"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <CircularProgressText x="100" y="100">
          {match.status.type === STATUS.CANCELED ? "-" : match.liveStatus}
        </CircularProgressText>
      </CircularProgressSVG>
    </CircularProgressWrapper>
  );
}
