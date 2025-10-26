module.exports.config = {
        name: "leave",
        eventType: ["log:unsubscribe"],
        version: "1.0.0",
        credits: "ryuko",
        description: "notify leave.",
};

module.exports.run = async function({ api, event, Users, Threads }) {
        try {
        if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
        const { threadID } = event;
        const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
        const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
        const type = (event.author == event.logMessageData.leftParticipantFbId) ? "ingat sa byahe haha" : "ayan mateluk ka kase haha";
        const antiOut = data.antiOut || false;
        const leftUserID = event.logMessageData.leftParticipantFbId;

        if (antiOut) {
                try {
                        await api.addUserToGroup(leftUserID, threadID);
                        return api.sendMessage(`🚫 ANTI-OUT ACTIVATED!\n\n${name}, bawal umalis dito! No left 😜\n\nAdded back to the group! 🔙`, threadID);
                } catch (err) {
                        return api.sendMessage(`❌ Can't add ${name} back!\n\nReason: Need approval or user blocked the bot 😢`, threadID);
                }
        }

        var msg, formPush
        (typeof data.customLeave == "undefined") ? msg = "fly high {name}, {type}" : msg = data.customLeave;
        msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);

        var formPush = { body: msg }
        
        return api.sendMessage(formPush, threadID);
    } catch (err) {}
}
