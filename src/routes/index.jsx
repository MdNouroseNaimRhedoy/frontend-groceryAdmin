const routeNames = {
    'home': '/',
    'login': '/login',
    'products.index': '/products',
}

function route(name, params = {}) {
    let url = routeNames[name]

    for (let prop in params) {
        if (Object.prototype.hasOwnProperty.call(params, prop)) {
            url = url.replace(`:${prop}`, params[prop])
        }
    }

    return url
}

export {route}
