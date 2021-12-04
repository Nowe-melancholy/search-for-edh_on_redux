import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../modules";

const ResultCount: React.FC = () => {
    const dispatch = useDispatch();
    const searchState = useSelector((state: IRootState) => state.search);

    const loadingState = searchState.isLoading

    return (
        <div>
            {loadingState ? <div>検索中...</div> : <div>検索結果：{searchState.resultCount}件</div>}
        </div>
    )
}

export default ResultCount;