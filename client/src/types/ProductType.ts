export type Product = {
    map(arg0: (item: any, index: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode
    json(): unknown
    _id: string
    name: string
    slug: string
    category: string
    detail: string
    image: string
    rating: number
    age: number
    price: number
}
