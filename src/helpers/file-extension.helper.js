const supportedFileExtensions = ['.jpg', '.gif', '.png'];

export function filterFiles (files) {
  return files.find(f => supportedFileExtensions.some(sf => f.includes(sf)));
}