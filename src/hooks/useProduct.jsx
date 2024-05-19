import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {route} from '@/routes'

export function useProduct(id = null) {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const navigate = useNavigate()
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController()
            getProduct(id, {signal: controller.signal})
            return () => controller.abort()
        }
    }, [id])

    async function createProduct(product) {
        setLoading(true)
        setErrors({})

        return axios.post('products', product)
            .then(() => {
                setSuccess(true)
                setMessage('Product created successfully')
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)
                }
            })
            .finally(() => setLoading(false))
    }

    async function getProduct(id, {signal} = {}) {
        setLoading(true)

        return axios.get(`products/${id}`, {signal})
            .then(response => setData(response.data.data))
            .catch(() => {
            })
            .finally(() => setLoading(false))
    }

    async function updateProduct(e, id, product) {
        setLoading(true)
        setErrors({})

        console.log(product)

        return axios.post(`products/${id}`, product)
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)
                }
            })
            .finally(() => setLoading(false))
    }

    async function destroyProduct(product) {
        return axios.delete(`products/${product.id}`)
    }

    return {
        product: {data, setData, errors, loading, success, setSuccess, message},
        createProduct,
        updateProduct,
        destroyProduct,
        errors,
    }
}
