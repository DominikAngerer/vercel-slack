# Vercel Slack Endpoint

Introduces new API endpoint `/api/slack` to allow Slack Notifications through a POST Request to a channel in Slack.

## Possible Message Types

This endpoint requires a `type` GET parameter with one of the following values:

| type | description |
|---|---|
| `message` | Used to send a message into a channel and notify a user "userid" |

## Example Request

Each key in the request body will result in one new line in the slack message allowing us to send a formatted text. Different types will notify different people in our Slack channel. We can choose to use different channels by configuring different endpoints in our code using the "Incoming Webhook" settings of Slack.

```bash
curl "https://{vercel-domain}/api/slack?type=message" \
-X POST \
-H "Content-Type: application/json" \
-d "{\"a\":\"This is a text\",\"b\":\"More text\"}"

// results in a Slack message like:
NEW MESSAGE: <@userid>
a: this is a text
b: More text
``` 
