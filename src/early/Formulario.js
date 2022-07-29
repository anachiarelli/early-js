import { useState } from "react";

function Formulario(props) {

    const [regrasDeProducao, setRegrasDeProducao] = useState(props.regrasDeProducao);

    const handleExemploClique = e => {
        props.setRegrasDeProducao(
            "E->T\n" +
            "E->E+T\n" +
            "T->F\n" +
            "T->T*F\n" +
            "F->(E)\n" +
            "F->x"
        );

        props.setSimboloInicial('E');
        props.setPalavra("x*x");
    }

    const handleRegrasDeProducaoChange = e => {
        const texto = e.target.value;
        setRegrasDeProducao(texto);
        const linhas = texto.split('\n').map(linha => linha.replaceAll(' ', ''));
        for (let linha of linhas) {
            if (linha !== '' && linha[1] != '-' && linha[2] != '>') {
                return;
            }
        }
        props.setRegrasDeProducao(texto);
    }

    return (
        <div>
            <label className="form-label text-start mt-4 h4">Símbolo inicial</label>
            <input className="form-control" placeholder="Insira o símbolo inicial (apenas um caracter)" value={props.simboloInicial} onChange={e => props.setSimboloInicial(e.target.value)}/>
            <label className="form-label text-start mt-4 h4">Regras de produção</label>
            <textarea className="form-control" placeholder="Insira as regras de produção, uma por linha" value={props.regrasDeProducao} onChange={handleRegrasDeProducaoChange}/>
            <p className="m-0"><a href="">Clique aqui</a> para saber como inserir sua gramática corretamente</p>
            <label className="form-label text-start mt-4 h4">Palavra a ser reconhecida</label>
            <input className="form-control" placeholder="Insira uma palavra" value={props.palavra} onChange={e => props.setPalavra(e.target.value)}/>
            <button className="btn btn-primary mt-4 mb-1" type="button" onClick={props.executarAlgoritmo}>Tudo pronto! Executar Early Parser</button>
            <p className="">Ao invés disso, <button type="button" className="btn btn-link" onClick={handleExemploClique}>preencher os campos com uma gramática de exemplo</button></p>
        </div>
    );
}

export default Formulario;
