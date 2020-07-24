import React from "react"
import { Button, Form, TextArea } from "semantic-ui-react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

import { useForm } from "../util/hooks"
import { FETCH_QUOTES_QUERY } from "../util/graphql"

function QuoteForm() {
  const { values, onChange, onSubmit } = useForm(createQuoteCallback, {
    body: "",
    mentorRefId: "",
  })

  //only one type of error
  const [createQuote, { error }] = useMutation(CREATE_QUOTE_MUTATION, {
    variables: values,
    update(proxy, result) {
      //data = storage of responses /local cache state
      const data = proxy.readQuery({
        query: FETCH_QUOTES_QUERY,
      })
      console.log(data)
      const newQuote = result.data.createQuote

      proxy.writeQuery({
        query: FETCH_QUOTES_QUERY,
        //pushing newQuote (of createQuote-mutation ) into cache
        data: { getQuotes: [newQuote, ...data.getQuotes] },
      })
      values.body = ""
      values.mentorRefId = null
    },
    onError(err) {
      console.log(err.value)
    },
  })

  function createQuoteCallback() {
    createQuote()
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a quote:</h2>
        <Form.Field></Form.Field>
        <Form.Field>
          <TextArea
            rows={3}
            placeholder="Quote ex: One way to remember who..."
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Form.Input
            placeholder="Mentor Name ex: Albert Einstein"
            name="mentorRefId"
            onChange={onChange}
            value={values.mentorRefId}
            error={error ? true : false}
          />
          <Button type="submit" color="violet">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  )
}

const CREATE_QUOTE_MUTATION = gql`
  mutation createQuote($body: String!, $mentorRefId: ID!) {
    createQuote(body: $body, mentorRefId: $mentorRefId) {
      id
      body
      mentorRefId
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`

export default QuoteForm
