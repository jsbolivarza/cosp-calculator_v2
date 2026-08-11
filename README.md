# COSP Calculator (PWA)

*Español: [README.es.md](README.es.md)*

A tool for calculating the Cost of Sustainable Production (COSP) of
coffee during focus group discussions. It installs as an app on a phone, tablet or computer
and works offline after the first time it is opened.

The interface is available in English, Spanish and Portuguese, switchable at any time from the
header.

The files must be published on a site served over HTTPS. Opening `index.html` by double
clicking it will not work: without HTTPS the browser refuses to install the app or to save an
offline copy. GitHub Pages meets that requirement and is free.

## Files

The five files the app needs to run:

- `index.html` is the entire calculator: interface, translations, calculations and storage.
- `manifest.json` gives the browser the name, icon and colours of the installed app.
- `sw.js` is the service worker. It stores a copy of the app on the device the first time it
  is opened so the app works without internet afterwards.
- `icon-192.png` and `icon-512.png` are the app icons.

Those five go together in the root of the repository, with exactly those names.

Alongside them sit `README.md` and `README.es.md`, the same documentation in English and
Spanish. They are for whoever maintains or deploys the tool. The app itself never reads them,
so they can be edited or removed without affecting anything. Keep both in step when one
changes.

## Publishing on GitHub Pages

1. Create a new repository on GitHub. Free Pages on a personal account requires the repository
   to be public.
2. Upload the five app files to the root of the repository, keeping the names exactly as they
   are. The README files can go up too; they are ignored by the app.
3. Go to **Settings**, then **Pages**.
4. Under "Build and deployment", choose **Deploy from a branch**, branch `main` (or `master`),
   folder `/ (root)`.
5. Save. GitHub takes a minute or two to publish the site.
6. The URL will look like `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`

## Installing on a device

**Android (Chrome):** open the URL, tap the menu, then "Install app" or "Add to Home screen".

**iPhone or iPad (Safari):** open the URL in Safari, tap the share icon, then "Add to Home
Screen". iPhone does not prompt automatically the way Android does, so this has to be done by
hand the first time. Use Safari itself, not Chrome or Edge on iOS.

**Computer (Chrome or Edge):** an install icon appears in the address bar.

## How it is used

### Home screen: two tabs

**My FGDs** lists every FGD saved on that device. **Compare FGDs** puts them all side by side.

Each FGD is stored separately, so one facilitator can run several focus groups in a row
without losing or mixing the data.

- **+ New FGD** starts a fresh one without touching the others.
- **Open** picks up an FGD already started.
- Each card in the list shows the name, the cooperative, the total COSP and the date of the last
  change, and carries its own JSON, CSV and delete buttons.
- **My FGDs** in the top bar returns to this screen from anywhere.

A device handles around 100 FGDs comfortably. The real limit is the browser's storage
allowance rather than a fixed number.

### Inputs and costs

A third tab on the home screen lists every itemised inputs and variable cost line across all
FGDs on the device, grouped by item, with the number of FGDs it appears in, the average
quantity where recorded, the average cost, the range and its share of the total. **Export
detail (CSV)** gives one row per line, which is the file an emission factor calculation or a
procurement analysis would start from.

Inputs and variable cost rows are chosen from a standard list rather than typed. Selecting from
the list stores a permanent code alongside the label, so the same product entered in Peru and
in Honduras groups together even when the interface language differs. **Other, type it in**
remains available for anything not on the list; those lines are marked "typed in" and group only
by their exact wording.

Each row also takes an **optional quantity and unit** (kg, l, unit, sack, t). These are never
required, since a focus group often knows what was spent without knowing how many kilos it
bought. They exist because cost in local currency cannot be converted into a carbon footprint;
physical quantity can.

Two limits worth knowing. Categories filled in activity by activity carry no item description,
so their amounts do not appear on this tab, although they still count in the FGD totals. And
the item catalogue is a first draft written without country validation. It is expected to be
corrected by each country contact.

### Searching the list

A search box sits above the list once there is at least one FGD saved. It matches across the
FGD name, the cooperative name and the FLO-ID at the same time, so any of the three will find a
record.

It ignores capitals and accents, in both directions: typing "cafe" finds "Sol y Café", and so
does typing "café". Several words are treated as AND rather than OR, so "bagua 02" narrows to
the one FGD containing both instead of widening to everything containing either.

While a search is active the counter reads "Showing 2 of 10 FGDs" and a Clear button appears.
The search only affects the list. It never changes the comparison tab, and it resets itself
after an import or a delete so freshly loaded FGDs can never look missing.

### Comparing FGDs

The comparison lives on the home screen rather than inside an FGD, because it describes the
whole device.

**Filters.** Three filters sit above the table: coffee type, currency and area unit. The
average recalculates over whatever remains visible, and its label shows how many FGDs went into
it, for example "Average (8)".

**Averages that are left blank.** A kilo of cherry and a kilo of dry parchment are not the same
thing, so averaging yield or price per kg across different coffee types produces a meaningless
number. When the visible FGDs do not share a coffee type, those two averages show as a dash and
a note explains why. The same applies to the money averages (daily wage, total COSP, prices)
when currencies or area units are mixed. The individual row values stay visible throughout,
because each one on its own is valid.

The **price per kg GBE** is the only price column comparable across different coffee types.
That is what it is for.

### Inside an FGD: two tabs

1. **Farm activities**: which activities happen, which coffee type is sold, and the yield. This
   determines which cost questions appear next.
