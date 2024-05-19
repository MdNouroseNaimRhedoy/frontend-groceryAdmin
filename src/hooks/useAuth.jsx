import {useState, useMemo, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useLocalStorage} from 'react-use-storage'
import {route} from '@/routes'

export function useAuth() {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage('access_token', '')

    const navigate = useNavigate()

    const isLoggedIn = useMemo(() => !!accessToken, [accessToken])

    useEffect(() => {
        if (accessToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        }
    }, [accessToken])

    async function login(data) {
        setErrors({})
        setLoading(true)

        return axios.post('login', data)
            .then(response => {
                setAccessToken(response.data.access_token)
                navigate(route('products.index'))
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)
                }
            })
            .finally(() => setLoading(false))
    }

    async function logout(force = false) {
        if (!force) {
            await axios.post('logout')
        }

        removeAccessToken()
        navigate(route('login'))
    }

    return {login, errors, loading, isLoggedIn, logout}
}
