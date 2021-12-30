/* eslint-disable array-callback-return */
import { Component } from "react";
import { Image } from "react-bootstrap";
import RankingRow from "./RankingRow";
import "./Ranking.scss";
import rank1 from "../../../assets/img/ranking/1.png";
import rank2 from "../../../assets/img/ranking/2.png";
import rank3 from "../../../assets/img/ranking/3.png";

const rankingList = [
  {
    name: "keval jaiswal",
    won: "12.30",
    earn: "120",
  },
  {
    name: "keval jaiswal",
    won: "12.30",
    earn: "120",
  },
  {
    name: "keval jaiswal",
    won: "12.30",
    earn: "120",
  },
  {
    name: "keval jaiswal",
    won: "12.30",
    earn: "120",
  },
  {
    name: "keval jaiswal",
    won: "12.30",
    earn: "120",
  },
  {
    name: "keval jaiswal",
    won: "12.30",
    earn: "120",
  },
  {
    name: "keval jaiswal",
    won: "12.30",
    earn: "120",
  },
  {
    name: "keval jaiswal",
    won: "12.30",
    earn: "120",
  },
  {
    name: "keval jaiswal",
    won: "12.30",
    earn: "120",
  },
  {
    name: "keval jaiswal",
    won: "12.30",
    earn: "120",
  },
];

export default class Ranking extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ranking">
        <div className="ranking-title">Ranking Table</div>
        <div className="ranking-table">
          <div className="ranking-table-head">
            <div className="ranking-table-head-rank">Rank</div>
            <div className="ranking-table-head-name">User name</div>
            <div className="ranking-table-head-won">matches won/loss</div>
            <div className="ranking-table-head-earn">LLG earn</div>
          </div>
          <div className="ranking-table-body">
            {rankingList.map((val, ind) => {
              const info = { ...val, key: ind, ind: ind };
              return <RankingRow {...info}></RankingRow>;
            })}
          </div>
        </div>
        <div className="ranking-btn_choose">Choose room to play</div>
      </div>
    );
  }
}
