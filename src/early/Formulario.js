import { useState } from "react";

function Formulario(props) {

    const [simboloInicial, setSimboloInicial] = useState("");
    const [palavra, setPalavra] = useState("");
    const [regrasDeProducao, setRegrasDeProducao] = useState(props.regrasDeProducao);
    const [erroSimboloInicial, setErroSimboloInicial] = useState("");
    const [erroPalavra, setErroPalavra] = useState("");
    const [erroRegrasDeProducao, setErroRegraDeProducao] = useState("");

    const handleExemploClique = e => {
        const textoRegrasDeProducao =
            "E->T\n" +
            "E->E+T\n" +
            "T->F\n" +
            "T->T*F\n" +
            "F->(E)\n" +
            "F->x";

        handleSimboloInicialChange('E');
        handleRegrasDeProducaoChange(textoRegrasDeProducao);
        handlePalavraChange("x*x");
    }

    const handleSimboloInicialChange = simbolo => {
        if (simbolo.length !== 1) {
            setErroSimboloInicial("O símbolo inicial deve conter exatamente um caracter");
        } else {
            setErroSimboloInicial(null);
            props.setSimboloInicial(simbolo);
        }
        setSimboloInicial(simbolo);
    }

    const handlePalavraChange = palavra => {
        if (palavra.length < 1) {
            setErroPalavra("A palavra não pode ser vazia");
        } else {
            setErroPalavra(null);
            props.setPalavra(palavra);
        }
        setPalavra(palavra);
    }

    const handleRegrasDeProducaoChange = texto => {
        const linhasErradas = [];
        setRegrasDeProducao(texto);
        const linhas = texto.split('\n').map(linha => linha.replaceAll(' ', ''));
        for (let i = 0; i < linhas.length; i++) {
            if (linhas[i] !== '' && linhas[i][1] != '-' && linhas[i][2] != '>') {
                linhasErradas.push(i+1);
            }
        }
        if (linhasErradas.length > 0) {
            setErroRegraDeProducao(`As linhas ${linhasErradas.join(", ")} contém erros. Use o formato S->aA`);
        } else {
            props.setRegrasDeProducao(texto);
            setErroRegraDeProducao("");
        }
    }

    const handleBotaoClique = () => {
        handleSimboloInicialChange(simboloInicial);
        handlePalavraChange(palavra);
        handleRegrasDeProducaoChange(regrasDeProducao);

        if (erroSimboloInicial || erroRegrasDeProducao || erroPalavra) {
            return;
        }

        props.executarAlgoritmo();
    }

    console.log(erroSimboloInicial);
    return (
        <div>
            <p>
                <button type="button" className="btn btn-link p-0" onClick={handleExemploClique}>Preencher os campos com um exemplo</button>
            </p>
            <label className="form-label text-start h4">Símbolo inicial</label>
            <input className="form-control" placeholder="Insira o símbolo inicial (apenas um caracter)" value={simboloInicial} onChange={e => handleSimboloInicialChange(e.target.value)}/>
            {erroSimboloInicial !== "" ? <div className="text-danger">{erroSimboloInicial}</div> : ""}
            <label className="form-label text-start mt-4 h4">Regras de produção</label>
            <textarea className="form-control" placeholder="Insira as regras de produção, uma por linha" value={regrasDeProducao} onChange={e => handleRegrasDeProducaoChange(e.target.value)}/>
            {erroRegrasDeProducao !== "" ? <div className="text-danger">{erroRegrasDeProducao}</div> : ""}
            <label className="form-label text-start mt-4 h4">Palavra a ser reconhecida</label>
            <input className="form-control" placeholder="Insira uma palavra" value={palavra} onChange={e=>handlePalavraChange(e.target.value)}/>
            {erroPalavra !== "" ? <div className="text-danger">{erroPalavra}</div> : ""}
            <button className="btn btn-primary mt-4 mb-1" type="button" onClick={handleBotaoClique}>Tudo pronto! Executar Early Parser</button>
        </div>
    );
}

export default Formulario;
