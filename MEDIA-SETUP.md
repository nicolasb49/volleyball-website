# Volleyball Website - Medien Setup

## Benötigte Platzhaltermedien

### 🎥 Videos
Bitte fügen Sie das folgende Video in den `public/video/` Ordner hinzu:

- **`volleyball-background.mp4`** - Hintergrundvideo für die Landingpage
  - Empfohlene Auflösung: 1920x1080 oder höher
  - Format: MP4
  - Länge: 10-30 Sekunden (Loop)
  - Inhalt: Volleyball-Action, Spielszenen oder Team-Training

### 📸 Bilder
Fügen Sie die folgenden Platzhalterbilder in den `public/images/` Ordner hinzu:

#### Team-Bilder (für Spieltagsvorschau)
- **`volleyball-team-placeholder.jpg`** - Allgemeines Team-Bild
- **`[Team-Name].jpg`** - Spezifische Team-Bilder (basierend auf nextMatch.json)

#### Beispiel-Teamnamen aus den Daten:
- Benennen Sie die Bilder entsprechend der Teams in `data/nextMatch.json`
- Ersetzen Sie Leerzeichen durch Bindestriche (z.B. "SV Karlsruhe" → "SV-Karlsruhe.jpg")

### 🏃‍♀️ Spielerinnen-Bilder
Die Spielerinnen-Bilder werden derzeit über Placeholder-URLs geladen:
- Ersetzen Sie die URLs in `data/players.json` durch lokale Pfade
- Format: `/images/players/[spielername].jpg`

## 🎨 Design-Stil
- **Farben**: Orange (#f97316) zu Rot (#dc2626) Farbverlauf
- **Stil**: Modern, sportlich, energiegeladen
- **Format**: Hochwertige Bilder, professionelle Aufnahmen bevorzugt

## 📱 Responsive Design
Alle Medien sollten für verschiedene Bildschirmgrößen optimiert sein:
- **Desktop**: 1920x1080+
- **Tablet**: 768x1024
- **Mobile**: 375x667+

## 🚀 Performance-Tipps
- Komprimieren Sie Bilder für das Web (WebP bevorzugt)
- Videos sollten unter 10MB bleiben
- Nutzen Sie moderne Bildformate für bessere Performance

## 📁 Ordnerstruktur
```
public/
├── video/
│   └── volleyball-background.mp4
├── images/
│   ├── volleyball-team-placeholder.jpg
│   ├── [team-name].jpg
│   └── players/
│       ├── alice-beispiel.jpg
│       ├── betty-beispiel.jpg
│       └── carla-beispiel.jpg
```
