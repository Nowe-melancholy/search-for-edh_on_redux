import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GetCardList from "../api/cardListApi"

interface PayloadAction<P> {
    payload: P;
}

export interface ICardFace {
    name: string
    name_en: string
    mana_cost: string
    color: string
    text: string
    textEN: string
    image: string
}

export interface ICard {
    layout: string
    oracle_id: string
    id_color: string
    cmc: number
    cardFaces: ICardFace[]
}

export interface ISearchConditions {
    card_name: string
    id_color: string[]
    mana_cost: string[]
    color: string[]
    text: string
    card_type: string[]
}

export interface IState {
    cardList: ICard[]
    searchConditions: ISearchConditions
    resultCount: number
    isLoading: boolean
    flipState: boolean[]
}

const initialState: IState = {
    searchConditions: {
        card_name: "",
        id_color: [],
        mana_cost: [],
        color: [],
        text: "",
        card_type: []
    },
    cardList: [],
    resultCount: 0,
    isLoading: false,
    flipState: []
}

export const getCardList = createAsyncThunk(
    "search/getCardList",
    async (searchConditions: ISearchConditions) => {
        const data_ja = await GetCardList(searchConditions, "ja")
        const data_en = await GetCardList(searchConditions, "en")

        let card_list: ICard[] = data_ja.cardList
        let oracleIdSet = new Set();
        card_list.forEach(card => oracleIdSet.add(card.oracle_id))

        data_en.cardList.forEach(card => {
            if (!oracleIdSet.has(card.oracle_id)) {
                card_list.push(card)
            }
        });

        const result_count = data_en.resultCount || data_ja.resultCount

        card_list.sort(compareCMC)

        return {
            card_list,
            result_count
        }
    }
)

const compareCMC = (a: ICard, b: ICard) => {
    return a.cmc < b.cmc ? -1 : 1;
}

const searchModule = createSlice({
    name: "searchModule",
    initialState,
    reducers: {
        setSearchCardName: (state: IState, action: PayloadAction<string>) => {
            state.searchConditions.card_name = action.payload;
        },

        addSearchIdColor: (state: IState, action: PayloadAction<string>) => {
            state.searchConditions.id_color.push(action.payload);
        },
        deleteSearchIdColor: (state: IState, action: PayloadAction<string>) => {
            const index: number = state.searchConditions.id_color.indexOf(action.payload)
            state.searchConditions.id_color.splice(index, 1);
        },

        addSearchCardType: (state: IState, action: PayloadAction<string>) => {
            state.searchConditions.card_type.push(action.payload);
        },
        deleteSearchCardType: (state: IState, action: PayloadAction<string>) => {
            const index: number = state.searchConditions.card_type.indexOf(action.payload)
            state.searchConditions.card_type.splice(index, 1);
        },

        initFlipState: (state: IState, action: PayloadAction<number>) => {
            state.flipState = Array(action.payload).fill(false)
        },
        changeFlipState: (state: IState, action: PayloadAction<number>) => {
            state.flipState[action.payload] = !state.flipState[action.payload]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCardList.fulfilled, (state, action) => {
            state.isLoading = false

            state.cardList = action!.payload!.card_list
            state.resultCount = action!.payload!.result_count
        })

        builder.addCase(getCardList.pending, (state, action) => {
            state.isLoading = true
        })

        builder.addCase(getCardList.rejected, (state, action) => {
            state.isLoading = false
        })
    }
})

export const { actions: searchActions } = searchModule;

export default searchModule