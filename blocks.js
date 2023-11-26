

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
                formattedChannelsStr += `<${url}/${channel.channel}>|${channel.channel}(${channel.timeSpent})\n`;
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
                });
        });
        console.log(`pxmQueuesBlocks:${JSON.stringify(pxmQueuesBlocks)}`)
        return pxmQueuesBlocks;
    },
}