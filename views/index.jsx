const React = require('react')

const Default = require('./layout/Default')

function Index({breads}) {
    return(
        //default call acts as entry for html.children in default file
        <Default>
            <h2>Index page</h2>
            <ul>
                {
                    breads.map((bread, index) => {
                        return (<li key={index}>{bread.name}</li>)
                    })
                }
            </ul>
        </Default>
    )
}

module.exports = Index;