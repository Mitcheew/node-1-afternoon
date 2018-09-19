let messages = [];
let id = 0;

module.exports = {
    create: (req, res) => {
        const { displayName, icon, text, time } = req.body;
        if (text) {
            messages.push({ id, displayName, icon, text, time });
            res.status(200).send(messages);
            id++;
        } else {
            red.status(400).send('No message to send!')
        }

    },
    read: (req, res) => {
        res.status(200).send(messages);
    },
    update: (req, res) => {
        const { text } = req.body;
        const editId = req.params.id;
        const messageIndex = messages.findIndex(message => message.id == editId)
        let message = messages[messageIndex];

        // messages.splice(req.params.index, 1, message);
        messages[messageIndex] = {
            id: message.id,
            displayName: message.displayName,
            text: text || message.text,
            time: message.time
        }
        res.status(200).send(messages);

    },
    delete: (req, res) => {
        const deleteId = req.params.id;
        const messageIndex = messages.findIndex(message => message.id == deleteId)

        messages.splice(messageIndex, 1)
        res.status(200).send(messages);
    }
}