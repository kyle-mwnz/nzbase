# NZBase

This repo contains the source for the base FHIR Implementation Guide (IG) for New Zealand and contains the most common extensions that most NZ FHIR Implementations will need.

The current continuous integration (CI) version (the draft work in progress candidate for the next version) can be viewed at: https://build.fhir.org/ig/HL7NZ/nzbase/branches/master/

The current published version can be found at: https://fhir.org.nz/ig/base/

## IG Development

This repository uses the official HL7 IG Publisher helper scripts.

### Prerequisites

To work on this IG locally you should install:

1. Java
   - Install a recent Java runtime and make sure `java` is on your `PATH`.
2. Node.js and npm
   - SUSHI is distributed through npm.
3. FSH/SUSHI
   - Install SUSHI globally
4. Jekyll (website builder)
   - Install Ruby and Bundler, then install Jekyll

```bash
npm install -g fsh-sushi
gem install jekyll
```

You can verify the installation with:

```bash
sushi --help
jekyll --version
```

### Build scripts

The `updatePublisher` will download the latest official release of the IG Publisher.

```bash
./_updatePublisher.sh
```

Build the IG (runs SUSHI):

```bash
./_genonce.sh
```

Open the menu-driven helper (additional build options):

```bash
./_build.sh
```

## Release Process

Release builds are published to GitHub Pages when a Git tag matching `v*` is pushed to the repository.

### One-time GitHub configuration

1. Go to the repository on GitHub.
2. Open `Settings` -> `Pages`.
3. Set `Source` to `GitHub Actions`.
4. Save the change.

The workflow is defined in `.github/workflows/publish-pages.yml` and builds the IG using `./_genonce.sh`, then publishes the generated static site from `output/`.

### Create a release

1. Make sure the release content is committed to `master`.
2. Update any version metadata you want to publish, such as `sushi-config.yaml` and `package-list.json`.
3. Create a release tag that starts with `v`.

```bash
git checkout master
git pull
git tag v3.1.0
git push origin v3.1.0
```

4. Open the `Actions` tab on GitHub and confirm the `Publish IG to GitHub Pages` workflow succeeds.
5. Open the deployed Pages URL and confirm the IG loads correctly.

### Notes

- The workflow publishes the generated website in `output/`, not `full-ig.zip`.
- The first release will only deploy after GitHub Pages has been configured to use `GitHub Actions`.
- The canonical and published URLs in `sushi-config.yaml` and `package-list.json` currently point to non-GitHub hosting. If GitHub Pages will become the authoritative published site, those URLs should be updated to match the final public address.
