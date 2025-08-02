import axios from "axios";

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const getPosts = async () => {
    const res = await api.get('/posts')
    return res.status === 200 ? res.data : []
}

export const getByIDPosts = async (id) => {
    const res = await api.get(`/posts/${id}`)
    return res.status === 200 ? res.data : []
}

export const deletePost = async (id) => {
    return api.delete(`/posts/${id}`)
}

export const updataPost = async (id) => {
    return api.patch(`/posts/${id}`, { title: 'Title is Updated' })
}



