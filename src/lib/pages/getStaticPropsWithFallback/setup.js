const { join } = require('path')

const asyncForEach = require('../../helpers/asyncForEach')
const getFilePathForRoute = require('../../helpers/getFilePathForRoute')
const { logTitle, logItem } = require('../../helpers/logger')
const setupNetlifyFunctionForPage = require('../../helpers/setupNetlifyFunctionForPage')

const getPages = require('./pages')

// Create a Netlify Function for every page with getStaticProps and fallback
const setup = async (functionsPath) => {
  logTitle('💫 Setting up pages with getStaticProps and fallback: true', 'as Netlify Functions in', functionsPath)

  const pages = await getPages()

  // Create Netlify Function for every page
  await asyncForEach(pages, async ({ route }) => {
    const relativePath = getFilePathForRoute(route, 'js')
    const filePath = join('pages', relativePath)
    logItem(filePath)
    await setupNetlifyFunctionForPage({ filePath, functionsPath, isISR: true })
  })
}

module.exports = setup
