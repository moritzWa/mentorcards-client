import React, { useContext } from "react"
import { Button, Card, Icon, Label, Image } from "semantic-ui-react"
import { Link } from "react-router-dom"
import moment from "moment"

import { AuthContext } from "../context/auth"
import LikeButton from "./LikeButton"

function QuoteCard({
  quote: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext)

  return (
    <Card fluid>
      <Card.Content>
        <Image
          wrapped
          src="https://www.skmurphy.com/wp-content/uploads/2017/11/kkNavalRavikant110222-e1530507117593.jpg"
        />
        <p className="quote-text">
          <b>“</b>
          {body}
          <b>”</b>
        </p>
        <div
          style={{ display: "flex", alignContent: "center", height: "23px" }}
        >
          <h5>added by {username}</h5>
          <Card.Meta as={Link} to={`/quotes/${id}`}>
            {moment(createdAt).fromNow(true)}
          </Card.Meta>
        </div>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} quote={{ id, likes, likeCount }} />
        <Button labelPosition="right" as={Link} to={`/quote/${id}`}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button
            as="div"
            color="red"
            floated="right"
            onClick={() => console.log("Delete quote")}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  )
}

export default QuoteCard
