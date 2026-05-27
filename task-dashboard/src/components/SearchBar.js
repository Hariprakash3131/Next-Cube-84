export default function SearchBar({
    search,
    setSearch
}){
    return(
        <div className="mt-6">
            <input 
            type="text"
            placeholder="Search Task..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
             className="border p-2 rounded w-full"
            />
            
        </div>
    )
}