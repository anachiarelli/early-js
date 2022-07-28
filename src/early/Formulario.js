import { useState } from "react";

function Formulario(props) {

    const [regrasDeProducao, setRegrasDeProducao] = useState(props.regrasDeProducao)

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
        <form>
            <label className="form-label text-start mt-4 h4">Símbolo inicial</label>
            <input className="form-control" placeholder="Insira o símbolo inicial (apenas um caracter)" value={props.simboloInicial} onChange={e => props.setSimboloInicial(e.target.value)}/>
            <label className="form-label text-start mt-4 h4">Regras de produção</label>
            <textarea className="form-control" placeholder="Insira as regras de produção, uma por linha" value={regrasDeProducao} onChange={handleRegrasDeProducaoChange}/>
            <p className="m-0"><a href="">Clique aqui</a> para saber como inserir sua gramática corretamente</p>
            <label className="form-label text-start mt-4 h4">Palavra a ser reconhecida</label>
            <input className="form-control" placeholder="Insira uma palavra" value={props.palavra} onChange={e => props.setPalavra(e.target.value)}/>
            <button className="btn btn-primary mt-4 mb-1" type="submit">Tudo pronto! Executar Early Parser</button>
            <p className="">Ao invés disso, <a href="">preencher os campos com uma gramática de exemplo</a></p>
        </form>
    );
}

export default Formulario;
