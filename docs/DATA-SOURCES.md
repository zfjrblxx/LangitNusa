# Data Sources

## BMKG Weather

Endpoint used by the application:

```text
https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4={kode_wilayah_tingkat_iv}
```

The default location is Gambir, DKI Jakarta:

```text
31.71.01.1001
```

BMKG documents the forecast as JSON with 3-hour intervals for a 3-day period. Available fields include temperature, humidity, weather description, wind, cloud cover, visibility, and production time.

## BMKG Earthquake

Latest earthquake JSON:

```text
https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json
```

The application reads the latest event and displays its magnitude, location, time, depth, potential, and coordinates when available.

## BMKG Early Warning

Nowcast feed:

```text
https://www.bmkg.go.id/alerts/nowcast/id
```

BMKG documents the feed as XML/RSS and the underlying warning details as CAP XML.

## Attribution

The application displays:

> BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)

See BMKG's Open Data portal for the latest documentation and access limits.
