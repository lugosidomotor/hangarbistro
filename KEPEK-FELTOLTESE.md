# Képek Feltöltése - Gyors Útmutató

## 📁 Mappa Struktúra

```
assets/images/
├── gallery/
│   ├── eskuvo/          (8 kép)
│   ├── lanykeres/       (6 kép)
│   ├── csapatepites/    (6 kép)
│   └── ceges/           (6 kép)
└── heroes/              (7 hero kép)
    ├── rendezvenyek-hero.jpg
    ├── eskuvo-hero.jpg
    ├── lanykeres-hero.jpg
    ├── csapatepites-hero.jpg
    ├── ceges-hero.jpg
    ├── szuletesnap-hero.jpg
    └── csaladi-hero.jpg
```

## 🖼️ Képkövetelmények

### Galéria Képek
- **Méret**: 800-1200px szélesség, 600-900px magasság
- **Arány**: 4:3 vagy 3:2 ajánlott
- **Formátum**: JPG vagy WebP
- **Minőség**: 80-90% (kompresszált, de jó minőségű)
- **Fájlméret**: ~100-300 KB képenként

### Hero Képek (Háttérképek)
- **Méret**: 1600-1920px szélesség, 1000-1200px magasság
- **Arány**: 16:10 vagy 16:9 ajánlott
- **Formátum**: JPG vagy WebP
- **Minőség**: 85-95% (jobb minőség, mert nagyobb képernyőn)
- **Fájlméret**: ~150-500 KB képenként

## 📝 Fájl Elnevezési Séma

### Esküvő (8 kép) - `eskuvo-1.jpg` ... `eskuvo-8.jpg`
1. Esküvői ceremónia teraszon panorámával
2. Esküvői asztaldekoráció gyertyákkal
3. Násznép csoport fotó teraszon
4. Esküvői torta virágokkal díszítve
5. Első tánc este a násznépnek
6. Esküvői terítés elegáns díszekkel
7. Menyasszonyi csokor részlet
8. Esküvői helyszín napnyugtakor

### Lánykérés (6 kép) - `lanykeres-1.jpg` ... `lanykeres-6.jpg`
1. Romantikus helyszín panorámával
2. Privát terasz dekoráció
3. Asztal gyertyákkal
4. Gyűrű/ajándék részlet
5. Romantikus vacsora
6. Panoráma napnyugtakor

### Csapatépítés (6 kép) - `csapatepites-1.jpg` ... `csapatepites-6.jpg`
1. Csapatépítő aktivitás
2. Outdoor terület
3. Workshop/előadás
4. Catering/büfé
5. Csapat együtt
6. Természeti környezet

### Céges Rendezvény (6 kép) - `ceges-1.jpg` ... `ceges-6.jpg`
1. Konferencia terem
2. Üzleti találkozó
3. Prezentáció/előadás
4. Üzleti ebéd
5. Networking
6. Technikai felszereltség

### Hero Képek
- **rendezvenyek-hero.jpg** - Főoldal hero (panoráma kilátás)
- **eskuvo-hero.jpg** - Esküvő oldal hero
- **lanykeres-hero.jpg** - Lánykérés oldal hero
- **csapatepites-hero.jpg** - Csapatépítés oldal hero
- **ceges-hero.jpg** - Céges rendezvény oldal hero
- **szuletesnap-hero.jpg** - Születésnap oldal hero
- **csaladi-hero.jpg** - Családi összejövetel oldal hero

## 🚀 Gyors Lépések

1. **Nevezd át a képeidet** a fenti séma szerint (pl. `eskuvo-1.jpg`)
2. **Másold be őket** a megfelelő mappába (`assets/images/gallery/eskuvo/`)
3. **Ellenőrizd** a weboldalt böngészőben
4. **Frissítsd** a cache-t (Ctrl+F5 vagy Cmd+Shift+R)

## ⚠️ Fontos

- **Ne változtasd meg** a fájlneveket vagy a szerkezetet!
- A HTML fájlok már a helyi útvonalakra mutatnak
- Ha hiányzik egy kép, a böngésző hibát fog jelezni (placeholder ikon)
- Minden képnek ugyanolyan fájlnévnek és típusnak kell lennie (`.jpg`)

## ✅ Ellenőrző Lista

### Galéria Képek
- [ ] Esküvő (8 kép) - `/rendezvenyek/eskuvo.html`
- [ ] Lánykérés (6 kép) - `/rendezvenyek/lanykeres.html`
- [ ] Csapatépítés (6 kép) - `/rendezvenyek/csapatepites.html`
- [ ] Céges (6 kép) - `/rendezvenyek/ceges-rendezveny.html`
- [ ] Főoldal (6 kép) - `/rendezvenyek/index.html`

### Hero Képek
- [ ] Főoldal hero - `/rendezvenyek/index.html`
- [ ] Esküvő hero - `/rendezvenyek/eskuvo.html`
- [ ] Lánykérés hero - `/rendezvenyek/lanykeres.html`
- [ ] Csapatépítés hero - `/rendezvenyek/csapatepites.html`
- [ ] Céges rendezvény hero - `/rendezvenyek/ceges-rendezveny.html`
- [ ] Születésnap hero - `/rendezvenyek/szuletesnap.html`
- [ ] Családi összejövetel hero - `/rendezvenyek/csaladi-osszejovetel.html`

## 📞 Segítség

Ha bármilyen probléma van a képek feltöltésével:
1. Ellenőrizd a fájlneveket (kisbetű, kötőjel, `.jpg`)
2. Ellenőrizd a mappa útvonalakat
3. Nézd meg a böngésző konzolt (F12) a hibákért
