module.exports.config = {
    name: "war",
    version: "2.0.0",
    permission: 0,
    credits: "ryuko",
    premium: false,
    description: "intense tagalog rant and roast to mentioned user",
    prefix: true,
    category: "fun",
    usages: "war @mention",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
    try {
        const mention = Object.keys(event.mentions);
        
        if (mention.length === 0) {
            return api.sendMessage("❌ Mention someone para awayin! Usage: !war @mention", event.threadID, event.messageID);
        }

        const targetID = mention[0];
        const targetName = event.mentions[targetID];

        const intenseRants = [
            "PUTANGINA {name}! Sobrang YABANG mo! Akala mo kung sino ka! Wala kang kwenta! Puro ka DADA lang! Walang GAWA! Tigilan mo yang pagiging MAYABANG mo! TANGA ka ba?! Napaka-SARAP mo SAMPALIN eh!",
            
            "HOY {name}! ULOL! Ang KAPAL ng MUKHA mo! Walang HIYA ka talaga! Puro ka SALITA! WALANG BAYAG! Ang LAKI ng ILONG mo pero WALANG PANLASA! BOBO mo! Wala kang KWENTA sa BUHAY!",
            
            "{name} GAGO KA! Napaka-ARTE mo! Feeling mo MAGANDA/GWAPO ka?! PANGIT ka GAGO! TANGA! Wala kang UTAK! Puro ka KAARTEHAN! WALANG SILBI! Napaka-PLASTIK mo! INUTIL!",
            
            "ABA {name}! TANGINA MO! Puro ka YABANG! Walang LAMAN yang ULO mo! TANGA-TANGA ka! Ang LIIT ng UTAK mo! PURO ka HANGIN! Feeling mo ASTIG ka?! WALANG KWENTA ka! BOBO!",
            
            "GRABE ka {name}! NAPAKASAMA mo! MASAMANG TAO ka! Walang RESPETO! Walang GALANG! BASTOS ka! Ang PANGIT ng UGALI mo! WALANG ASAL! Napaka-SUNGIT mo! MAPAIT ka sa BUHAY!",
            
            "{name} PUTANGINA! Sobrang KAPAL ng MUKHA mo! Walang KAHIHIYAN! WALANG MODO! Puro ka EPAL! Lagi kang NAKIKISAWSAW! Hindi ka NAMAN KASALI! TANGA! Napaka-KUPAL mo!",
            
            "HOY {name} GAGO! Tigilan mo yang KAPLASTIKAN mo! PLASTIC ka! FAKE! HINDI ka TUNAY! Puro ka KUNWARI! SALBAHE ka! Napaka-SAMA ng UGALI mo! WALANG KWENTA!",
            
            "PUTANGINA mo {name}! Ang YABANG mo SOBRA! Akala mo PERPEKTO ka?! TANGA! Puro ka PAGMAMALAKI! Walang NAAABOT! Puro ka SABI! WALANG GAWA! INUTIL ka!",
            
            "{name} WALANG KWENTA KA! BOBO ka! TANGA! Walang UTAK! Puro ka KALOKOHAN! Napaka-GAGO mo! KUPAL! Ang LIIT ng BAYAG mo! Puro ka DUWAG! TAKOT ka!",
            
            "ABA {name}! TANGINA! Sobrang SAMA mo! WALANG MODO! Walang GALANG! BASTOS! Napaka-SUNGIT mo! MASUNGIT! Ang PANGIT ng ASAL mo! WALANG BREEDING!",
            
            "GAGO ka {name}! Puro ka HANGIN! WALANG LAMAN! TANGA! Feeling mo TALINO ka?! BOBO ka nga eh! Walang ALAM! IGNORANTE! Napaka-BURARA mo!",
            
            "{name} ULOL KA! Ang KAPAL ng MUKHA mo! Sobrang WALANG HIYA! Napaka-YABANG! MAYABANG! Feeling mo SIKAT ka?! WALANG NAKAKAKILALA sayo! TANGA!",
            
            "HOY {name}! KUPAL ka! Napaka-SAMA ng UGALI mo! WALANG RESPETO! Puro ka BASTOS! Walang MODO! WALANG ASAL! Ang PANGIT ng UGALI mo! NAPAKA-SAMA!",
            
            "PUTANGINA {name}! Sobrang YABANG mo! Napaka-TAAS ng TINGIN mo sa SARILI mo! TANGA! Wala ka namang KWENTA! BOBO! Puro ka HANGIN lang!",
            
            "{name} GAGO! WALANG SILBI ka! Puro ka DADA! SALITA! REKLAMO! Pero WALANG GAWA! TAMAD! WALANG AMBAG! PARASITE ka! DUKHA sa UTAK!",
            
            "TANGINA mo {name}! Napaka-ARTE mo! FEELING! Akala mo PERPEKTO ka?! MALI! TANGA ka! BOBO! Walang UTAK! Napaka-HANGAL mo! ESTUPIDO!",
            
            "ABA {name}! ULOL! Puro ka KAARTEHAN! DRAMA! PARINIG! Napaka-PLASTIC mo! FAKE! KUNWARI! Walang TOTOO sayo! SALBAHE! MASAMA!",
            
            "{name} WALANG HIYA KA! Ang KAPAL ng MUKHA mo! MAYABANG! YABANG! Feeling mo GALING mo?! HINDI! BOBO ka nga eh! TANGA! WALANG ALAM!",
            
            "GAGO ka talaga {name}! Napaka-SAMA mo! MASAMA! Walang MODO! Walang GALANG! BASTOS! WALANG RESPETO! Ang PANGIT ng UGALI mo! KUPAL!",
            
            "HOY {name} TANGA! Puro ka YABANG! MAYABANG! Akala mo ASTIG ka?! HINDI! DUWAG ka nga eh! TAKOT! Walang BAYAG! MAHINA! WALANG KWENTA!",
            
            "{name} BOBO KA! Walang UTAK! TANGA! HANGAL! Napaka-BURARA mo! IGNORANTE! Walang ALAM! Puro ka KALOKOHAN lang! WALANG SILBI!",
            
            "PUTANGINA {name}! Napaka-PLASTIC mo! FAKE! KUNWARI! Walang TOTOO! Puro ka PAIMBABAW! MABABAW! Walang LAMAN! WALANG KWENTA!",
            
            "TANGINA mo {name}! Sobrang EPAL mo! Lagi kang NAKIKISAWSAW! Walang HIYA! KAPAL ng MUKHA! Hindi ka naman KASALI! TANGA! GAGO!",
            
            "{name} KUPAL KA! Napaka-SUNGIT mo! MASUNGIT! SUPLADO/SUPLADA! Ang YABANG! MAYABANG! Walang MODO! BASTOS! Ang SAMA ng UGALI mo!",
            
            "GAGO ka {name}! Puro ka SALITA! DADA! REKLAMO! Pero WALANG GAWA! TAMAD ka! WALANG AMBAG! PARASITE! Nakaka-INIS ka!",
            
            "ABA {name}! WALANG KWENTA ka! BOBO! TANGA! Puro ka KALOKOHAN! Napaka-GAGO mo! ULOL! Walang UTAK! HANGAL!",
            
            "{name} TANGINA! Ang YABANG mo! MAYABANG! Feeling mo MAGALING ka?! HINDI! Puro ka HANGIN! WALANG LAMAN! WALANG KWENTA!",
            
            "HOY {name}! PLASTIK ka! FAKE! Walang TOTOO sayo! Puro KUNWARI! SALBAHE! Napaka-SAMA ng UGALI mo! WALANG MODO!",
            
            "PUTANGINA {name}! Sobrang KAPAL ng MUKHA mo! Walang HIYA! WALANG GALANG! BASTOS! Walang RESPETO! WALANG ASAL! KUPAL!",
            
            "{name} ULOL KA! Napaka-YABANG mo! Akala mo SIKAT ka?! HINDI! Walang NAKAKAKILALA sayo! TANGA! BOBO! WALANG KWENTA ka!"
        ];

        const randomRant = intenseRants[Math.floor(Math.random() * intenseRants.length)];
        const message = randomRant.replace(/\{name}/g, targetName);

        const mentions = [{
            tag: targetName,
            id: targetID
        }];

        const reactions = [
            "🔥💢💥",
            "😡🤬💢",
            "💢💥😤",
            "🤬💀💢",
            "😡💥🔥"
        ];

        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];

        return api.sendMessage({
            body: `━━━━━━━━━━━━━━━━━━━\n⚔️ WAR MODE ACTIVATED ⚔️\n━━━━━━━━━━━━━━━━━━━\n\n${message}\n\n━━━━━━━━━━━━━━━━━━━\n${randomReaction} ROASTED! ${randomReaction}\n━━━━━━━━━━━━━━━━━━━`,
            mentions: mentions
        }, event.threadID, event.messageID);

    } catch (e) {
        console.log(e);
        return api.sendMessage("❌ Error executing war command!", event.threadID, event.messageID);
    }
};
