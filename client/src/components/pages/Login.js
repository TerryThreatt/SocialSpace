import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../../utils/hooks";

function Login(props) {
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCB, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      props.history.push("/");
    },
    onError(err) {
      console.log(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.exception.errors
          : {}
      );
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.exception.errors
          : {}
      );
    },
    variables: values,
  });

  function loginUserCB() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form
        onSubmit={onSubmit}
        noValidate
        className={loading ? "loading" : null}
      >
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          type="text"
          name="username"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Register Mutation
const LOGIN_USER = gql`
  mutation login($usename: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      token
      username
      createdAt
    }
  }
`;

export default Login;
