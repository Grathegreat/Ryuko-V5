module.exports.config = {
    name: "antiout",
    version: "1.0.0",
    permission: 1,
    credits: "ryuko",
    premium: false,
    description: "enable or disable antiout (add back users who leave)",
    prefix: true,
    category: "group",
    usages: "antiout on/off",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args, Threads }) {
    try {
        const { threadID, messageID } = event;

        if (args.length === 0) {
            return api.sendMessage("⚙️ ANTI-OUT SETTINGS\n\nUsage: antiout on/off\n\n📝 When enabled, bot will automatically add back any member who leaves the group.\n\n💡 Message: 'No left 😜' or 'Can't add - need approval'", threadID, messageID);
        }

        const action = args[0].toLowerCase();
        const threadData = global.data.threadData.get(parseInt(threadID)) || {};

        if (action === "on" || action === "enable") {
            threadData.antiOut = true;
            global.data.threadData.set(parseInt(threadID), threadData);
            await Threads.setData(threadID, { data: threadData });
            return api.sendMessage("✅ ANTI-OUT ENABLED!\n\nMembers who leave will be automatically added back! 🔙\n\nNo left 😜", threadID, messageID);
        } 
        else if (action === "off" || action === "disable") {
            threadData.antiOut = false;
            global.data.threadData.set(parseInt(threadID), threadData);
            await Threads.setData(threadID, { data: threadData });
            return api.sendMessage("✅ ANTI-OUT DISABLED!\n\nMembers can now leave the group normally. ✨", threadID, messageID);
        } 
        else {
            return api.sendMessage("❌ Invalid option! Use: antiout on/off", threadID, messageID);
        }
    } catch (e) {
        console.log(e);
        return api.sendMessage("❌ Error executing antiout command!", event.threadID, event.messageID);
    }
};
