import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";


 

const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState(null);


    const loadOptions = (inputValue) =>{
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
        .then(response => response.json())
        .then(response => {
            return {
                options: response.data.map((city) =>{
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}` 
                    }
                })
            }
        })
        .catch(err => console.error(err));
    }

    const handleChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
        
    }


    return(
        <div>
            <AsyncPaginate
                placeholder ="search cities"
                debounceTimeout={600}
                value={search}
                onChange = {handleChange}
                loadOptions = {loadOptions}
            />
        </div>
    )
}



export default Search;