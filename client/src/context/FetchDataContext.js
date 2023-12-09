import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/apiHelper";

const FetchDataContext = createContext();

export const FetchDataProvider = (props) => {
    const [isFetched, setIsFetched] = useState(false);
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const fetchData = async (path) => {
        try {
            const response = await api(path, "GET", null, null)
            if (response) {
                setIsFetched(true);
                if (response.status === 200) {
                    const data = await response.json();
                    setData(data);
                } else if (response.status === 404) {
                    console.log('Course was not found');
                    navigate('/notfound')
                } else if (response.status === 500){
                    navigate('/error', { replace: true });
                }
            }
            else {
                setIsFetched(false);
                throw new Error();
            }
        } catch (error) {
            setIsFetched(false);
            console.log(error);
            navigate('/error', { replace: true });
        }
    }

    return (
        <FetchDataContext.Provider value={{
            isFetched,
            data,
            actions: {
                fetchData
            }
        }}>
            {props.children}
        </FetchDataContext.Provider>
    )
}

export default FetchDataContext;