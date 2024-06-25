const sqlite3 = require('sqlite3').verbose();

// Open the database connection
const db = new sqlite3.Database('./chat.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  }

  console.log('Connected to SQLite database.');

  // Clear the messages table
  db.run('DELETE FROM messages', (err) => {
    if (err) {
      console.error('Error clearing messages table:', err.message);
      process.exit(1);
    }

    console.log('Messages table cleared successfully.');

    // Optional: Reset the auto-increment ID
    db.run('DELETE FROM sqlite_sequence WHERE name="messages"', (err) => {
      if (err) {
        console.error('Error resetting auto-increment ID:', err.message);
        process.exit(1);
      }

      console.log('Auto-increment ID reset successfully.');

      // Close the database connection
      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err.message);
          process.exit(1);
        }

        console.log('Database connection closed.');
        process.exit(0);
      });
    });
  });
});
