export type Review = {
    author: string,
    title: string,
    review: string,
    original_title: string,
    original_review: string,
    stars: string,
    iso: string,
    version: string,
    date: string,
    deleted: boolean,
    has_resonse: boolean,
    product: number,
    product_id: number,
    product_name: string,
    vendor_id: string,
    store: string,
    weight: number,
    id: string,
    predicted_langs: string[]
}

export type OptionType = {
    value: string, 
    label: string
}