import { ICard, ISearchConditions } from "../modules/searchModule"

const URI = 'https://api.scryfall.com/cards/search?order=cmc&q='

const GetCardList = async (searchConditions: ISearchConditions, lang: string) => {
    let cardList: ICard[] = [];
    let resultCount = 0;

    const search_URI = CreateURI(searchConditions);

    if (search_URI === URI) {
        return {
            "resultCount": resultCount,
            "cardList": cardList,
        }
    }

    const res = await fetch(search_URI + '+lang:' + lang)

    if (res.status === 200) {
        let json = await res.json();
        resultCount = json.total_cards

        cardList = await json.data.map((item: any) => {
            switch (item.layout) {
                case "normal":
                    return {
                        layout: "normal",
                        oracle_id: item.oracle_id,
                        idColor: item.color_identity,
                        cmc: item.cmc,
                        cardFaces: [{
                            name: item.printed_name,
                            name_en: item.name,
                            mana_cost: item.mana_cost,
                            color: item.colors,
                            text: item.printed_text,
                            textEN: item.oracle_text,
                            image: item.image_uris?.small
                        },
                        {}]
                    };

                case "saga":
                    return {
                        layout: "saga",
                        oracle_id: item.oracle_id,
                        idColor: item.color_identity,
                        cmc: item.cmc,
                        cardFaces: [{
                            name: item.printed_name,
                            name_en: item.name,
                            mana_cost: item.mana_cost,
                            color: item.colors,
                            text: item.printed_text,
                            textEN: item.oracle_text,
                            image: item.image_uris?.small
                        },
                        {}]
                    };

                case "split":
                    return {
                        layout: "split",
                        oracle_id: item.oracle_id,
                        idColor: item.color_identity,
                        cmc: item.cmc,
                        cardFaces: [{
                            name: item.card_faces[0].printed_name,
                            name_en: item.card_faces[0].name,
                            mana_cost: item.card_faces[0].mana_cost,
                            color: item.card_faces[0].colors,
                            text: item.card_faces[0].printed_text,
                            textEN: item.card_faces[0].oracle_text,
                            image: item.image_uris?.small
                        },
                        {
                            name: item.card_faces[1].printed_name,
                            name_en: item.card_faces[1].name,
                            mana_cost: item.card_faces[1].mana_cost,
                            color: item.card_faces[1].colors,
                            text: item.card_faces[1].printed_text,
                            textEN: item.card_faces[1].oracle_text,
                            image: item.image_uris?.small
                        }]
                    };

                default:
                    return {
                        layout: "double",
                        oracle_id: item.oracle_id,
                        idColor: item.color_identity,
                        cmc: item.cmc,
                        cardFaces: [{
                            name: item.card_faces[0].printed_name,
                            name_en: item.card_faces[0].name,
                            mana_cost: item.card_faces[0].mana_cost,
                            color: item.card_faces[0].colors,
                            text: item.card_faces[0].printed_text,
                            textEN: item.card_faces[0].oracle_text,
                            image: item.card_faces[0].image_uris?.small
                        },
                        {
                            name: item.card_faces[1].printed_name,
                            name_en: item.card_faces[1].name,
                            mana_cost: item.card_faces[1].mana_cost,
                            color: item.card_faces[1].colors,
                            text: item.card_faces[1].printed_text,
                            textEN: item.card_faces[1].oracle_text,
                            image: item.card_faces[1].image_uris?.small
                        }]
                    }

            }
        });

        return {
            "resultCount": resultCount,
            "cardList": cardList,
        }

    } else {
        return {
            "resultCount": resultCount,
            "cardList": cardList,
        }
    }
}

const CreateURI = (searchConditions: ISearchConditions) => {
    let search_URI = URI;

    if (searchConditions.card_name !== "") {
        search_URI += ('+name:' + searchConditions?.card_name);
    }

    if (searchConditions.card_type.length !== 0) {
        searchConditions.card_type.forEach((cardType: string) => { search_URI += (' t:' + cardType); });
    }

    if (searchConditions.id_color.length !== 0) {
        search_URI += '+id>='
        searchConditions.id_color.forEach(idColor => search_URI += idColor)
    }

    if (searchConditions.color.length !== 0) {
        search_URI += '+c>='
        searchConditions.color.forEach(color => search_URI += color)
    }

    return search_URI
}




export default GetCardList;