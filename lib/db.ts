import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface MedicalNoteDB extends DBSchema {
    files: {
        key: string;
        value: {
            id: string;
            name: string;
            type: string;
            data: Blob;
            createdAt: number;
        };
    };
    notes: {
        key: string;
        value: {
            id: string;
            fileId: string;
            content: string;
            createdAt: number;
            updatedAt: number;
        };
        indexes: { 'by-file': string };
    };
    queue: {
        key: string;
        value: {
            id: string;
            fileId: string;
            status: 'pending' | 'processing' | 'completed' | 'failed';
            stage: 0 | 1 | 2 | 3;
            error?: string;
            createdAt: number;
        };
        indexes: { 'by-status': string };
    };
}

const DB_NAME = 'medical-note-db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<MedicalNoteDB>>;

export function initDB() {
    if (!dbPromise) {
        dbPromise = openDB<MedicalNoteDB>(DB_NAME, DB_VERSION, {
            upgrade(db) {
                if (!db.objectStoreNames.contains('files')) {
                    db.createObjectStore('files', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('notes')) {
                    const noteStore = db.createObjectStore('notes', { keyPath: 'id' });
                    noteStore.createIndex('by-file', 'fileId');
                }
                if (!db.objectStoreNames.contains('queue')) {
                    const queueStore = db.createObjectStore('queue', { keyPath: 'id' });
                    queueStore.createIndex('by-status', 'status');
                }
            },
        });
    }
    return dbPromise;
}

// --- Files ---
export async function saveFile(file: File): Promise<string> {
    const db = await initDB();
    const id = crypto.randomUUID();
    await db.put('files', {
        id,
        name: file.name,
        type: file.type,
        data: file,
        createdAt: Date.now(),
    });
    return id;
}

export async function getFile(id: string) {
    const db = await initDB();
    return db.get('files', id);
}

export async function getAllFiles() {
    const db = await initDB();
    return db.getAll('files');
}

export async function deleteFile(id: string) {
    const db = await initDB();
    await db.delete('files', id);
    // Cleanup associated notes and queue items
    const tx = db.transaction(['notes', 'queue'], 'readwrite');
    const notesIndex = tx.objectStore('notes').index('by-file');

    // Delete notes
    let cursor = await notesIndex.openCursor(IDBKeyRange.only(id));
    while (cursor) {
        await cursor.delete();
        cursor = await cursor.continue();
    }
}

// --- Notes ---
export async function saveNote(fileId: string, content: string) {
    const db = await initDB();
    const id = crypto.randomUUID();
    await db.put('notes', {
        id,
        fileId,
        content,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    });
    return id;
}

export async function updateNote(id: string, content: string) {
    const db = await initDB();
    const note = await db.get('notes', id);
    if (note) {
        note.content = content;
        note.updatedAt = Date.now();
        await db.put('notes', note);
    }
}

export async function getNote(id: string) {
    const db = await initDB();
    return db.get('notes', id);
}

export async function getNoteByFileId(fileId: string) {
    const db = await initDB();
    return db.getFromIndex('notes', 'by-file', fileId);
}

export async function getAllNotes() {
    const db = await initDB();
    return db.getAll('notes');
}

export async function deleteNote(id: string) {
    const db = await initDB();
    await db.delete('notes', id);
}

// --- Queue ---
export async function addToQueue(fileId: string) {
    const db = await initDB();
    const id = crypto.randomUUID();
    await db.put('queue', {
        id,
        fileId,
        status: 'pending',
        stage: 0,
        createdAt: Date.now(),
    });
    return id;
}

export async function updateQueueStatus(id: string, status: 'pending' | 'processing' | 'completed' | 'failed', stage: 0 | 1 | 2 | 3, error?: string) {
    const db = await initDB();
    const item = await db.get('queue', id);
    if (item) {
        item.status = status;
        item.stage = stage;
        if (error) item.error = error;
        await db.put('queue', item);
    }
}

export async function getQueue() {
    const db = await initDB();
    return db.getAll('queue');
}

export async function getPendingQueue() {
    const db = await initDB();
    return db.getAllFromIndex('queue', 'by-status', 'pending');
}

export async function clearQueue() {
    const db = await initDB();
    await db.clear('queue');
}
