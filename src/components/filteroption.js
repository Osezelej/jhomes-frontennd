import '../css/compcss/filteroption.css'
export default function FilterOption({content, handlePicked}){

    return<div className="filter-option-container">
        {content.map((value, index)=><div key={index} className="optionContainer" onClick={(e)=>{
                let data = e.target.innerText;
                handlePicked(data)
            }}>
            <p >{value}</p>
        </div>)}
    </div>
}