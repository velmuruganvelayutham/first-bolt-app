

"use strict";
module.exports = {
    model: (pxmQueues) => {
        let pxmQueuesBlocks = [];
        let url = "https://clicktochat.junipercloud.net/conversations";
        console.log(`pxmQueeus:${JSON.stringify(pxmQueues)}`)
        pxmQueues.forEach(element => {
            let allottedChannels = element.allottedChannels;
            let formattedChannelsStr = "";
            allottedChannels.forEach(channel => {
                formattedChannelsStr += `<${url}/${channel.channel}|${channel.channel} - (${channel.timeSpent} Minutes)>\n`;
            });

            pxmQueuesBlocks.push({
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": `${element.userID}`,
                    "emoji": true
                }
            },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": `*Available:*\n${element.isAvailable}`
                        },
                        {
                            "type": "mrkdwn",
                            "text": `*Allotted:*\n${element.isAllotted}`
                        }
                    ]
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": `*Avl.Duration:*\n${element.totalAvailableTime} Minutes`
                        },
                        {
                            "type": "mrkdwn",
                            "text": `*Allotted Channels:*\n${formattedChannelsStr}`
                        }
                    ]
                },
                {
                    "type": "divider"
                }
            );
        });
        console.log(`pxmQueuesBlocks:${JSON.stringify(pxmQueuesBlocks)}`)
        return pxmQueuesBlocks;
    },
    conversations: () => {
        const conversationBlocks = {
            "title": {
                "type": "plain_text",
                "text": "Conversations",
                "emoji": true
            },
            "type": "modal",
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Pick a date to view the channels created"
                    },
                    "accessory": {
                        "type": "datepicker",
                        "initial_date": "1990-04-28",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select a date",
                            "emoji": true
                        },
                        "action_id": "conversations_datepicker_action_id"
                    }
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": "*Total channel created:*\n10"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "*Created Channels:*\nc2c-8778787"
                        }
                    ]
                }
            ]
        }

        return conversationBlocks;
    },
}