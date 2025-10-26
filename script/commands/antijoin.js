module.exports.config = {
    name: "antijoin",
    version: "1.0.0",
    permission: 1,
    credits: "ryuko",
    premium: false,
    description: "enable or disable antijoin (kick new members)",
    prefix: true,
    category: "group",
    usages: "antijoin on/off",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args, Threads }) {
    try {
        const { threadID, messageID } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        const botID = await api.getCurrentUserID();
        
        const isAdmin = threadInfo.adminIDs.some(admin => admin.id == botID);
        
        if (!isAdmin) {
            return api.sendMessage("❌ Bot must be a group admin to use anti-join feature!", threadID, messageID);
        }

        if (args.length === 0) {
            return api.sendMessage("⚙️ ANTI-JOIN SETTINGS\n\nUsage: antijoin on/off\n\n📝 When enabled, bot will automatically remove any new members who join the group.\n\n⚠️ Bot must be admin!", threadID, messageID);
        }

        const action = args[0].toLowerCase();
        const threadData = global.data.threadData.get(parseInt(threadID)) || {};

        if (action === "on" || action === "enable") {
            threadData.antiJoin = true;
            global.data.threadData.set(parseInt(threadID), threadData);
            await Threads.setData(threadID, { data: threadData });
            return api.sendMessage("✅ ANTI-JOIN ENABLED!\n\nNew members will be automatically removed from the group! 🚫", threadID, messageID);
        } 
        else if (action === "off" || action === "disable") {
            threadData.antiJoin = false;
            global.data.threadData.set(parseInt(threadID), threadData);
            await Threads.setData(threadID, { data: threadData });
            return api.sendMessage("✅ ANTI-JOIN DISABLED!\n\nNew members can now join the group normally. ✨", threadID, messageID);
        } 
        else {
            return api.sendMessage("❌ Invalid option! Use: antijoin on/off", threadID, messageID);
        }
    } catch (e) {
        console.log(e);
        return api.sendMessage("❌ Error executing antijoin command!", event.threadID, event.messageID);
    }
};
