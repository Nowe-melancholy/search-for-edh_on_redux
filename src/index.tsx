import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { setupStore } from "./store";

import { css } from '@emotion/css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Header from "./components/Header";
import CardList from "./components/CardList/CardList";
import SearchConditions from "./components/SearchConditions";
import ResultCount from "./components/ResultCount"

const store = setupStore();

const pageStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

const headerStyle = css`
    background-color: black;
    color: white;
    width: 100%;
  `;

const mainStyle = css`
    width: 60%;
    background-color: rgb(233, 233, 233);

    @media screen and (max-width: 1000px) {
      width: 100%;
    }
  `;

const App: React.FC = () => {
  return (
    <>
      <div className={pageStyle}>
        <div className={headerStyle}><Header /></div>

        <div className={mainStyle}>
          <SearchConditions />
          <ResultCount />
          <CardList />
        </div>
      </div>
    </>
  )
}

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);