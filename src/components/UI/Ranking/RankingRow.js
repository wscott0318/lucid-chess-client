/* eslint-disable array-callback-return */
import { Component } from "react";
import { Image } from "react-bootstrap";
import rank1 from "../../../assets/img/ranking/1.png";
import rank2 from "../../../assets/img/ranking/2.png";
import rank3 from "../../../assets/img/ranking/3.png";

export default class Ranking extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.arrImg = [rank1, rank2, rank3];
  }

  render() {
    return (
      <div className="ranking-table-body-row">
        <div className="ranking-table-body-row-rank">
          {this.props.index < 3 ? (
            <Image
              className="ranking-table-body-row-rank-img"
              src={this.arrImg[this.props.index]}
            ></Image>
          ) : (
            this.props.index + 1
          )}
        </div>
        <div className="ranking-table-body-row-name">{this.props.name}</div>
        <div className="ranking-table-body-row-won">{this.props.won}</div>
        <div className="ranking-table-body-row-earn">{this.props.earn}</div>
      </div>
    );
  }
}
