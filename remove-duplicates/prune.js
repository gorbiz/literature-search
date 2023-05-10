#!/usr/bin/env node
const fs = require('fs')

function report (entries, msg = '') {
  console.log(`Total: ${entries.length} ${msg}`)
}

const original = fs.readFileSync('original.tsv').toString()
const lines = original.split('\r\n')
const headers = lines[0].split('\t')
const data = lines.slice(1).map(line => line.split('\t'))

let entries = []
for (const lines of data) {
  entries.push(Object.fromEntries(headers.map((header, i) => [header, lines[i]])))
}

report(entries, 'input')
entries.sort((a, b) => b.Database.localeCompare(a.Database))

entries = entries.filter(en => !en.Language || en.Language.includes('English'))
report(entries, 'removing non-English')

function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
    if (!obj[prop]) return true
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
  })
}

entries = removeDuplicates(entries, 'PubMedID')
report(entries, 'after PubMedID duplicates.')

entries = removeDuplicates(entries, 'DOI')
report(entries, 'after DOI duplicates.')

entries = entries.filter(en => !en.Language || en.Language.includes('English'))

fs.writeFileSync('pruned.csv', entries.map(en => headers.map(h => en[h]).join('^')).join('\n'))
