import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

import { Button, Label, Icon } from "semantic-ui-react"
import ToolTipWrap from "../util/ToolTipWrap"

function LikeButton({ user, quote: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true)
    } else setLiked(false)
  }, [user, likes])

  const [likeQuote] = useMutation(LIKE_QUOTE_MUTATION, {
    variables: { quoteId: id },
  })

  const likeButton = user ? (
    liked ? (
      <Button color="violet">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="violet" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="violet" basic>
      <Icon name="heart" />
    </Button>
  )

  return (
    <Button as="div" labelPosition="right" onClick={likeQuote}>
      <ToolTipWrap content={liked ? "Unlike" : "Like"}>
        {likeButton}
      </ToolTipWrap>
      <Label basic color="violet" pointing="left">
        {likeCount}
      </Label>
    </Button>
  )
}

const LIKE_QUOTE_MUTATION = gql`
  mutation likeQuote($quoteId: ID!) {
    likeQuote(quoteId: $quoteId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`

export default LikeButton
