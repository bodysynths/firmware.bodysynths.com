# 2025-05-28

* Fix: add back "Connect to {instrument}" for WebUSB connect button

# 2025-05-27

* Restructured the releases.json. Now the instruments are a top level structure with nested releases inside
* The first instrument defined in the releases.json array will be the first selected
* Added a pre-release option. Add `"pre": true` to a release in the releases.json to tag it as a pre-release:
    ```jsonc
        {
          "title": "Metal Fetishist v2.0-beta.0",
          "release_notes": [
            "BETA"
          ],
          "file": "MetalFetishist-v2.0-beta.0",
          "date": "2025-06-01",
          "pre": true // "pre added here"
        }
    ```
* Move the browser not supported message into the Programmer section
