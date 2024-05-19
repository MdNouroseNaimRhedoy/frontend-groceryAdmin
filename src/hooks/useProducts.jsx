import {useState, useEffect} from 'react'

export function useProducts() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const controller = new AbortController()
        getProducts({signal: controller.signal})
        return () => {
            controller.abort()
        }
    }, [])

    async function getProducts({signal} = {}) {
        return axios.get('products', {signal})
            .then(response => setProducts(response.data.data))
            .catch(() => {
            })
    }

    return {products, getProducts}
}
