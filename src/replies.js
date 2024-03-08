function cheer() {
    let replies = [
        "Hey, things might seem tough right now, but remember, tomorrow is a new day. Hang in there.",
        "Life has its ups and downs, but you've got what it takes to overcome this. Keep pushing forward.",
        "I know it's rough, but try to focus on the positives. You're stronger than you think.",
        "Sometimes, a little bit of optimism can go a long way. Don't lose hope just yet.",
        "I believe in you. You've faced challenges before, and you've always come out on top. You can do it again.",
        "It's okay to feel down sometimes, but don't let it consume you. Things will get better, I promise.",
        "You're not alone in this. We'll figure it out together. Just take it one step at a time.",
        "I know it's hard, but try to find something to smile about. It might make things a little easier.",
        "You're capable of more than you realize. Don't underestimate yourself. You've got this.",
        "I've seen you overcome obstacles before, and I know you can do it again. Keep your head up.",
    ];

    let randomIndex = Math.floor(Math.random() * replies.length);
    return replies[randomIndex];
}

function calmPeople() {
    let replies = [
        "I understand you're upset, but there's no need for hostility. Let's try to resolve this calmly.",
        "I can see you're angry, but yelling won't solve anything. Let's have a civil conversation.",
        "I get it, you're frustrated. But attacking me won't fix the problem. Let's talk this out.",
        "I'm sorry if I've upset you, but there's no need to be rude. Let's discuss this like adults.",
        "I'm willing to listen to your grievances, but please refrain from being disrespectful.",
        "I know you're angry, but let's take a step back and try to address this issue calmly.",
        "I'm not here to argue with you. If you have concerns, let's address them in a civilized manner.",
        "I won't tolerate being spoken to in that tone. Let's communicate respectfully.",
        "I understand tensions are high, but let's try to keep our emotions in check and work towards a resolution.",
        "I'm sorry you're feeling this way, but resorting to insults won't help us find a solution. Let's try to find common ground."
    ];

    let randomIndex = Math.floor(Math.random() * replies.length);
    return replies[randomIndex];
}

function waitingForGemini() {
    let replies = [
        "Give me a moment to think this through. I'll get back to you with an answer.",
        "I need some time to mull it over. Can you wait a bit while I figure things out?",
        "Let me process everything first. I'll let you know once I've made up my mind.",
        "I appreciate your urgency, but I need to weigh my options. Please bear with me for a moment.",
        "I'm not one to make hasty decisions. Can you give me a little time to deliberate?",
        "I'm going to need a moment to gather my thoughts. Mind waiting while I do that?",
        "I'm not the type to rush into things. Give me a bit of time to consider all the angles.",
        "I'm not ready to commit just yet. Can you give me some time to think it over?",
        "I prefer to think things through thoroughly. Can you give me a little space to do that?",
        "I don't want to give you a half-baked answer. Let me take a moment to process everything properly.",
    ];

    let randomIndex = Math.floor(Math.random() * replies.length);
    return replies[randomIndex];
}

module.exports = { cheer, calmPeople, waitingForGemini };