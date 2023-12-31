const { App } = require('@slack/bolt');
const blocks = require('./blocks');
const services = require('./parsePXMQueues');
// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// The open_modal shortcut opens a plain old modal
app.shortcut('trigger_workflow', async ({ shortcut, ack, client, logger }) => {
  logger.info(`shortcut: ${JSON.stringify(shortcut)}`);
  try {
    // Acknowledge shortcut request
    await ack();

    // Call the views.open method using one of the built-in WebClients
    const result = await client.views.open({
      trigger_id: shortcut.trigger_id,
      view: {
        type: "modal",
        title: {
          type: "plain_text",
          text: "My App"
        },
        close: {
          type: "plain_text",
          text: "Close"
        },
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "About the simplest modal you could conceive of :smile:\n\nMaybe <https://api.slack.com/reference/block-kit/interactive-components|*make the modal interactive*> or <https://api.slack.com/surfaces/modals/using#modifying|*learn more advanced modal use cases*>."
            }
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: "Psssst this modal was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>"
              }
            ]
          }
        ]
      }
    });

    logger.info(JSON.stringify(result));
  }
  catch (error) {
    logger.error(error);
  }
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
  // const result = await services.fetchConversationsHistory();
  // console.log(`Result: ${JSON.stringify(result)}`);
  let pxmBlocks = {
    "type": "modal",
    "title": {
      "type": "plain_text",
      "text": "PXMs",
      "emoji": true
    },
    "blocks": blocks.model(services.parsePXMQueueValues())
  };
  console.log(`pxmBlocks: ${JSON.stringify(pxmBlocks)}`);
  await client.views.open({
    trigger_id: body.trigger_id,
    view: pxmBlocks,
  });
});

app.action('conversations_action_id', async ({ body, ack, client }) => {
  // Acknowledge the action
  ack();
  await client.views.open({
    trigger_id: body.trigger_id,
    view: blocks.conversations(),
  });
});

app.action('conversations_datepicker_action_id', async ({ body, ack, client }) => {
  // Acknowledge the action
  console.log(`conversations_datepicker_action_id:${JSON.stringify(body)}`);
  let selectedDate = "";
  await ack();
  try {
    if (body.type !== 'block_actions' || !body.view) {
      return;
    }

    body.actions.forEach((action) => {
      if (action.type === 'datepicker' && action.action_id === 'conversations_datepicker_action_id') {
        selectedDate = action.selected_date;
      }
    });
    console.log(`selectedDate: ${selectedDate}`);
    // Call views.update with the built-in client
    const result = await client.views.update({
      // Pass the view_id
      view_id: body.view.id,
      // Pass the current hash to avoid race conditions
      hash: body.view.hash,
      // View payload with updated blocks
      view: {
        type: 'modal',
        // View identifier
        callback_id: 'view_1',
        title: {
          type: 'plain_text',
          text: 'Updated modal'
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: 'You updated the modal!'
            }
          },
          {
            type: 'image',
            image_url: 'https://media.giphy.com/media/SVZGEcYt7brkFUyU90/giphy.gif',
            alt_text: 'Yay! The modal was updated'
          }
        ]
      }
    });
    console.log(`result:${JSON.stringify(result)}`);
  }
  catch (error) {
    console.log(error);
  }
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
          text: `* Turn your availability On / Off to be put on Queue * `
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
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Conversations",
              emoji: true,
            },
            value: "Conversations",
            action_id: "conversations_action_id",
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
          "text": `Hey there < @${message.user} > !`
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
    text: `Hey there < @${message.user} > !`
  });
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();


/*
fix the undefined in the conversation 
userid to username mapping
channelId - channelName - remove in the conversations
show avaialble user at the top
/rest API Endpoints with UI rendering for the conversations - messages.
*/