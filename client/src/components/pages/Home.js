import React from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

function Home() {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY)

    if(data) {
        console.log(data)
    }
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
        id body createdAt username likeCount
        likes{
            username
        }
        commentCount
        comments{
            id username createdAt body
        }
        }
    }
`

export default Home
