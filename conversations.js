
"use strict";
const moment = require("moment");
const { WebClient } = require('@slack/web-api');
module.exports = {
    parseMessages: () => {

        let messages = [
            {
                "client_msg_id": "5285d181-8850-43c8-b924-b17933275e24",
                "type": "message",
                "text": "i didn't know we could use C2C",
                "user": "U03H58XDLLC",
                "ts": "1700649661.258179",
                "blocks": [
                    {
                        "type": "rich_text",
                        "block_id": "Nl/nW",
                        "elements": [
                            {
                                "type": "rich_text_section",
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "i didn't know we could use C2C"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "team": "T05Q3NPU571"
            },
            {
                "client_msg_id": "0973fafa-3e1d-4db7-a059-7b4f6d8bb7d8",
                "type": "message",
                "text": "can i help with champions",
                "user": "U03H58XDLLC",
                "ts": "1700649625.646849",
                "blocks": [
                    {
                        "type": "rich_text",
                        "block_id": "NXX1I",
                        "elements": [
                            {
                                "type": "rich_text_section",
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "can i help with champions"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "team": "T05Q3NPU571"
            },
            {
                "client_msg_id": "ee66d84f-ceec-44e8-a421-815909a5bc59",
                "type": "message",
                "text": "did you enjoy our partner center",
                "user": "U03H58XDLLC",
                "ts": "1700649619.113469",
                "blocks": [
                    {
                        "type": "rich_text",
                        "block_id": "B/6Mh",
                        "elements": [
                            {
                                "type": "rich_text_section",
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "did you enjoy our partner center"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "team": "T05Q3NPU571"
            },
            {
                "client_msg_id": "9f76a75d-0521-4b82-b7d3-adc4b450a9eb",
                "type": "message",
                "text": "i mean how can i help you mam",
                "user": "U03H58XDLLC",
                "ts": "1700649598.585709",
                "blocks": [
                    {
                        "type": "rich_text",
                        "block_id": "S66xZ",
                        "elements": [
                            {
                                "type": "rich_text_section",
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "i mean how can i help you mam"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "team": "T05Q3NPU571"
            },
            {
                "client_msg_id": "7d877b1d-bf46-4f15-abcc-c1201fadbadf",
                "type": "message",
                "text": "what is going on",
                "user": "U03H58XDLLC",
                "ts": "1700649589.926679",
                "blocks": [
                    {
                        "type": "rich_text",
                        "block_id": "TrMDn",
                        "elements": [
                            {
                                "type": "rich_text_section",
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "what is going on"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "team": "T05Q3NPU571"
            },
            {
                "client_msg_id": "4889006b-ca7d-45a7-890a-9fe985262dd3",
                "type": "message",
                "text": "Was doing a cute tour",
                "user": "U03GGUBKA72",
                "ts": "1700649571.639789",
                "blocks": [
                    {
                        "type": "rich_text",
                        "block_id": "WIpiV",
                        "elements": [
                            {
                                "type": "rich_text_section",
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "Was doing a cute tour"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "team": "T05Q3NPU571"
            },
            {
                "client_msg_id": "9cc6d6fd-1af9-4616-82f9-92d5e76e19bd",
                "type": "message",
                "text": "Well hey there",
                "user": "U03GGUBKA72",
                "ts": "1700649560.167919",
                "blocks": [
                    {
                        "type": "rich_text",
                        "block_id": "ZLsjl",
                        "elements": [
                            {
                                "type": "rich_text_section",
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "Well hey there"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "team": "T05Q3NPU571"
            },
            {
                "type": "message",
                "subtype": "bot_message",
                "text": "<@U03H58XDLLC> was added to c2c-1m3apaiwcv by <@U02PFFEDP5X> using the channel management tool. <https://slack.com/trust/data-management|Learn more>.",
                "ts": "1700649523.396489",
                "user": "USLACKBOT",
                "username": "slackbot",
                "bot_id": "B01",
                "blocks": [
                    {
                        "type": "rich_text",
                        "block_id": "2R0n",
                        "elements": [
                            {
                                "type": "rich_text_section",
                                "elements": [
                                    {
                                        "type": "user",
                                        "user_id": "U03H58XDLLC"
                                    },
                                    {
                                        "type": "text",
                                        "text": " was added to c2c-1m3apaiwcv by "
                                    },
                                    {
                                        "type": "user",
                                        "user_id": "U02PFFEDP5X"
                                    },
                                    {
                                        "type": "text",
                                        "text": " using the channel management tool. "
                                    },
                                    {
                                        "type": "link",
                                        "url": "https://slack.com/trust/data-management",
                                        "text": "Learn more"
                                    },
                                    {
                                        "type": "text",
                                        "text": "."
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "type": "message",
                "subtype": "bot_message",
                "text": "<@U03GGUBKA72> was added to c2c-1m3apaiwcv by <@U02PFFEDP5X> using the channel management tool. <https://slack.com/trust/data-management|Learn more>.",
                "ts": "1700649518.010439",
                "user": "USLACKBOT",
                "username": "slackbot",
                "bot_id": "B01",
                "blocks": [
                    {
                        "type": "rich_text",
                        "block_id": "uuE",
                        "elements": [
                            {
                                "type": "rich_text_section",
                                "elements": [
                                    {
                                        "type": "user",
                                        "user_id": "U03GGUBKA72"
                                    },
                                    {
                                        "type": "text",
                                        "text": " was added to c2c-1m3apaiwcv by "
                                    },
                                    {
                                        "type": "user",
                                        "user_id": "U02PFFEDP5X"
                                    },
                                    {
                                        "type": "text",
                                        "text": " using the channel management tool. "
                                    },
                                    {
                                        "type": "link",
                                        "url": "https://slack.com/trust/data-management",
                                        "text": "Learn more"
                                    },
                                    {
                                        "type": "text",
                                        "text": "."
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "type": "message",
                "subtype": "bot_message",
                "text": "<@U05UK0K3RFV> was added to c2c-1m3apaiwcv by <@U02PFFEDP5X> using the channel management tool. <https://slack.com/trust/data-management|Learn more>.",
                "ts": "1700649517.397999",
                "user": "USLACKBOT",
                "username": "slackbot",
                "bot_id": "B01",
                "blocks": [
                    {
                        "type": "rich_text",
                        "block_id": "/U=",
                        "elements": [
                            {
                                "type": "rich_text_section",
                                "elements": [
                                    {
                                        "type": "user",
                                        "user_id": "U05UK0K3RFV"
                                    },
                                    {
                                        "type": "text",
                                        "text": " was added to c2c-1m3apaiwcv by "
                                    },
                                    {
                                        "type": "user",
                                        "user_id": "U02PFFEDP5X"
                                    },
                                    {
                                        "type": "text",
                                        "text": " using the channel management tool. "
                                    },
                                    {
                                        "type": "link",
                                        "url": "https://slack.com/trust/data-management",
                                        "text": "Learn more"
                                    },
                                    {
                                        "type": "text",
                                        "text": "."
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        let users = [];
        let formattedMessages = [];
        messages.forEach((element) => {
            console.log(`text: ${element.text}, ts: ${element.ts}, user: ${element.user}`);
            users.push(element.user);
        });
        let uniqueUsers = users.filter((item, i, uUsers) => uUsers.indexOf(item) === i);
        console.log(`uniqueUsers: ${uniqueUsers}`);
        let formattedUniqueUsers = {};
        uniqueUsers.forEach((item) => {
            formattedUniqueUsers[item] = item + "--FULLNAME--";
        });
        messages.forEach((element) => {
            formattedMessages.push({ "text": element.text, "ts": moment.unix(element.ts).format("dddd, Do MMM YYYY, h:mm:ss A"), "user": element.user.replace(element.user, formattedUniqueUsers[element.user]) });
        });

        console.log(`formattedMessages: ${JSON.stringify(formattedMessages)}`);
    }
}