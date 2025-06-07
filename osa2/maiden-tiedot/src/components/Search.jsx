const Search = ({onChange}) => {
    return (
        <>
            Find countries: <input onChange={onChange} type="text" />
        </>
    )
}

export default Search