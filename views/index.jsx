const React = require('react')

const Default = require('./layout/Default')

function Index({ breads }) {
    return (
        //default call acts as entry for html.children in default file
        <Default>
            <h2>Index page</h2>
            <ul>
                {
                    breads.map((bread, index) => {
                        return (<li key={index}><a href={`/breads/${index}`}>{bread.name}</a></li>)
                    })
                }
            </ul>
            <div className="newButton">
                <a href="/breads/new"><button>Add a new bread</button></a>
            </div>
        </Default>
    )
}

module.exports = Index;