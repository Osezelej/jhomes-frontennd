import '../css/compcss/filteroption.css'
export default function FilterOption({title, content, handlePicked}){

    return<div className="filter-option-container">
        {content.map((value, index)=><div key={index} className="optionContainer" onClick={(e)=>{
                let data = e.target.innerText;
                handlePicked(data, title)
            }}>
            <p >{value}</p>
        </div>)}
    </div>
}