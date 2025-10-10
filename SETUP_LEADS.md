# 🚀 Setup Domora Lead Management System

Questo sistema gestisce automaticamente i lead provenienti dalla landing page di Domora, salvandoli su Google Sheets e inviando notifiche Telegram.

## 📋 Pre-requisiti

1. **Account Google** con accesso a Google Sheets
2. **Account Telegram** per creare un bot
3. **Node.js** installato sul server

## 🔧 Configurazione

### 1. Google Sheets Setup

1. Vai su [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuovo progetto o seleziona uno esistente
3. Abilita **Google Sheets API**:
   - Vai su "API e servizi" → "Libreria"
   - Cerca "Google Sheets API" e abilitala
4. Crea le credenziali:
   - Vai su "API e servizi" → "Credenziali"
   - Clicca "Crea credenziali" → "Account di servizio"
   - Compila i campi richiesti
   - Scarica il file JSON delle credenziali
5. Prepara il foglio Google Sheets:
   - Crea un nuovo foglio chiamato "Domora Leads"
   - Crea un foglio chiamato "Leads" all'interno
   - Aggiungi le seguenti intestazioni nella prima riga:
     ```
     A1: Data/Ora
     B1: Nome
     C1: Email  
     D1: Telefono
     E1: Tipo Business
     F1: Sfida Principale
     G1: Preferenza Oraria
     H1: Fonte
     ```
   - Condividi il foglio con l'email dell'account di servizio (presente nel file JSON)

### 2. Telegram Bot Setup

1. Apri Telegram e cerca **@BotFather**
2. Scrivi `/newbot` e segui le istruzioni
3. Scegli un nome e username per il bot
4. Copia il **token** che ti viene fornito
5. Per ottenere il **Chat ID**:
   - Aggiungi il bot a un gruppo o scrivili in privato
   - Invia un messaggio al bot
   - Visita: `https://api.telegram.org/bot[TOKEN]/getUpdates`
   - Cerca `"chat":{"id":NUMERO}` nella risposta JSON

### 3. Configurazione Ambiente

1. Copia il file di esempio:
   ```bash
   cp .env.example .env
   ```

2. Modifica il file `.env` con i tuoi valori:

```env
# Porta del server
PORT=3004

# Google Sheets
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"..."}
GOOGLE_SHEET_ID=1abcdefghijklmnopqrstuvwxyz

# Telegram Bot
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

## 🚀 Avvio del Sistema

1. Installa le dipendenze:
   ```bash
   npm install
   ```

2. Avvia il server:
   ```bash
   npm start
   ```

## 🧪 Test del Sistema

### Test Completo
Visita: `http://localhost:3004/test-integrations`

Questo endpoint testa:
- ✅ Connessione a Google Sheets
- ✅ Invio notifiche Telegram  
- ✅ Salvataggio backup locale

### Test Form
Usa il form sulla landing page e verifica che:
- Il lead appaia nel foglio Google Sheets
- Arrivi una notifica su Telegram
- Sia salvato anche nel file `leads-backup.json`

### Visualizza Lead Locali
Visita: `http://localhost:3004/leads`

## 📁 Struttura Dati

### Google Sheets
I lead vengono salvati con le seguenti colonne:
- **Data/Ora**: Timestamp italiano
- **Nome**: Nome completo del lead
- **Email**: Indirizzo email
- **Telefono**: Numero di telefono
- **Tipo Business**: Tipo di business
- **Sfida Principale**: Sfida principale del lead
- **Preferenza Oraria**: Quando preferisce essere contattato
- **Fonte**: "Landing Page Domora"

### Notifica Telegram
Formato del messaggio:
```
🔥 NUOVO LEAD DOMORA 🔥

👤 Nome: Mario Rossi
📧 Email: mario@example.com
📱 Telefono: +39 123 456 7890
🏢 Tipo business: Immobiliare
❓ Sfida principale: Vendita rapida
⏰ Preferenza oraria: Mattina (9-12)

📅 Data/Ora: 10/10/2025, 14:30:25
🌐 Fonte: Landing Page Domora

#Lead #Domora #LandingPage
```

## 🔒 Sicurezza

- Il file `.env` contiene informazioni sensibili - **NON committarlo in Git**
- Le credenziali Google Sheets sono account di servizio con accesso limitato
- Il bot Telegram riceve solo notifiche, non può essere usato per altri scopi

## 🚨 Risoluzione Problemi

### Errore Google Sheets
- Verifica che l'API sia abilitata
- Controlla che il foglio sia condiviso con l'account di servizio
- Verifica che il nome del foglio sia "Leads"

### Errore Telegram
- Verifica che il token sia corretto
- Assicurati che il bot sia stato avviato con `/start`
- Controlla che il Chat ID sia numerico (può essere negativo)

### Lead non arrivano
- Controlla i log del server per errori specifici
- Usa `/test-integrations` per isolare il problema
- I lead vengono sempre salvati localmente come backup

## 📞 Supporto

In caso di problemi:
1. Controlla i log del server
2. Testa le singole integrazioni
3. Verifica la configurazione delle API
4. I lead sono sempre salvati localmente come backup