import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import axios from 'axios'
import App from '@/App'
import Home from '@/views/Home'
import Login from '@/views/auth/Login'
import ProductList from '@/views/products/ProductList.jsx'
import '@/assets/main.css'
import {route} from '@/routes'

window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.withCredentials = true
window.axios.defaults.baseURL = 'http://localhost:8000/api/'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path={route('home')} element={<App/>}>
                    <Route index element={<Home/>}/>
                    <Route path={route('login')} element={<Login/>}/>
                    <Route path={route('products.index')} element={<ProductList/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
