import React, { useState } from 'react';
import Modal from "react-modal";

import { css } from '@emotion/css';

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../modules";
import { searchActions } from "../modules/searchModule";

Modal.setAppElement('#root')

const Search_conditions = () => {
  const dispatch = useDispatch();
  const searchState = useSelector((state: IRootState) => state.search);

  const [modalCardTypeIsOpen, setModalCardTypeIsOpen] = useState(false);

  const handleCardNameChange = (e: any) => dispatch(searchActions.setSearchCardName(e.target.value));

  const handleIdColorChange = (e: any) => {
    if (e.target.checked) dispatch(searchActions.addSearchIdColor(e.target.value))
    else dispatch(searchActions.deleteSearchIdColor(e.target.value))
  }

  const handleCardTypeChange = (e: any) => {
    if (e.target.checked) dispatch(searchActions.addSearchCardType(e.target.value))
    else dispatch(searchActions.deleteSearchCardType(e.target.value))
  }

  const searchStyle = css`
    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: 20% 80%;
    
    @media screen and (max-width: 1000px) {
      grid-auto-columns: auto;
      grid-template-columns: 20% 80%;
      width: calc(93vw - 10px);
    }
  `;

  const modal = css`
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    padding: 2em;
    width: 200px;
    background-color: #d3d3d3;
    border-radius: 1em;
    transform: translate(-50%, -50%);
    outline: transparent;
  `;

  return (
    <div className={searchStyle}>
      <div>カード名</div>
      <div><input type="search" onChange={e => handleCardNameChange(e)} /></div>

      <div>固有色</div>
      <div>
        <input type="checkbox" value="W" onChange={e => handleIdColorChange(e)}></input>白
        <input type="checkbox" value="U" onChange={e => handleIdColorChange(e)}></input>青
        <input type="checkbox" value="B" onChange={e => handleIdColorChange(e)}></input>黒
        <input type="checkbox" value="R" onChange={e => handleIdColorChange(e)}></input>赤
        <input type="checkbox" value="G" onChange={e => handleIdColorChange(e)}></input>緑
        <input type="checkbox" value="C" onChange={e => handleIdColorChange(e)}></input>無色
      </div>

      <div>カードタイプ</div>
      <div>
        <button onClick={() => setModalCardTypeIsOpen(true)}>別画面で選択</button>
        <Modal isOpen={modalCardTypeIsOpen} className={modal}>
          <CardTypeConditions
            handleCardTypeChange={(e: any) => handleCardTypeChange(e)}
            clilckCloseModal={() => setModalCardTypeIsOpen(false)}
            searchedCardType={searchState.searchConditions.card_type}
          />
        </Modal>
      </div>

    </div>

  )
}

const CardTypeConditions = (props: any) => {
  const wrap = css`
    display:flex;
    flex-flow: column;
  `;

  return (
    <div className={wrap}>
      <div>カードタイプ</div>
      <div><input type="checkbox" value="creature" checked={props.searchedCardType.includes("creature")} onChange={e => props.handleCardTypeChange(e)}></input>クリーチャー</div>
      <div><input type="checkbox" value="artifact" checked={props.searchedCardType.includes("artifact")} onChange={e => props.handleCardTypeChange(e)}></input>アーティファクト</div>
      <div><input type="checkbox" value="sorcery" checked={props.searchedCardType.includes("sorcery")} onChange={e => props.handleCardTypeChange(e)}></input>ソーサリー</div>
      <div><input type="checkbox" value="instant" checked={props.searchedCardType.includes("instant")} onChange={e => props.handleCardTypeChange(e)}></input>インスタント</div>
      <div><input type="checkbox" value="enchant" checked={props.searchedCardType.includes("enchant")} onChange={e => props.handleCardTypeChange(e)}></input>エンチャント</div>
      <div><input type="checkbox" value="planeswalker" checked={props.searchedCardType.includes("planeswalker")} onChange={e => props.handleCardTypeChange(e)}></input>プレインズウォーカー</div>
      <div><input type="checkbox" value="land" checked={props.searchedCardType.includes("land")} onChange={e => props.handleCardTypeChange(e)}></input>土地</div>
      <div><input type="checkbox" value="legendary" checked={props.searchedCardType.includes("legendary")} onChange={e => props.handleCardTypeChange(e)}></input>伝説</div>
      <div><button onClick={() => props.clilckCloseModal()}>閉じる</button></div>
    </div>
  )
}

export default Search_conditions;