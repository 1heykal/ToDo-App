const filters = {
    searchText: '',
    checked: false
}

const getFilters = () => filters

const setFilters = ({searchText, checked}) => {
    if(typeof searchText === 'string')
    {
        filters.searchText = searchText
    }
    
    if(typeof checked === 'boolean')
    {
        filters.checked = checked
    }
}


export {getFilters, setFilters}


