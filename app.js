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
  await say(`<@${body.user.id}> clicked the button`);
});

app.action('available_pxms', async ({ body, ack, client }) => {
  // Acknowledge the action
  console.log('available_pxms');
  await ack();
  let pxmBlocks = {
    "type": "modal",
    "title": {
      "type": "plain_text",
      "text": "PXMs",
      "emoji": true
    },
    "blocks": [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": "Velmurugan Velayutham",
          "emoji": true
        }
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*Available:*\nYes"
          },
          {
            "type": "mrkdwn",
            "text": "*Allotted:*\nYes"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*Avl.Duration:*\n 60 Minutes"
          },
          {
            "type": "mrkdwn",
            "text": "*Allotted Channels:*\nc2c-67676\nc2c-76786\nc2c-76786\nc2c-76786\nc2c-76786\nc2c-76786\nc2c-76786"
          }
        ]
      }
    ]
  };
  await client.views.open({
    trigger_id: body.trigger_id,
    view: pxmBlocks,
  });
});

app.event('app_home_opened', async ({ client, context, event, body }) => {
  let user_id = body.event ? body.event.user : body.user.id;
  console.log(`app_home_opened <=> Context is ${JSON.stringify(context)}`);
  console.log(`app_home_opened <=> Event is ${JSON.stringify(event)}`);
  console.log(`app_home_opened <=> Body is ${JSON.stringify(body)}`);
  let homeBlocks =
  {
    type: "home",
    blocks: [
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
                "text": "ON/OFF",
                "emoji": true
              },
              "value": "ON"
            }],
            initial_options: [{
              "text": {
                "type": "plain_text",
                "text": "ON/OFF",
                "emoji": true
              },
              "value": "ON"
            }],
            action_id: "user-home-checkboxes-action",
          }
        ]
      },
      {
        type: "divider"
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Available_PXMs",
              emoji: true,
            },
            value: "available_pxms",
            action_id: "available_pxms",
          },
        ],
      },
    ]
  };

  await client.views.publish({
    user_id: event.user,
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
