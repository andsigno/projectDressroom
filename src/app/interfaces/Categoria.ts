export interface Item {
    id: string;
    nome: string;
    img: string;
    prezzo: number;
    descrizione: string
}

export interface Categoria {
    nome: string;
    hasSubCategories: boolean;
    sottocategorie: Array<Sottocategoria>;
    items?: Array<Item>
}

export interface Sottocategoria {
    nome: string;
    hasSubCategories: boolean;
    prodotti: Array<Prodotto>;
    items?: Array<Item>
}

export interface Prodotto {
    nome: string;
    items: Array<Item>;
}
