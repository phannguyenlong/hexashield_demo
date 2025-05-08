const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Enable CORS
app.use(cors());

// Store connected clients
const clients = new Set();

// WebSocket connection handler
wss.on('connection', (ws) => {
  clients.add(ws);
  
  ws.on('close', () => {
    clients.delete(ws);
  });

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'attack_triggered') {
      handleRemoteAttackTrigger(data.attackType);
    }
  };
});

// Broadcast function to send messages to all connected clients
const broadcast = (data) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Hidden attack trigger endpoint
app.get('/trigger_attack', (req, res) => {
  const attackType = req.query.attack;
  
  if (!attackType || !['sql_injection', 'xss', 'ldap_injection'].includes(attackType)) {
    return res.status(400).json({ error: 'Invalid attack type' });
  }
  
  // Broadcast the attack to all connected clients
  broadcast({
    type: 'attack_triggered',
    attackType,
    timestamp: new Date().toISOString()
  });
  
  res.json({ success: true, message: 'Attack triggered' });
});

const handleRemoteAttackTrigger = (attackType = 'sql_injection') => {
  // (Copy the code from triggerAttackMode, but REMOVE the API call part)
  // ...create attackIncident, addSecurityEvent, setActiveAttack, etc...
  // (Everything after the API call in triggerAttackMode)
};

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 