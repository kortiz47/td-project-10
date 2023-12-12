import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/apiHelper";

const FetchDataContext = createContext();

export const FetchDataProvider = (props) => {
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const fetchData = async (path) => {
        try {
            const response = await api(path, "GET", null, null)
            if (response) {
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
                throw new Error();
            }
        } catch (error) {
            console.log(error);
            navigate('/error', { replace: true });
        }
    }

    return (
        <FetchDataContext.Provider value={{
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