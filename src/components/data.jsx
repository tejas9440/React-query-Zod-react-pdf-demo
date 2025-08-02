import { keepPreviousData, QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { deletePost, getPosts, updataPost } from '../API/api'
import { NavLink } from 'react-router-dom'

export default function ReactQueryData() {
    const queryClient = useQueryClient()

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['getPost'],
        queryFn: getPosts,
        placeholderData: keepPreviousData
    })

    const deleteMutation = useMutation({
        mutationFn: (id) => deletePost(id),
        onSuccess: (data, id) => {
            queryClient.setQueryData(['getPost'], (elm) => {
                return elm?.filter((post) => post.id !== id)
            })
        }
    })

    const updateMutation = useMutation({
        mutationFn: (id) => updataPost(id),
        onSuccess: (apiData, id) => {
            // console.log(apiData, id);

            queryClient.setQueryData(['getPost'], (elm) => {
                return elm?.map((post) => {
                    console.log(post);

                    return post.id === id ? { ...post, title: apiData.data.title } : post
                })
            })
        }
    })

    if (isPending) return <div>Loding.....</div>
    if (isError) return <div>{error.message}</div>


    return (
        <div>
            <ul>
                {data?.map((elm) => {
                    const { id, title, body } = elm
                    return (
                        <>
                            <NavLink to={`/rq/${id}`}>
                                <li key={id}>
                                    <p>{id}</p>
                                    <p>{title}</p>
                                    <p>{body}</p>
                                </li>
                            </NavLink>
                            <button
                                style={{
                                    backgroundColor: '#e53935', // red
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 16px',
                                    margin: '8px 8px 8px 0',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }} className='btn-delete' onClick={() => deleteMutation.mutate(id)}>Delete</button>
                            <button style={{
                                backgroundColor: '#1e88e5', // blue
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                margin: '8px 0',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }} className='btn-update' onClick={() => updateMutation.mutate(id)}>Update</button>
                        </>
                    )
                })}
            </ul>
        </div>
    )
}
