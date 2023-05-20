type CreateRouteContext<T> = {
    router: import('express').Router,
    model: import('mongoose').Model<T>
}
