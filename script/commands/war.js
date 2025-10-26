module.exports.config = {
    name: "war",
    version: "1.0.0",
    permission: 0,
    credits: "ryuko",
    premium: false,
    description: "rant tagalog words to mentioned user",
    prefix: true,
    category: "fun",
    usages: "war @mention",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
    try {
        const mention = Object.keys(event.mentions);
        
        if (mention.length === 0) {
            return api.sendMessage("❌ Please mention someone to rant at! Usage: !war @mention", event.threadID, event.messageID);
        }

        const targetID = mention[0];
        const targetName = event.mentions[targetID];

        const tagalogRants = [
            "Oy {name}! Ang yabang mo naman! Akala mo kung sino ka!",
            "Hoy {name}! Tigilan mo nga yang kaartehan mo!",
            "{name}, wag kang feeling close ha! Hindi tayo magkaibigan!",
            "Aba {name}! Ang kapal ng mukha mo talaga!",
            "{name}, tigilan mo nga yang pagmamalaki mo! Walang impressed sayo!",
            "Grabe ka naman {name}! Sobrang yabang mo!",
            "Oy {name}! Tumigil ka nga diyan! Nakakainis ka na!",
            "{name}, ang laki ng ulo mo! Bumaba ka nga!",
            "Hoy {name}! Ano ba problema mo? Lagi ka na lang ganyan!",
            "{name}, sige ka! Sobra sobra ka na ha! Baka mapahiya ka!",
            "Aba {name}! Hindi ka special! Wag kang assuming!",
            "{name}, napaka-KJ mo naman! Tigilan mo nga yan!",
            "Oy {name}! Tigilan mo yang drama mo! Nakakasawa na!",
            "{name}, wag kang epal! Ang arte arte mo!",
            "Hoy {name}! Malaki problema mo sa buhay noh? Sobrang bitter mo!"
        ];

        const randomRant = tagalogRants[Math.floor(Math.random() * tagalogRants.length)];
        const message = randomRant.replace(/\{name}/g, targetName);

        const mentions = [{
            tag: targetName,
            id: targetID
        }];

        return api.sendMessage({
            body: `⚔️ WAR MODE ACTIVATED! ⚔️\n\n${message}\n\n🔥🔥🔥`,
            mentions: mentions
        }, event.threadID, event.messageID);

    } catch (e) {
        console.log(e);
        return api.sendMessage("❌ Error executing war command!", event.threadID, event.messageID);
    }
};
