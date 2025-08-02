import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { getByIDPosts } from '../API/api';

export default function Detailpage() {
    const { id } = useParams();
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['Get By Id Post'],
        queryFn: () => getByIDPosts(id)
    })
    if (isPending) return <div>Loding.....</div>
    if (isError) return <div>{error.message}</div>


    return (
        <>
            <div>
                DataID: {data.id}
            </div>
            <br />
            <div>
                DataTitle: {data.title}
            </div>
            <br />
            <div>
                DataBody: {data.body}
            </div>
            <br />

            <NavLink to={'/rq'}><button>Go Back</button></NavLink>
        </>
    )

}