2. **Cost questionnaire**: only the categories matching what was ticked on tab 1. Each category
   can be filled in globally or activity by activity.

### Land blocks

The coffee area on the farm is split three ways on tab 1: establishment (new areas),
renovation or rehabilitation, and productive areas. A fourth bucket, annual overhead, covers
costs that are not tied to any area.

Establishment and renovation get their own tabs, which appear only once an area has been
entered for them. Each asks the five Tier 3 questions directly (inputs, family labour, paid
labour, variable costs, fixed costs) with no category breakdown, because a focus group will not
break a new planting down nine ways. The cost questionnaire tab then covers the productive area
alone, plus farm administration as annual overhead.

Costs on the block tabs are entered **per unit of that block's own area**, and the tool
multiplies each by its block. Annual overhead is entered as a yearly total for the farm, and
its labels say so. Yield is entered per unit of **productive** area, which is the figure a
farmer actually quotes, so total production comes from the productive block alone.

The three blocks are then summed exactly as they stand. **Nothing is amortised.** A year with
new plantings genuinely reads as a more expensive year, and that is the point: the separation
into blocks is there so an analyst can judge whether a given year's figure is representative.
The cost per kg divides the whole farm's annual cost by the current harvest, because the farmer
pays for the new planting out of this year's coffee sales.

**Leaving all three areas blank keeps the old behaviour.** The tool then reports one cost per
unit of area and divides by the yield on its own, exactly as it did before land blocks existed.
Every FGD captured on an earlier version keeps calculating the same way it always did.

### Area unit

The tool never converts between area units. Everything is captured in whichever unit is chosen,
and the price per kg comes from dividing cost per unit by yield per unit, so the arithmetic is
correct in any unit as long as both figures use the same one.

The labels follow the unit chosen. Pick Manzana and the yield field asks for kg/mz and the
questionnaire says mz rather than ha. Pick **Other** and a field appears for the local name of
the unit, for example cuerda or tarea, and every label picks it up.

### Saving

Everything typed is saved on the device automatically, inside the open FGD. Nothing needs to be
pressed. Nothing leaves the device until it is exported.

If the browser blocks saving, for instance in private browsing or when storage is full, the
indicator in the top bar says so. In that case the data must be exported before closing.

## Getting the data out

The file buttons are in the top bar and are visible from every tab.

- **Save this FGD (JSON)** exports the open FGD with all its line by line detail. Use it to
  email one FGD to whoever is consolidating, or to move it to another device.
- **Export this FGD (CSV)** exports the open FGD as a single row.
- **Export all (CSV)** produces one file with one row per FGD and an `fgd_id` column
  identifying each. This is the file meant for pasting straight into a master sheet.
- **Back up all (JSON)** is a full backup of every FGD on the device.
- **Load JSON** accepts either a single FGD or a full backup.
- **Delete all data** wipes every FGD on the device, after a confirmation.

### A note on loading JSON

Loading adds FGDs to the list. It never deletes anything already on the device.

Loading the same file twice creates a second copy of each FGD rather than updating the
original, so the list will show duplicates. Delete the extra copies by hand, or delete all data
first and then load the backup. This is worth knowing when moving data between devices.

### CSV columns

The CSV column names use fixed English identifiers such as `fertilization_total` and
`total_cosp_per_area_unit` rather than the translated labels. Files produced by facilitators
working in different interface languages therefore line up in the same master sheet. The single
FGD CSV and the export all CSV have exactly the same columns.

Every FGD carries `uses_land_blocks`, which says whether it was captured with areas. When it
is 1 the row has `area_establishment`, `area_renovation`, `area_productive`, `area_total_coffee`,
a `block_*` set of subtotals, `total_annual_cost`, `production_kg_in_type` and
`production_kg_gbe`. When it is 0 those are blank and only `total_cosp_per_area_unit` is
meaningful. Each category also carries `<category>_land_status`, its cost per unit of its own
area, and its annual cost. Filter on `uses_land_blocks` before summing annual costs.

No column assumes hectares. Yields come out as `yield_kg_per_productive_area_unit` and
`yield_kg_gbe_per_productive_area_unit`, and each FGD's unit is in `area_unit`, plus
`area_unit_custom_name` when that FGD uses a unit of its own. Check those columns before
summing or averaging across FGDs in the master sheet.

## Updating the app later

When `index.html` changes, upload the new file **and** change the version number in
`CACHE_NAME` at the top of `sw.js`, currently `"cosp-fgd-blocks-v2"`. Without that change,
anyone who already installed the app may keep seeing the old version cached on their device.

Data already captured is not lost when the app is updated. It lives in the browser's storage,
separately from the app files.

## Known limitations

- **Spanish and Portuguese are first machine translations.** English is the reference version.
  A native speaker should review the other two before they are used in the field.
- **The fonts (Google Fonts) are not stored for offline use.** With no internet on first load
  the text falls back to the system font. This affects appearance only, not function.
- **The data lives only on that device.** There is no server and no synchronisation. If the
  browser data is cleared or the app is uninstalled without exporting, the FGDs are gone. Take
  a JSON backup at the end of each day of fieldwork.
- **Delete confirmations are an in page dialog** rather than the system popup, because the
  system popup is unreliable in iOS browsers other than Safari.
- **The Farm Administration category hides its Inputs and Paid labour components**, since they
  do not apply there. Those two fields stay empty by design. A value forced into them through
  an imported file would count toward the COSP total without appearing anywhere on screen.
