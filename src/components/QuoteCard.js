import React, { useContext } from "react"
import { Button, Card, Icon, Label, Image, Header } from "semantic-ui-react"
import { Link } from "react-router-dom"
import moment from "moment"

import { AuthContext } from "../context/auth"
import LikeButton from "./LikeButton"
import DeleteButton from "./DeleteButton"
import ToolTipWrap from "../util/ToolTipWrap"

function QuoteCard({
  quote: {
    body,
    createdAt,
    id,
    username,
    likeCount,
    comments,
    commentCount,
    likes,
  },
}) {
  const { user } = useContext(AuthContext)

  return (
    <Card fluid>
      <Card.Content>
        <Image
          as={Link}
          to={`/quotes/${id}`} //link to author
          wrapped
          src="https://www.skmurphy.com/wp-content/uploads/2017/11/kkNavalRavikant110222-e1530507117593.jpg"
        />
        <Header as={Link} to={`/quotes/${id}`} className="quote-text">
          <b>“</b>
          {body}
          <b>”</b>
        </Header>
      </Card.Content>
      <Card.Content extra>
        <Card.Description>
          added by<Link to={`/users/${username}`}>{username}</Link> {" - "}{" "}
          {moment(createdAt).fromNow(true)}
        </Card.Description>
        <LikeButton user={user} quote={{ id, likes, likeCount }} />
        {/*         //todo into its own component
         */}{" "}
        <ToolTipWrap content="Comment on quote">
          <Button labelPosition="right" as={Link} to={`/quotes/${id}`}>
            {comments.find((comment) => comment.username === user.username) ? (
              <Button color="green">
                <Icon name="comments" />
              </Button>
            ) : (
              <Button color="green" basic>
                <Icon name="comments" />
              </Button>
            )}

            <Label basic color="green" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </ToolTipWrap>
        {user && user.username === username && <DeleteButton quoteId={id} />}
      </Card.Content>
    </Card>
  )
}

export default QuoteCard
