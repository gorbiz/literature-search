# Literature search - duplicate removal
This code was used once to remove duplicates during a literature search.
The javascript & bash versions should do the same thing.

## Expected input
A `.tsv` file of merged database search results (from ex PubMed & Web of Science) named `original.tsv`, see `original-example.tsv` for an example.

# How to use
Open a terminal and enter the following commands:
```sh
cp original-example.tsv original.tsv # rename example file to original.tsv
./prune
# read output & find results in ./output/
```

Consider running the same check with a different script (javascript / node):
```sh
node prune.js # requires https://nodejs.org
# read output & find results in pruned.csv
```

PS. Probably easier done in R.
