function reconhecerPalavra(palavra, V, T, P, S) {
    const n = palavra.length;
    const dominios = [];
    dominios.push(construirD0(V, T, P, S));
    for (let i = 0; i < n; i++) {
        dominios.push(construirDr(V, T, P, S, dominios, palavra[i]));
    }

    for (let producao of dominios[n]['']) {
        if (producao[0] === S && producao[3] === 0) {
            return true;
        }
    }
    
    return false;
}

// a) Construção do primeiro conjunto de produções
function construirD0(V, T, P, S) {
    const d0 = {};

    // 1
    for (let ladoDireito in P[S]) {
        const simboloDepoisDoPonto = ladoDireito === '' ? '' : ladoDireito[0];
        if (!d0[simboloDepoisDoPonto]) {
            d0[simboloDepoisDoPonto] = new Set();
        }
        d0[simboloDepoisDoPonto].add([S, ladoDireito, 0, 0]);
    }

    // 2
    do {
        let inclusoes = 0;
        for (let v of V) {
            if (!d0[v]) {
                continue
            }
            for (let ladoDireito in P[v]) {
                const simboloDepoisDoPonto = ladoDireito === '' ? '' : ladoDireito[0];
                if (!d0[simboloDepoisDoPonto]) {
                    d0[simboloDepoisDoPonto] = new Set();
                }
                const regraDeDominio = [v, ladoDireito, 0, 0];
                if (!d0[simboloDepoisDoPonto].has(regraDeDominio)) {
                    d0[simboloDepoisDoPonto].add(regraDeDominio);
                    inclusoes++;
                }
            }
        }
    } while(inclusoes);

    return d0;
}

// b) Construção dos demais conjuntos de produções
function construirDr(V, T, P, S, dominios, simbolo) {
    const dr = {};
    r = dominios.length;

    for (let regraDeDominio of dominios[r-1][simbolo]) {
        const [esquerda, direita, posicaoDoPonto, dominioDeOrigem] = regraDeDominio;
        const novaPosicaoDoPonto = posicaoDoPonto + 1;
        const simboloDepoisDoPonto = direita.length <= novaPosicaoDoPonto ? '' : direita[novaPosicaoDoPonto];
        if (!dr[simboloDepoisDoPonto]) {
            dr[simboloDepoisDoPonto] = new Set();
        }
        dr[simboloDepoisDoPonto].add([esquerda, direita, novaPosicaoDoPonto, dominioDeOrigem]);
    }

    do {
        let inclusoes = 0;

        // 3
        for (let v of V) {
            if (!dr[v]) {
                continue;
            }
            for (let ladoDireito of P[v]) {
                const simboloDepoisDoPonto = ladoDireito == '' ? '' : ladoDireito[0];
                if (!dr[simboloDepoisDoPonto]) {
                    dr[simboloDepoisDoPonto] = new Set();
                }
                const novaRegra = [v, ladoDireito, 0, r];
                if (!dr[simboloDepoisDoPonto].has(novaRegra)) {
                    dr[simboloDepoisDoPonto].add(novaRegra);
                    inclusoes++;
                }
            }
        }

        // 4
        const regrasTerminandoEmPontoBarra = structuredClone(dr['']);
        for (let regrasDeDominio of regrasTerminandoEmPontoBarra) {
            const [esquerda, , , dominioDeOrigem] = regraDeDominio;
            if (!dominios[dominioDeOrigem].has(esquerda)) {
                continue;
            }
            const regrasNoDominioDeOrigem = structuredClone(dominios[dominioDeOrigem][esquerda]);
            for (let regra in regrasNoDominioDeOrigem) {
                const novaRegra = [regra[0], regra[1], regra[2] + 1, regra[3]];
                const [, ladoDireito, posicaoDoPonto, ] = novaRegra;
                const simboloDepoisDoPonto = ladoDireito.length <= posicaoDoPonto ? '' : ladoDireito[posicaoDoPonto];
                if (!dr[simboloDepoisDoPonto]) {
                    dr[simboloDepoisDoPonto] = new Set();
                }
                if (!dr[simboloDepoisDoPonto].has(novaRegra)) {
                    dr[simboloDepoisDoPonto].add(novaRegra);
                    inclusoes++;
                }
            }    
        }

    } while(inclusoes);

    return dr;
}
