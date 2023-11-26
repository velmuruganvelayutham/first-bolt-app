"use strict";
const moment = require("moment");
const { WebClient } = require('@slack/web-api');
module.exports = {
    parsePXMQueueValues: () => {

        const convertedPxmQueues = [];
        let pxmqueues = [
            {
                "rowId": 510,
                "userId": "U03B05KQS3C",
                "userAvailability": false,
                "signinDate": "2023-11-22",
                "toggledTime": "{\"previousAttempts\":[],\"latestAttempt\":{}}",
                "allottedTo": null,
                "allottedTime": null,
                "isAllotted": false,
                "signoutDate": null,
                "createdAt": "2023-11-22T00:00:54.652Z",
                "updatedAt": "2023-11-22T00:00:54.652Z"
            },
            {
                "rowId": 550,
                "userId": "U03BPMJC6HW",
                "userAvailability": true,
                "signinDate": "2023-11-22",
                "toggledTime": "{\"previousAttempts\":[],\"latestAttempt\":{\"toggledOn\":\"2023-11-22 07:24:03.409+00\",\"allotments\":[{\"allottedTo\":\"C066JJ8ADQF\",\"allottedTime\":\"2023-11-22 08:07:43.551+00\",\"deallottedTime\":\"2023-11-22 08:21:02.106+00\"}]}}",
                "allottedTo": null,
                "allottedTime": null,
                "isAllotted": false,
                "signoutDate": null,
                "createdAt": "2023-11-22T19:24:03.409Z",
                "updatedAt": "2023-11-22T20:21:02.111Z"
            },
            {
                "rowId": 520,
                "userId": "U03GGUBKA72",
                "userAvailability": false,
                "signinDate": "2023-11-22",
                "toggledTime": "{\"previousAttempts\":[{\"toggledOn\":\"2023-11-22 08:57:00.846+00\",\"allotments\":[{\"allottedTo\":\"C066VLM3TEE\",\"allottedTime\":\"2023-11-22 09:24:13.056+00\",\"deallottedTime\":\"2023-11-22 09:31:05.421+00\"},{\"allottedTo\":\"C066XTJ88NN\",\"allottedTime\":\"2023-11-22 04:16:13.356+00\",\"deallottedTime\":\"2023-11-22 04:35:02.253+00\"},{\"allottedTo\":\"C066S4A8N1L\",\"allottedTime\":\"2023-11-22 06:47:43.482+00\",\"deallottedTime\":\"2023-11-22 06:57:46.177+00\"}],\"toggledOff\":\"2023-11-22 06:57:49.443+00\"}],\"latestAttempt\":{}}",
                "allottedTo": null,
                "allottedTime": null,
                "isAllotted": false,
                "signoutDate": null,
                "createdAt": "2023-11-22T08:57:00.848Z",
                "updatedAt": "2023-11-22T18:58:00.439Z"
            },
            {
                "rowId": 530,
                "userId": "U03H58XDLLC",
                "userAvailability": false,
                "signinDate": "2023-11-22",
                "toggledTime": "{\"previousAttempts\":[{\"toggledOn\":\"2023-11-22 09:29:56.409+00\",\"allotments\":[{\"allottedTo\":\"C066PD9ABB8\",\"allottedTime\":\"2023-11-22 10:38:43.115+00\",\"deallottedTime\":\"2023-11-22 10:49:01.544+00\"}],\"toggledOff\":\"2023-11-22 02:18:55.834+00\"},{\"toggledOn\":\"2023-11-22 04:17:23.115+00\",\"toggledOff\":\"2023-11-22 04:40:48.931+00\"}],\"latestAttempt\":{}}",
                "allottedTo": null,
                "allottedTime": null,
                "isAllotted": false,
                "signoutDate": null,
                "createdAt": "2023-11-22T09:29:56.410Z",
                "updatedAt": "2023-11-22T16:40:48.933Z"
            },
            {
                "rowId": 540,
                "userId": "U03BQ9VASTY",
                "userAvailability": true,
                "signinDate": "2023-11-22",
                "toggledTime": "{\"previousAttempts\":[{\"toggledOn\":\"2023-11-22 03:00:34.143+00\",\"allotments\":[{\"allottedTo\":\"C066XTJ88NN\",\"allottedTime\":\"2023-11-22 04:45:43.383+00\",\"deallottedTime\":\"2023-11-22 05:13:36.360+00\"}],\"toggledOff\":\"2023-11-22 05:13:41.677+00\"},{\"toggledOn\":\"2023-11-22 05:47:32.922+00\",\"allotments\":[{\"allottedTo\":\"C066J7QK8KZ\",\"allottedTime\":\"2023-11-22 06:49:43.483+00\",\"deallottedTime\":\"2023-11-22 07:00:03.311+00\"},{\"allottedTo\":\"C0671BT2SHJ\",\"allottedTime\":\"2023-11-22 07:22:43.507+00\",\"deallottedTime\":\"2023-11-22 07:35:02.327+00\"}],\"toggledOff\":\"2023-11-22 07:39:42.320+00\"}],\"latestAttempt\":{\"toggledOn\":\"2023-11-22 08:44:38.875+00\"}}",
                "allottedTo": null,
                "allottedTime": null,
                "isAllotted": false,
                "signoutDate": null,
                "createdAt": "2023-11-22T15:00:34.145Z",
                "updatedAt": "2023-11-22T20:44:38.875Z"
            }
        ]

        pxmqueues.forEach((ele) => {
            console.log(ele.userAvailability, ele.isAllotted);
            let toggedTime = JSON.parse(ele.toggledTime);
            let previousAttempts = toggedTime.previousAttempts;
            let latestAttempt = toggedTime.latestAttempt;
            let availableTime = 0;
            let allottedChannels = [];
            // previous attempts: 
            console.log(`previousAttempts:${JSON.stringify(previousAttempts)}`);
            if (Array.isArray(previousAttempts)) {
                console.log(`previousAttemptsLength:${JSON.stringify(previousAttempts.length)}`);
                if (previousAttempts.length >= 1) {
                    previousAttempts.forEach((attempt) => {
                        let allotments = attempt.allotments;
                        /* if (typeof attempt.toggledOn !== "undefined") {
                            let toggleOnTime = moment(attempt.toggledOn);
                            console.log(`toggleOnTime: ${toggleOnTime}`);
                            let toggleOffTime = moment(attempt.toggledOff);
                            let timeSpent = toggleOffTime.diff(toggleOnTime, 'minutes');
                            console.log(`timeSpent: ${timeSpent}`);
                            if (typeof timeSpent === 'number' && timeSpent !== null) {
                                availableTime += timeSpent;
                            }
                        } */
                        console.log(`Allotments:${JSON.stringify(allotments)}`);
                        if (Array.isArray(allotments)) {
                            if (allotments.length >= 1) {
                                console.log(`AllotmentsLength:${allotments.length}`);
                                allotments.forEach((allotment) => {
                                    let allottedTime = moment(allotment.allottedTime);
                                    let deallotedTime = moment(allotment.deallottedTime);
                                    let timeSpent = deallotedTime.diff(allottedTime, 'minutes');
                                    allottedChannels.push({ "channel": allotment.allottedTo, "timeSpent": timeSpent });
                                    availableTime += timeSpent;
                                });
                            }
                        }
                    });
                }
            }
            // latest attemps: 
            console.log(`latestAttempt:${JSON.stringify(latestAttempt)}`);
            if (typeof latestAttempt === 'object' && latestAttempt !== null) {
                let allotments = latestAttempt.allotments;
                console.log(`Allotments:${JSON.stringify(allotments)}`);
                /* if (typeof latestAttempt.toggledOn !== "undefined") {
                    let toggleOnTime = moment(latestAttempt.toggledOn);
                    console.log(`toggleOnTime: ${toggleOnTime}, latestAttempt.toggledOn: ${latestAttempt.toggledOn}`);
                    const currentDate = new Date();
                    const aMoment = moment(currentDate);
                    const toggleOffTime = moment(aMoment.format('YYYY-MM-DD hh:mm:ss.SSS+00'));
                    let timeSpent = toggleOffTime.diff(toggleOnTime, 'minutes');
                    console.log(`timeSpent: ${timeSpent}`);
                    if (typeof timeSpent === 'number' && timeSpent !== null) {
                        availableTime += timeSpent;
                    }
                } */
                if (Array.isArray(allotments)) {
                    if (allotments.length >= 1) {
                        console.log(`AllotmentsLength:${allotments.length}`);
                        allotments.forEach((allotment) => {
                            let allottedTime = moment(allotment.allottedTime);
                            let deallotedTime = moment(allotment.deallottedTime);
                            let timeSpent = deallotedTime.diff(allottedTime, 'minutes');
                            allottedChannels.push({ "channel": allotment.allottedTo, "timeSpent": timeSpent });
                            availableTime += timeSpent;
                        });
                    }
                }
            }
            console.log(`\n *** \n userID:${JSON.stringify(ele.userId)} \n allottedChannels:${JSON.stringify(allottedChannels)} \n TotalAvailableTime: ${JSON.stringify(availableTime)}\n *** \n `);
            let convertedPxmQueue = { "isAllotted": ele.isAllotted, "isAvailable": ele.userAvailability, "userID": ele.userId, "allottedChannels": allottedChannels, "totalAvailableTime": availableTime };
            convertedPxmQueues.push(convertedPxmQueue);
            console.log(`${JSON.stringify(convertedPxmQueue)}`);
        });
        return convertedPxmQueues;
    },

    fetchConversationsHistory: async () => {
        // Store conversation history
        let conversationHistory;
        // ID of channel you watch to fetch the history for
        let channelId = "C3XQUTUN5";

        try {
            // Call the conversations.history method using WebClient
            const client = new WebClient();
            const result = await client.conversations.history({
                channel: channelId
            });
            conversationHistory = result.messages;
            // Print results
            console.log(conversationHistory.length + " messages found in " + channelId);
            console.log(`history: ${JSON.stringify(conversationHistory)}`);
        }
        catch (error) {
            console.error(error);
        }
        return conversationHistory;
    }
}
