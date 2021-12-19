import ReactCardFlip from "react-card-flip";
import { css } from "@emotion/css";
import { ICardFace } from "../../modules/searchModule";
import Slider from "react-slick";
import React from "react";

export const CreateCardLayout = (cardInfo: ICardFace) => {
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
            <div>
                <img src={cardInfo.image} />
            </div>
        </>
    );
}

export const CreateDoubleLayout = (cardFaces: ICardFace[], index: number, flipState: boolean, clickFlipButton: (index: number) => void) => {

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

export const CreateSplitLayout = (cardFaces: ICardFace[]) => {
    const sliderStyle = css`
        .slick-prev:before,
        .slick-next:before {
            color: black;
        }
        .slick-prev {
            left: 25px;
        }
        .slick-next {
            right: 25px;
        }
        `;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <Slider {...settings} className={sliderStyle}>
            <div>
                {CreateCardLayout(cardFaces[0])}
            </div>
            <div>
                {CreateCardLayout(cardFaces[1])}
            </div>
        </Slider >
    )

}
