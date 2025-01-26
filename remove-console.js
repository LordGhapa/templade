const fs = require('fs')
const path = require('path')

const directory = path.join(__dirname, 'src') 

function removeConsoleLogs(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  content = content.replace(/console\.log\(.*?\);?/g, '')
  fs.writeFileSync(filePath, content, 'utf8')
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      processDirectory(filePath)
    } else if (
      filePath.endsWith('.ts') ||
      filePath.endsWith('.tsx') ||
      filePath.endsWith('.js') ||
      filePath.endsWith('.jsx')
    ) {
      removeConsoleLogs(filePath) 
    }
  })
}

processDirectory(directory)
console.log('Todos os console.log foram removidos!')
