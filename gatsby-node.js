const path = require(`path`)
exports.createPages = async ({ actions, graphql }) => {
  console.log(graphql)
  const result = await graphql(`
  query MyQuery{
    LOLLIES{
    getAllLollies{
      recipientName
      senderName
      message
      topColor
      mediumColor
      bottomColor
      path
  }}}
  `)


  result.data.LOLLIES.getAllLollies.map(async (indLolly) => {
    console.log(indLolly)
    await actions.createPage({
      path: `lolly/${indLolly.path}`,
      component: path.resolve(`./src/template/lollyPage.jsx`),
      context: {
        lolly: indLolly,
      },
    })
  })
}