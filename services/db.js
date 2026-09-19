import * as SQLite from 'expo-sqlite';

// Instance unique de la base de données SQLite pour l'application
export const db = SQLite.openDatabaseSync('Cars.db');
