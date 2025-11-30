import { GoogleGenerativeAI } from "@google/generative-ai";

// Models as requested by the user
const MODEL_STAGE_1 = "gemini-2.0-flash";
const MODEL_STAGE_2 = "gemini-2.5-pro";
const MODEL_STAGE_3 = "gemini-2.5-flash";

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function runStage1(apiKey: string, fileData: string, mimeType: string) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: MODEL_STAGE_1 });

  const prompt = `
Anda adalah tutor mahasiswa kedokteran yang ahli. Saya akan memberikan file kuliah (PDF/PPT) berisi materi studi kedokteran.

Tugas Anda adalah menulis ulang konten file ini menjadi catatan studi Markdown yang komprehensif dan terstruktur dengan baik dalam BAHASA INDONESIA.

**Pedoman:**
1.  **Struktur**: Gunakan header yang jelas (#, ##, ###) untuk mengatur topik secara logis.
2.  **Konten**: Tangkap semua informasi kunci dari slide. Jangan terlalu menyederhanakan; pertahankan terminologi medis dan kedalamannya.
3.  **Gambar**: Untuk setiap gambar atau diagram dalam file, berikan penjelasan tekstual terperinci tentang apa yang ditunjukkannya dan relevansi klinisnya. Beri label sebagai **[Penjelasan Gambar]**.
4.  **Format**: Output harus dalam format Markdown.
5.  **Tujuan**: Buat catatan dasar yang mencakup 100% materi dalam file.
6.  **PENTING**: Langsung berikan output Markdown. Jangan ada kata pengantar seperti "Tentu", "Berikut adalah", dll.
`;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: fileData,
        mimeType: mimeType,
      },
    },
  ]);

  return result.response.text();
}

export async function runStage2(apiKey: string, stage1Content: string, fileData: string, mimeType: string) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: MODEL_STAGE_2 });

  const prompt = `
Anda adalah mahasiswa kedokteran berprestasi yang unggul dalam menjelaskan konsep kompleks kepada rekan sejawat. Tinjau catatan studi Markdown yang dilampirkan DAN file kuliah asli.

Tugas Anda adalah memperkaya catatan ini dengan wawasan tingkat tinggi, memastikan pembaca memahami "Mengapa" dan "Bagaimana", bukan hanya "Apa". Output harus dalam BAHASA INDONESIA.

**Instruksi:**
1.  **Analisis**: Baca catatan dan file asli. Identifikasi area yang kompleks, sering muncul dalam ujian, atau memerlukan penjelasan fisiologis yang lebih dalam.
2.  **Perluas**: Masukkan informasi tambahan langsung ke bagian yang relevan.
    *   Tambahkan blok **"Korelasi Klinis"**: Jelaskan presentasi klinis atau relevansi konsep tersebut.
    *   Tambahkan detail **"Mekanisme Aksi"**: Selami patofisiologinya.
    *   Tambahkan **"Jembatan Keledai (Mnemonics)"**: Berikan bantuan memori untuk daftar atau kriteria kompleks.
    *   Tambahkan **"Tips Belajar"**: Berikan analogi atau penjelasan tambahan untuk konsep sulit. JIKA RELEVAN, buat **Tabel Perbandingan** dengan penyakit/kondisi lain yang serupa (Diagnosis Banding) untuk memperjelas perbedaan.
3.  **Nada**: Gunakan nada yang jelas, terperinci, dan mudah dipahami, seperti teman pintar yang menjelaskan kepada mahasiswa lain.
4.  **Batasan**: JANGAN hapus informasi yang sudah ada. Anda menambahkan nilai, bukan meringkas.
5.  **Format**: Kembalikan dokumen Markdown lengkap yang diperbarui dengan tambahan Anda yang terintegrasi. Anda dapat menggunakan blockquotes (>) atau teks tebal untuk menyoroti tambahan Anda.
6.  **PENTING**: Langsung berikan output Markdown. Jangan ada kata pengantar atau penutup seperti "Tentu", "Semoga membantu", dll.

**Catatan Input:**
${stage1Content}
`;

  // Re-sending file data as requested to handle context limitations
  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: fileData,
        mimeType: mimeType,
      },
    },
  ]);
  return result.response.text();
}

export async function runStage3(apiKey: string, stage2Content: string, fileData: string, mimeType: string) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: MODEL_STAGE_3 });

  const prompt = `
Anda adalah spesialis dalam membuat alat bantu belajar visual.

**Tugas**: Buat diagram pohon (Tree Diagram) komprehensif yang merangkum seluruh topik yang dibahas dalam catatan yang disediakan dan file kuliah asli. Output harus dalam BAHASA INDONESIA.

**Format Output Wajib**:
Gunakan karakter ASCII untuk membuat struktur pohon seperti contoh di bawah ini. Jangan gunakan format lain.

\`\`\`
TOPIK UTAMA
├── SUB-TOPIK 1
│   ├── Detail 1 (Penjelasan Singkat)
│   ├── Detail 2
│   │   ├── Sub-detail A
│   │   └── Sub-detail B
│   └── Detail 3
├── SUB-TOPIK 2
│   ├── Detail 1
│   └── Detail 2
└── SUB-TOPIK 3
    ├── Detail 1
    └── Detail 2
\`\`\`

**Persyaratan:**
1.  Visualisasikan hubungan, jalur, atau hierarki dalam materi.
2.  Mulai output Anda dengan \`\`\` dan akhiri dengan \`\`\`.
3.  Pastikan diagram cukup lebar agar mudah dibaca tetapi muat dalam blok kode standar.
4.  Fokus pada alur "Gambaran Besar" (Big Picture).
5.  Sertakan detail penting dalam tanda kurung di sebelah item jika perlu, seperti: \`Definisi (Penjelasan Singkat)\`.
6.  **PENTING**: Langsung berikan output ASCII. Jangan ada kata pengantar.

**Catatan Input:**
${stage2Content}
`;

  // Re-sending file data as requested
  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: fileData,
        mimeType: mimeType,
      },
    },
  ]);
  return result.response.text();
}

export async function runChat(apiKey: string, history: { role: "user" | "model"; parts: string }[], message: string, context: string) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: `Anda adalah asisten medis cerdas. Jawab pertanyaan berdasarkan KONTEKS CATATAN berikut. Jika tidak ada di konteks, gunakan pengetahuan medis Anda.\n\nKONTEKS:\n${context}`
  });

  const chat = model.startChat({
    history: history.map(h => ({ role: h.role, parts: [{ text: h.parts }] })),
  });

  const result = await chat.sendMessage(message);
  return result.response.text();
}
