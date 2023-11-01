const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.action('button_click', async ({ body, ack, say }) => {
  // Acknowledge the action
  console.log('button_clicked');
  await ack();
  await new Promise(resolve => setTimeout(resolve, 6000));
  console.log('waited for 6 seconds');
  await say(`<@${body.user.id}> clicked the button`);
});

app.event('app_home_opened', async ({ client, context, event, body }) => {
  let user_id = body.event ? body.event.user : body.user.id;
  console.log(`app_home_opened <=> Context is ${JSON.stringify(context)}`);
  console.log(`app_home_opened <=> Event is ${JSON.stringify(event)}`);
  console.log(`app_home_opened <=> Body is ${JSON.stringify(body)}`);
  let homeBlocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Turn your availability On/Off to be put on Queue*`
      }
    },
    {
      type: "divider"
    },
    {
      type: "actions",
      block_id: "checkbox_block",
      elements: [
        {
          type: "checkboxes",
          options: [{
            "text": {
              "type": "plain_text",
              "text": "On",
              "emoji": true
            },
            "value": "value-0"
          }],
          action_id: "user-home-checkboxes-action",
        }
      ]
    }
  ];

  await client.views.publish({
    token: context.botToken,
    user_id: user_id,
    view: homeBlocks,
  });
  console.log(`app_home_opened <=> view published end ${JSON.stringify(homeBlocks)}`);

});


// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  console.log('⚡️ Hello World', message);
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      }
    ],
    text: `Hey there <@${message.user}>!`
  });
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
