import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../modules";
import { getCardList, searchActions } from "../../modules/searchModule";
import { CreateCardLayout, CreateDoubleLayout, CreateSplitLayout } from "./CardLayout"

const CardList: React.FC = () => {
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

export default CardList;