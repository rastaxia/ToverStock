# ToverStock

**ToverStock** is een Angular-applicatie gebouwd met [Ionic](https://ionicframework.com/) en [Capacitor](https://capacitorjs.com/), voornamelijk ontworpen voor Android-apparaten. Deze app is ontwikkeld om een naadloze mobiele ervaring te bieden voor het beheren van voorraden en inventaris voor Attractiepark Toverland.

## Inhoudsopgave

- [Overzicht](#overzicht)
- [Kenmerken](#kenmerken)
- [Installatie](#installatie)
- [App opstarten ](#app-opstarten )
- [Stuctuur](#stuctuur)

## Overzicht

ToverStock is een moderne, responsieve applicatie ontwikkeld met Angular en Ionic. De app maakt gebruik van Capacitor om native functionaliteiten te bieden, waardoor hij ideaal is voor Android-apparaten. Met een focus op schaalbaarheid en prestatie.

## Kenmerken

- **Mobiel-eerst ontwerp:** Geoptimaliseerd voor Android-apparaten.
- **Responsieve UI:** Gebouwd met Ionic voor een soepele gebruikerservaring.
- **Capacitor-integratie:** Eenvoudig toegang tot native apparaatfuncties.
- **Modulaire architectuur:** Maakt gebruik van Angular's robuuste framework voor schaalbare ontwikkeling.

## Installatie

### Vereisten

- [Node.js](https://nodejs.org/) (v12 of later)
- [Angular CLI](https://angular.io/cli)
- [Ionic CLI](https://ionicframework.com/docs/cli)
- [Capacitor](https://capacitorjs.com/)

### Stappen

1. **Repository klonen:**

   ```bash
   git clone https://github.com/rastaxia/ToverStock.git
   cd ToverStock
   ```
2. **Packages download**
```bash
npm install
```
3. **Applicatie bouwen**
```bash
ng build --prod
```
4. **Assets kopiëren**
```bash
npx cap copy
```
### App opstarten 
Om de app op een android apperaat te runnen gebruik het volgende command
```bash
ionic cap run android --external
```
### Stuctuur
- src/app: Bevat de hoofdmodules en componenten van de applicatie
- src/assets: Opslag van de assets
- src/environments: Bevat configuratiebestanden
