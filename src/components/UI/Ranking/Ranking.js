/* eslint-disable array-callback-return */
import { Component } from "react";
import RankingRow from "./RankingRow";
import "./Ranking.scss";
import axios from "axios";
import { socketServerPort } from "../../../config";
import { Modal } from "react-bootstrap";

export default class Ranking extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios
      .post(
        `http://${window.location.hostname}:${socketServerPort}/api/rankAll`
      )
      .then((res) => {
        let rankData = [...res.data.rankData];
        rankData.sort((a, b) => {
          if ( (b.won - b.lost) > (a.won - a.lost) ) {
            return 1;
          } else if ( (b.won - b.lost) < (a.won - a.lost) ) {
            return -1;
          } else {
            return b.won - a.won;
          }
        });

        this.setState({
          rankData,
        });

        console.log(this.state.rankData);
      });
  }

  render() {
    return (
      <Modal
        className="Ranking"
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
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
              {this.state && this.state.rankData
                ? this.state.rankData.map((item, index) => {
                    const info = {
                      name: item.username,
                      won: `${item.won} / ${item.lost}`,
                      earn: item.earn,
                      key: index,
                      index: index,
                    };

                    return <RankingRow {...info}></RankingRow>;
                  })
                : null}
            </div>
          </div>
          <div className="ranking-btn_choose" onClick={this.props.hideAction}>Back</div>
        </div>
      </Modal>
    );
  }
}
