</script>
    <style>
        /* Custom scrollbar untuk tampilan dark */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
    </style>
</head>
<body class="bg-slate-900 text-slate-100 font-sans p-4 md:p-8 min-h-screen">

    <!-- HEADER -->
    <header class="max-w-6xl mx-auto mb-8 flex items-center justify-between border-b border-slate-700 pb-4">
        <div>
            <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Wordle Stream Solver
            </h1>
            <p class="text-slate-400 text-sm mt-1">Alat bantu interaktif untuk Live TikTok & Indofinity (Vanilla JS)</p>
        </div>
    </header>

    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        <!-- KOLOM KIRI: SETTING, SARAN, & SOLVER -->
        <div class="lg:col-span-2 space-y-6">
            
            <!-- Kontrol Utama -->
            <div class="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700/50">
                <div class="flex flex-wrap items-end gap-4 mb-4 sm:mb-6">
                    <div>
                        <label class="block text-sm font-medium text-slate-400 mb-2">Panjang Huruf</label>
                        <div class="flex flex-wrap gap-2" id="length-buttons-container">
                            <!-- Tombol panjang huruf akan di-render dari JS -->
                        </div>
                        <div class="mt-3 flex items-center gap-2">
                            <input type="checkbox" id="auto-switch-toggle" class="w-4 h-4 text-emerald-500 bg-slate-900 border-slate-600 rounded focus:ring-emerald-500 cursor-pointer" checked />
                            <label for="auto-switch-toggle" class="text-sm text-slate-400 cursor-pointer hover:text-slate-300 select-none">Auto-pindah jumlah huruf dari Live Chat</label>
                        </div>
                    </div>

                    <div class="flex-1 transition-all" id="guess-input-container">
                        <label class="block text-sm font-medium text-slate-400 mb-2">Tebakan Baru</label>
                        <div class="flex gap-2">
                            <input
                                type="text"
                                id="guess-input"
                                placeholder="Ketik huruf..."
                                class="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 uppercase font-mono shadow-inner"
                            />
                            <button 
                                id="add-guess-btn"
                                class="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
                            >
                                Tambah
                            </button>
                        </div>
                        <div id="guess-explainer" class="hidden mt-2 text-xs text-red-400 bg-red-500/10 border border-red-500/30 p-2 rounded-lg"></div>
                    </div>
                </div>

                <!-- Mode Permainan Tambahan -->
                <div class="border-t border-slate-700 pt-3 sm:pt-4">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div class="flex gap-2 w-fit bg-slate-900 p-1 rounded-lg border border-slate-600 flex-wrap">
                                <button id="mode-normal-btn" class="px-3 py-1 sm:px-4 sm:py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">Normal</button>
                                <button id="mode-tipu-btn" class="px-3 py-1 sm:px-4 sm:py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all text-slate-400 hover:text-white">Tukang Tipu</button>
                                <button id="mode-salahsendiri-btn" class="px-3 py-1 sm:px-4 sm:py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all text-slate-400 hover:text-white">Salah Sendiri</button>
                                <button id="mode-ketempelan-btn" class="px-3 py-1 sm:px-4 sm:py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all text-slate-400 hover:text-white">Ketempelan</button>
                                <button id="mode-belahtengah-btn" class="px-3 py-1 sm:px-4 sm:py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all text-slate-400 hover:text-white">Belah Tengah</button>
                                <button id="mode-buta-btn" class="px-3 py-1 sm:px-4 sm:py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all text-slate-400 hover:text-white">Sekata Buta</button>
                                <button id="mode-matabatin-btn" class="px-3 py-1 sm:px-4 sm:py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all text-slate-400 hover:text-white">Mata Batin</button>
                                <button id="mode-jagajarak-btn" class="px-3 py-1 sm:px-4 sm:py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all text-slate-400 hover:text-white">Jaga Jarak</button>
                                <button id="mode-pepetterus-btn" class="px-3 py-1 sm:px-4 sm:py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all text-slate-400 hover:text-white">Pepet Terus</button>
                                <button id="mode-sekolor-btn" class="px-3 py-1 sm:px-4 sm:py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all text-slate-400 hover:text-white">Sekolor</button>
                                <button id="mode-sekolor-hard-btn" class="px-3 py-1 sm:px-4 sm:py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all text-slate-400 hover:text-white">Sekolor Hard</button>
                                <button id="mode-konekdot-btn" class="px-3 py-1 sm:px-4 sm:py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all text-slate-400 hover:text-white">Konekdot</button>
                                <button id="mode-kasihpaham-btn" class="px-3 py-1 sm:px-4 sm:py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all text-slate-400 hover:text-white">Kasih Paham</button>
                                <button id="mode-acakolor-btn" class="px-3 py-1 sm:px-4 sm:py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all text-slate-400 hover:text-white">Acakolor</button>
                            </div>
                        </div>
                        <div class="text-left sm:text-right flex-1">
                            <p id="mode-desc" class="text-xs text-slate-400 mt-2 sm:mt-0">*Normal: Kata harus memiliki warna yang <b>sama persis</b>.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- GRID BERSEBELAHAN: Papan Wordle & Saran Kata -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Papan Wordle -->
                <div class="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700/50 flex flex-col h-[500px]" id="board-panel">
                    
                    <!-- PANEL SEKOLOR (Tersembunyi di mode lain) -->
                    <div id="sekolor-panel" class="hidden mb-4 bg-slate-900/50 p-3 rounded-xl border border-pink-500/30">
                        <div class="text-xs text-slate-400 mb-2 text-center font-bold">Pola Warna Target (Klik untuk setel warna)</div>
                        <div id="sekolor-boxes" class="flex justify-center gap-1 sm:gap-1.5 w-full max-w-full"></div>
                        <div id="sekolor-legend" class="flex justify-center gap-x-3 gap-y-1 mt-3 text-[10px] text-slate-400 flex-wrap">
                            <!-- Legend akan diisi oleh JS -->
                        </div>
                        
                        <!-- Dynamic Keyboard Mapping khusus untuk Sekolor Hard -->
                        <div id="sekolor-hard-mapping" class="hidden mt-4 pt-4 border-t border-orange-500/30">
                            <div class="text-xs text-orange-300 mb-2 text-center font-bold">Mapping Keyboard (Ketik huruf sesuai warna di game)</div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                <div class="flex items-center gap-2">
                                    <div class="w-4 h-4 bg-red-400 rounded-sm shrink-0 shadow-[0_0_8px_rgba(248,113,113,0.4)]"></div>
                                    <input type="text" id="map-red" value="IOGZXVN" class="flex-1 bg-slate-800 border border-slate-600 rounded px-2 py-1.5 uppercase text-slate-200 focus:border-orange-500 focus:outline-none" placeholder="Cth: IOGZXVN" />
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="w-4 h-4 bg-sky-400 rounded-sm shrink-0 shadow-[0_0_8px_rgba(56,189,248,0.4)]"></div>
                                    <input type="text" id="map-blue" value="TYHJKC" class="flex-1 bg-slate-800 border border-slate-600 rounded px-2 py-1.5 uppercase text-slate-200 focus:border-orange-500 focus:outline-none" placeholder="Cth: TYHJKC" />
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="w-4 h-4 bg-yellow-300 rounded-sm shrink-0 shadow-[0_0_8px_rgba(253,224,71,0.4)]"></div>
                                    <input type="text" id="map-yellow" value="QRPASLM" class="flex-1 bg-slate-800 border border-slate-600 rounded px-2 py-1.5 uppercase text-slate-200 focus:border-orange-500 focus:outline-none" placeholder="Cth: QRPASLM" />
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="w-4 h-4 bg-purple-400 rounded-sm shrink-0 shadow-[0_0_8px_rgba(192,132,252,0.4)]"></div>
                                    <input type="text" id="map-purple" value="WEUDFB" class="flex-1 bg-slate-800 border border-slate-600 rounded px-2 py-1.5 uppercase text-slate-200 focus:border-orange-500 focus:outline-none" placeholder="Cth: WEUDFB" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- PANEL KETEMPELAN (Tersembunyi di mode lain) -->
                    <div id="ketempelan-panel" class="hidden mb-4 bg-slate-900/50 p-3 rounded-xl border border-lime-500/30">
                        <div class="text-xs text-lime-400 mb-2 text-center font-bold">Mapping Pasangan Huruf Keyboard</div>
                        <input type="text" id="map-ketempelan" value="AJ EK OD IP UC BT NQ XS YH WM GR ZL FV" class="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 uppercase text-slate-200 focus:border-lime-500 focus:outline-none text-center font-mono text-xs sm:text-sm tracking-widest" placeholder="Cth: AJ EK OD IP UC BT NQ XS YH WM GR ZL FV" />
                    </div>

                    <!-- PANEL JAGA JARAK (Tersembunyi di mode lain) -->
                    <div id="jagajarak-panel" class="hidden mb-4 bg-slate-900/50 p-3 rounded-xl border border-rose-500/30">
                        <div class="text-xs text-rose-400 mb-2 text-center font-bold">Legenda Jarak Alfabet</div>
                        <div class="flex justify-center gap-x-3 gap-y-2 text-[10px] text-slate-200 flex-wrap">
                            <span class="flex items-center gap-1"><div class="w-3 h-3 bg-emerald-500 rounded-sm"></div> Tepat (0)</span>
                            <span class="flex items-center gap-1"><div class="w-3 h-3 bg-red-500 rounded-sm"></div> Jarak 1-5</span>
                            <span class="flex items-center gap-1"><div class="w-3 h-3 bg-orange-500 rounded-sm"></div> Jarak 6-10</span>
                            <span class="flex items-center gap-1"><div class="w-3 h-3 bg-yellow-400 rounded-sm"></div> Jarak 11-15</span>
                            <span class="flex items-center gap-1"><div class="w-3 h-3 bg-blue-500 rounded-sm"></div> Jarak 16-20</span>
                            <span class="flex items-center gap-1"><div class="w-3 h-3 bg-purple-500 rounded-sm"></div> Jarak 21-25</span>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3 flex-1 overflow-y-auto p-4 border border-slate-700 bg-slate-900/40 rounded-xl mb-4 transition-colors" id="board-container">
                        <div class="m-auto w-full text-center py-8 text-slate-500 border-2 border-dashed border-slate-700 rounded-xl">
                            Belum ada tebakan. Masukkan kata untuk memulai!
                        </div>
                    </div>

                    <div class="flex flex-col justify-between items-start text-xs sm:text-sm gap-3 shrink-0">
                        <div class="text-slate-400 leading-relaxed" id="board-instructions">
                            *Kata yang <span class="opacity-50">transparan</span> belum dipakai.<br/>
                            *Klik huruf atau <span class="text-emerald-400 font-bold">✔</span> untuk memakai.<br/>
                            <span class="text-emerald-400 text-[10px] sm:text-xs">💡 <b>Alt+R</b> (Reset Papan), <b>/</b> (Input Baru)</span>
                        </div>
                        <button 
                            id="reset-btn"
                            class="hidden w-full justify-center items-center gap-2 text-red-400 hover:text-red-300 bg-red-400/10 px-3 py-2 rounded-lg transition-colors font-bold"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> 
                            Bersihkan Papan
                        </button>
                    </div>
                </div>

                <!-- Hasil Saran Kata -->
                <div class="bg-slate-800 p-6 rounded-2xl shadow-xl border border-emerald-500/30 ring-1 ring-emerald-500/20 relative overflow-hidden flex flex-col h-[500px]" id="saran-kata-panel">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none transition-colors" id="saran-kata-glow"></div>
                    <div class="flex items-center justify-between relative z-10 gap-2 shrink-0 mb-3">
                        <h2 class="text-lg font-bold flex items-center gap-2 truncate">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400 shrink-0 transition-colors" id="saran-kata-icon"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                            <span class="truncate">Saran Kata</span>
                        </h2>
                        <span id="possible-count" class="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full font-mono border border-emerald-500/40 shrink-0 transition-colors">
                            0 kata
                        </span>
                    </div>

                    <!-- Input Pencarian Saran & Filter Huruf Unik -->
                    <div class="flex flex-col sm:flex-row gap-2 relative z-10 mb-4 shrink-0">
                        <input type="text" id="search-saran" placeholder="Cari kata spesifik di daftar ini..." class="flex-1 bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono shadow-inner transition-colors" />
                        <label class="flex items-center gap-2 bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 cursor-pointer hover:bg-slate-800 transition-colors shrink-0">
                            <input type="checkbox" id="unique-letters-toggle" class="w-4 h-4 text-emerald-500 bg-slate-900 border-slate-600 rounded focus:ring-emerald-500 cursor-pointer" />
                            <span class="text-xs font-bold text-slate-300 whitespace-nowrap select-none">Huruf Unik Saja</span>
                        </label>
                    </div>

                    <div class="bg-slate-900 p-4 rounded-xl flex-1 overflow-y-auto border border-slate-700 relative z-10" id="possible-words-container">
                        <!-- Kata akan muncul di sini -->
                    </div>
                </div>
            </div>

            <!-- Pengaturan Kamus -->
            <div class="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700/50">
                <details class="group">
                    <summary class="font-bold cursor-pointer text-slate-300 hover:text-white flex justify-between items-center">
                        Pengaturan Kamus & Upload
                        <span class="text-xs font-normal bg-slate-700 px-2 py-1 rounded text-slate-400">Klik untuk buka</span>
                    </summary>
                    <div class="mt-4 space-y-4">
                        
                        <div class="border-b border-slate-700 pb-4">
                            <p class="text-sm text-slate-400 mb-2">Pilih Sumber Kamus Utama (Local Server):</p>
                            <div class="flex gap-2">
                                <select id="dict-source" class="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500">
                                    <option value="IDN.json">IDN.json (Bahasa Indonesia)</option>
                                    <option value="KATLA.json">KATLA.json (Katla Common Words)</option>
                                    <option value="ENG.json">ENG.json (Bahasa Inggris)</option>
                                    <option value="JV.json">JV.json (Bahasa Jawa)</option>
                                    <option value="SU.json">SU.json (Bahasa Sunda)</option>
                                    <option value="MS.json">MS.json (Bahasa Melayu)</option>
                                    <option value="IDEN.json">IDEN.json (Campuran IDN + ENG)</option>
                                    <option value="MIXED">Campuran Load Manual (IDN + ENG)</option>
                                    <option value="KBBI.txt">KBBI.txt (Daftar Kata KBBI)</option>
                                    <option value="dictionary.txt">dictionary.txt (Format Teks Per Baris)</option>
                                </select>
                                <button id="load-source-btn" class="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                                    Muat
                                </button>
                            </div>
                        </div>

                        <div>
                            <p class="text-sm text-slate-400 mb-2">Unggah file <b>.json</b> / <b>.txt</b> manual (Pilih banyak file sekaligus jika perlu digabung):</p>
                            <input 
                                type="file" 
                                id="file-upload" 
                                accept=".json, .txt"
                                multiple
                                class="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 cursor-pointer"
                            />
                        </div>
                        
                        <div class="border-t border-slate-700 pt-4">
                            <p class="text-sm text-slate-400 mb-2">Tempel (paste) daftar kata kustom tambahan (pisahkan dengan baris baru):</p>
                            <textarea 
                                id="custom-dict"
                                class="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-sm text-slate-300 h-32 focus:outline-none focus:border-cyan-500 font-mono"
                                placeholder="KOTAK&#10;MOBIL&#10;PINTU"
                            ></textarea>
                        </div>
                    </div>
                </details>
            </div>
        </div>

        <!-- KOLOM KANAN: INTEGRASI TIKTOK / INDOFINITY (Sticky Panel) -->
        <div class="lg:sticky lg:top-4 h-fit w-full">
            <div class="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700/50 flex flex-col h-[80vh] min-h-[600px] max-h-[900px]">
                <h2 class="text-xl font-bold mb-4 flex items-center gap-2 border-b border-slate-700 pb-4 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-5"></path><path d="M9 8V2"></path><path d="M15 8V2"></path><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"></path></svg>
                    Integrasi Live
                </h2>
                
                <div class="mb-4 shrink-0">
                    <label class="block text-sm font-medium text-slate-400 mb-2">Koneksi ke Desktop Indofinity</label>
                    <div class="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-slate-400 mb-3 font-mono text-sm">
                        ws://localhost:62024
                    </div>
                    <button
                        id="ws-btn"
                        class="w-full py-2.5 rounded-lg font-bold flex justify-center items-center gap-2 transition-all shadow-lg bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/20"
                    >
                        Hubungkan ke Indofinity
                    </button>
                    <p id="ws-status" class="hidden text-xs text-emerald-400 mt-2 text-center animate-pulse">
                        ● Terhubung ke Indofinity
                    </p>
                </div>

                <div class="flex-1 bg-slate-900 rounded-xl border border-slate-700 p-4 overflow-y-auto flex flex-col gap-3" id="comments-feed">
                    <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 sticky top-0 bg-slate-900 py-1 z-10 shrink-0">Feed Komentar</h3>
                    <div id="comments-empty" class="text-center text-slate-600 text-sm italic my-auto">
                        Menunggu komentar masuk...
                    </div>
                    <!-- Komentar akan masuk ke sini -->
                </div>
            </div>
        </div>

    </div>

    <!-- LOGIKA VANILLA JAVASCRIPT -->
    <script>