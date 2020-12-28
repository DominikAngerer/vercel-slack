import axios from 'axios'

module.exports = async (req, res) => {

    // allow OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    // allow GET on debug but not on production
    if (req.method === 'GET' && typeof req.query.debug === 'undefined') {
        return res.status(404).end()
    }

    // Build message out of body to allow custom messages besides type.
    const buildMessage = () => {
        let body = req.body || {}
        let message = ''
        Object.keys(body).forEach(key => {
            message += `\n${key}: ${body[key]}` 
        })
        return message
    }

    // Init slack client using a "Incoming Webhook" App for one workspace
    // Using this we can send POST requests and messages to a channel of our choice
    const slack = axios.create({
        baseURL: 'https://hooks.slack.com/services/YOUR_ENDPOINT_URL'
    })

    let slackResponse
    switch (req.query.type) {
        case 'message':
            slackResponse = await slack.post('', {
                "text": `NEW MESSAGE: <@userid>
                ${buildMessage()}`
            })
        break

        default:
            // no type defined, therefore we return 403
            res.status(403)
            
            res.json({
                message: 'slack_response_error'
            }).end()
        break
    }

    // enable debug information
    if(req.query.debug) {
        console.log('Slack Response', slackResponse.data)
    }

    res.json({
        type: req.query.type,
        message: 'slack_response_success'
    })
}