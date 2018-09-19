const express = require('express');
const bodyParser = require('body-parser');
const mc = require(__dirname + '/controllers/messages_controller');
const port = 3001;
const app = express();
app.use(express.static('../public/src'))
app.use(bodyParser.json());
app.use((req, res, next) => {
    next();
})

app.listen(port, () => { console.log(`Listening on port ${port}`) })

app.post("/api/messages", mc.create);
app.get("/api/messages", mc.read);
app.put("/api/messages/:id", mc.update);
app.delete("/api/messages/:id", mc.delete);