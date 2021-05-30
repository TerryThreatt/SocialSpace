import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

function Register() {
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result){
            console.log(result)
        },
        onError(err){
            setErrors(err && err.graphQLErrors[0] ? err.graphQLErrors[0].extensions.exception.errors : {})
        },
        variables: values
    })

    const onSubmit = (e) => {
        e.preventDefault()
        addUser()
    }


    return (
        <div  className="form-container">
            <Form onSubmit={onSubmit} noValidate className={ loading ? "loading" : null}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Input
                    label="Email"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={onChange}
                />
                <Form.Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange}
                />
                <Button type="submit" primary>Register</Button>
            </Form>
        </div>
    )
}

// Register Mutation
const REGISTER_USER = gql`
    mutation register(
        $usename: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                password: $password
                confirmPassword: $confirmPassword
                email: $email
            }
        )
        {
            id email token username createdAt
        }
    }
`

export default Register
