function transformarRegrasDeProducaoEmRepresentacaoVisual(regrasDeProducao) {
    const regras = [];
    for (let ladoEsquerdo in regrasDeProducao) {
        for (let ladoDireito of regrasDeProducao[ladoEsquerdo]) {
            regras.push((<div key={`${ladoEsquerdo}->${ladoDireito}`}>&nbsp;&nbsp;&nbsp;&nbsp;'{ladoEsquerdo}' -&gt; '{ladoDireito}'</div>));
        }
    }
    return regras;
}

function Gramatica(props) {
    return(
        <div>
            <h2 className="my-3 pb-3 border-bottom h3">Gramática</h2>
            <p>G = ( V, T, P, S ), onde:</p>
            <p>V = {"{"} {Array.from(props.variaveis).map(v => `'${v}'`).join(', ')} {"}"} </p>
            <p>T = {"{"} {Array.from(props.terminais).map(t => `'${t}'`).join(', ')} {"}"}</p>
            <p>P = {"{"} {transformarRegrasDeProducaoEmRepresentacaoVisual(props.regrasDeProducao)} {"}"}</p>
            <p>S = {props.simboloInicial}</p>
        </div>
    );
}

export default Gramatica;
