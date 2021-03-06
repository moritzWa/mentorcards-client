import React, { useContext, useState, useRef } from "react"
import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/react-hooks"
import moment from "moment"
import { Button, Card, Grid, Form, Image, Icon, Label } from "semantic-ui-react"

import SingleQuoteLoader from "../util/singleQuoteLoader"

import { AuthContext } from "../context/auth"

import LikeButton from "../components/LikeButton"
import DeleteButton from "../components/DeleteButton"
import ToolTipWrap from "../util/ToolTipWrap"

function SingleQuote(props) {
  const quoteId = props.match.params.quoteId
  const { user } = useContext(AuthContext)

  const commentInputRef = useRef(null)

  const [comment, setComment] = useState("")

  function deleteQuoteCallback() {
    props.history.push("/")
  }

  const { loading, data } = useQuery(FETCH_QUOTE_QUERY, {
    variables: {
      quoteId,
    },
  })

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("")
      commentInputRef.current.blur()
    },
    variables: {
      quoteId,
      body: comment,
    },
  })

  let getQuote = {}

  let quoteMarkup
  if (!getQuote || loading) {
    quoteMarkup = <SingleQuoteLoader />
  } else {
    const { getQuote } = data
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getQuote

    quoteMarkup = (
      <>
        <br></br>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                src="https://image.flaticon.com/icons/svg/747/747376.svg" //TODO add user img in schema
                size="small"
                float="right"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{body}</Card.Header>
                  <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{username}</Card.Description>
                </Card.Content>
                <hr />
                <Card.Content extra>
                  <LikeButton user={user} quote={{ id, likeCount, likes }} />
                  <ToolTipWrap content="Comment on quote">
                    <Button
                      as="div"
                      labelPosition="right"
                      onClick={() => console.log("Comment on quote")}
                    >
                      <Button basic color="green">
                        <Icon name="comments" />
                      </Button>
                      <Label basic color="green" pointing="left">
                        {commentCount}
                      </Label>
                    </Button>
                  </ToolTipWrap>

                  {user && user.username === username && (
                    <DeleteButton quoteId={id} callback={deleteQuoteCallback} />
                  )}
                </Card.Content>
              </Card>
              {user && (
                <Card fluid>
                  <Card.Content>
                    <p>Write a comment</p>
                    <Form>
                      <div className="ui action input fluid">
                        <input
                          type="text"
                          placeholder="Comment.."
                          name="comment"
                          value={comment}
                          onChange={(event) => setComment(event.target.value)}
                          ref={commentInputRef}
                        />
                        <button
                          type="submit"
                          className="ui button violet"
                          disabled={comment.trim() === ""}
                          onClick={submitComment}
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  </Card.Content>
                </Card>
              )}
              {comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.username === comment.username && (
                      <DeleteButton quoteId={id} commentId={comment.id} />
                    )}
                    <Card.Header>{comment.body}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{comment.username}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
  return quoteMarkup
}

const SUBMIT_COMMENT_MUTATION = gql`
  ## Todo: did patch here: should be ID
  mutation($quoteId: String!, $body: String!) {
    createComment(quoteId: $quoteId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`

const FETCH_QUOTE_QUERY = gql`
  query($quoteId: ID!) {
    getQuote(quoteId: $quoteId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`

export default SingleQuote
