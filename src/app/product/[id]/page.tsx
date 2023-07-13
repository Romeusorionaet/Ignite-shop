export default function Product({ params }: { params: { id: string } }) {
    const id = params.id
    return(
        <div>
            <h1>Product: {id}</h1>

            <a href='/product/success'>ir para success</a>
        </div>
    )
}