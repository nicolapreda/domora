require('dotenv').config();
const { google } = require('googleapis');

async function testGoogleSheets() {
  console.log('🔍 Test diretto Google Sheets API...');
  
  try {
    // Verifica credenziali
    if (!process.env.GOOGLE_SHEETS_CREDENTIALS || !process.env.GOOGLE_SHEET_ID) {
      console.error('❌ Credenziali mancanti');
      return;
    }

    console.log('📋 Parsing credenziali...');
    const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);
    console.log('📧 Service Account:', credentials.client_email);
    console.log('🆔 Project ID:', credentials.project_id);
    console.log('📊 Sheet ID:', process.env.GOOGLE_SHEET_ID);

    // Autenticazione
    console.log('🔐 Creazione autenticazione JWT...');
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    console.log('🔑 Test autorizzazione...');
    await auth.authorize();
    console.log('✅ Autorizzazione JWT riuscita!');

    // Test accesso al foglio
    console.log('📊 Test accesso al foglio...');
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
    });
    
    console.log('✅ Accesso al foglio riuscito!');
    console.log('📋 Nome foglio:', response.data.properties.title);
    console.log('🔢 Numero di fogli:', response.data.sheets.length);
    
    // Elenca i fogli
    response.data.sheets.forEach((sheet, index) => {
      console.log(`   ${index + 1}. ${sheet.properties.title}`);
    });

    // Test lettura dati
    console.log('📖 Test lettura dati...');
    const readResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A1:G10',
    });
    
    console.log('✅ Lettura riuscita!');
    console.log('📊 Righe trovate:', readResponse.data.values ? readResponse.data.values.length : 0);
    
    if (readResponse.data.values) {
      console.log('📋 Prime righe:');
      readResponse.data.values.slice(0, 3).forEach((row, index) => {
        console.log(`   ${index + 1}:`, row);
      });
    }

    // Test scrittura
    console.log('✏️ Test scrittura dati...');
    const testData = [
      [
        new Date().toLocaleString('it-IT'),
        'Test API',
        'test@api.com',
        '+39 123 456 789',
        'Test di connessione',
        'mattina',
        'Test Script'
      ]
    ];

    const writeResponse = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A:G',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: testData,
      },
    });

    console.log('✅ Scrittura riuscita!');
    console.log('📊 Righe aggiunte:', writeResponse.data.updates.updatedRows);
    console.log('📍 Range aggiornato:', writeResponse.data.updates.updatedRange);

  } catch (error) {
    console.error('❌ ERRORE:', error.message);
    console.error('🔍 Codice errore:', error.code);
    console.error('📋 Dettagli:', error.details || 'Nessun dettaglio disponibile');
    
    if (error.errors) {
      console.error('🚨 Errori specifici:');
      error.errors.forEach((err, index) => {
        console.error(`   ${index + 1}. ${err.reason}: ${err.message}`);
      });
    }
  }
}

testGoogleSheets();