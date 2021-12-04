import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../modules";
import { css } from "@emotion/css";
import { ICardFace, getCardList, searchActions } from "../modules/searchModule";
import ReactCardFlip from "react-card-flip";

import Slider from "react-slick";

const Card_list: React.FC = () => {
    const dispatch = useDispatch();
    const searchState = useSelector((state: IRootState) => state.search);
    const [timeoutId, setTimeoutId] = useState(0)

    useEffect(() => {
        clearTimeout(timeoutId)

        setTimeoutId(
            Number(setTimeout(async () => {
                await dispatch(getCardList(searchState.searchConditions));
                dispatch(searchActions.initFlipState(searchState.cardList.length))
            }, 500))
        )
    }, [searchState.searchConditions])

    const clickFlipButton = (index: number) => {
        dispatch(searchActions.changeFlipState(index))
    }

    return (
        <div>
            {searchState.cardList.map((card, index) => {
                if (card.cardFaces?.length !== 0) {
                    switch (card.layout) {
                        case "normal": return CreateCardLayout(card.cardFaces[0])
                        case "split": return CreateSplitLayout(card.cardFaces)
                        case "double": return CreateDoubleLayout(card.cardFaces, index, searchState.flipState[index], clickFlipButton)
                    }
                }
            })}
        </div>
    )
}

const CreateCardLayout = (cardInfo: ICardFace) => {
    const cardStyle = css`
        display: grid;
        width: calc(29vw - 10px);
        border-top: 4px solid black;
        border-left: 4px solid black;
        grid-auto-rows: auto;
        grid-template-columns: 20% 80%;
      
        @media screen and (max-width: 1000px) {
            grid-auto-columns: auto;
            width: calc(93vw - 10px);
        }
    `;

    const titleStyle = css`
        font-size: 18px;
        font-weight: bold;
        border-right: 4px solid black;
        border-bottom: 4px solid black;
        background-color: rgb(167, 165, 165);
      
        @media screen and (max-width: 1000px) {
            grid-column: 1 / 3;
        }
    `;

    const itemStyle = css`
        font-size: 16px;
        padding: .25rem .25rem .25rem .5rem;
        color: #444;
        border-right: 4px solid black;
        border-bottom: 4px solid black;
        background-color: #fff;
        white-space: pre-wrap;
      
        @media screen and (max-width: 1000px) {
            grid-column: 1 / 3;
        }
    `;

    return (
        <>
            <div className={cardStyle}>
                <div className={titleStyle}>カード名</div>
                {cardInfo.name ?
                    <div className={itemStyle}>{cardInfo.name}//{cardInfo.name_en}</div>
                    : <div className={itemStyle}>{cardInfo.name_en}</div>
                }

                <div className={titleStyle}>テキスト</div>
                {cardInfo.text ?
                    <div className={itemStyle}>{cardInfo.text}</div>
                    : <div className={itemStyle}>{cardInfo.textEN}</div>
                }

            </div>
            <img src={cardInfo.image} />
        </>
    );
}

const CreateDoubleLayout = (cardFaces: ICardFace[], index: number, flipState: boolean, clickFlipButton: (index: number) => void) => {

    return (
        <>
            <ReactCardFlip isFlipped={flipState}>

                <div id="Front">{CreateCardLayout(cardFaces[0])}</div>

                <div id="Back">{CreateCardLayout(cardFaces[1])}</div>
            </ReactCardFlip>
            <button onClick={() => clickFlipButton(index)}>反転</button>
        </>
    );
}

const CreateSplitLayout = (cardFaces: ICardFace[]) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            <div>
                {CreateCardLayout(cardFaces[0])}
            </div>
            <div>
                {CreateCardLayout(cardFaces[1])}
            </div>
        </Slider>
    )

}

export default Card_list;